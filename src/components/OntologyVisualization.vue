<template>
  <div class="ontology-visualization">
    <!-- Visualization Controls -->
    <div class="viz-controls">
      <div class="control-group">
        <label>Фильтр по типу:</label>
        <div class="filter-buttons">
          <button 
            v-for="filter in nodeFilters"
            :key="filter.id"
            :class="['filter-btn', { active: filter.active }]"
            @click="toggleFilter(filter.id)"
          >
            <span class="filter-icon" :style="{ backgroundColor: filter.color }"></span>
            {{ filter.label }}
          </button>
        </div>
      </div>
      
      <div class="control-group">
        <label>Макет:</label>
        <select v-model="selectedLayout" @change="applyLayout" class="layout-select">
          <option value="hierarchical">Иерархический</option>
          <option value="physics">Физическая модель</option>
          <option value="circular">Круговой</option>
          <option value="random">Случайный</option>
        </select>
      </div>

      <div class="control-group">
        <button @click="fitToView" class="action-btn">
          <span class="icon">🔍</span>
          По размеру
        </button>
        
        <button @click="resetZoom" class="action-btn">
          <span class="icon">↺</span>
          Сброс
        </button>
        
        <button @click="toggleLabels" class="action-btn">
          <span class="icon">🏷</span>
          Метки
        </button>
      </div>
    </div>

    <!-- Visualization Container -->
    <div class="network-container">
      <div v-if="!data.trim()" class="placeholder">
        <div class="placeholder-icon">🎯</div>
        <div class="placeholder-text">
          Добавьте онтологию для визуализации графа
        </div>
      </div>

      <div v-else class="visualization-content">
        <div class="graph-preview">
          <div class="graph-nodes">
            <div
              v-for="node in graphNodes"
              :key="node.id"
              class="graph-node"
              :class="node.type"
              @click="handleNodeClick(node)"
            >
              <span class="node-label">{{ node.label }}</span>
            </div>
          </div>

          <div class="graph-edges">
            <div v-for="edge in graphEdges" :key="edge.id" class="graph-edge">
              {{ edge.fromLabel }} → {{ edge.toLabel }}
              <span class="edge-label">{{ edge.label }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Node Info Panel -->
    <div v-if="selectedNode" class="node-info">
      <div class="info-header">
        <h3>{{ selectedNode.label || selectedNode.id }}</h3>
        <button @click="selectedNode = null" class="close-btn">×</button>
      </div>
      
      <div class="info-content">
        <div class="info-row">
          <strong>URI:</strong>
          <span class="uri">{{ selectedNode.id }}</span>
        </div>
        
        <div v-if="selectedNode.type" class="info-row">
          <strong>Тип:</strong>
          <span>{{ selectedNode.type }}</span>
        </div>
        
        <div v-if="selectedNode.comment" class="info-row">
          <strong>Описание:</strong>
          <span>{{ selectedNode.comment }}</span>
        </div>
        
        <div v-if="selectedNode.properties && selectedNode.properties.length > 0" class="info-section">
          <strong>Свойства:</strong>
          <ul class="property-list">
            <li v-for="prop in selectedNode.properties" :key="prop.predicate">
              <strong>{{ prop.predicate }}:</strong> {{ prop.object }}
            </li>
          </ul>
        </div>
        
        <div v-if="selectedNode.connections && selectedNode.connections.length > 0" class="info-section">
          <strong>Связи:</strong>
          <ul class="connection-list">
            <li v-for="conn in selectedNode.connections" :key="conn.id">
              {{ conn.label }} → {{ conn.target }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    
    <!-- Legend -->
    <div class="legend">
      <h4>Легенда</h4>
      <div class="legend-items">
        <div v-for="item in legendItems" :key="item.type" class="legend-item">
          <span class="legend-icon" :style="{ backgroundColor: item.color }"></span>
          <span>{{ item.label }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'

// Props
const props = defineProps({
  data: {
    type: String,
    default: ''
  },
  format: {
    type: String,
    default: 'turtle'
  }
})

// Refs
const networkContainer = ref(null)
const selectedNode = ref(null)
const selectedLayout = ref('hierarchical')
const showLabels = ref(true)

// State
const graphNodes = ref([])
const graphEdges = ref([])

// Node type filters
const nodeFilters = ref([
  { id: 'class', label: 'Классы', color: '#667eea', active: true },
  { id: 'property', label: 'Свойства', color: '#10b981', active: true },
  { id: 'individual', label: 'Индивиды', color: '#f59e0b', active: true },
  { id: 'literal', label: 'Литералы', color: '#ef4444', active: true }
])

// Legend items
const legendItems = ref([
  { type: 'class', label: 'Классы (owl:Class)', color: '#667eea' },
  { type: 'property', label: 'Свойства', color: '#10b981' },
  { type: 'individual', label: 'Индивиды', color: '#f59e0b' },
  { type: 'literal', label: 'Литералы', color: '#ef4444' }
])

// Network options
const getNetworkOptions = () => ({
  layout: getLayoutConfig(selectedLayout.value),
  physics: {
    enabled: selectedLayout.value === 'physics',
    stabilization: { iterations: 100 }
  },
  nodes: {
    shape: 'dot',
    size: 20,
    font: {
      size: 12,
      color: '#343434'
    },
    borderWidth: 2,
    shadow: true
  },
  edges: {
    width: 2,
    color: { inherit: 'from' },
    smooth: {
      type: 'continuous',
      roundness: 0.5
    },
    arrows: {
      to: { enabled: true, scaleFactor: 1 }
    },
    font: {
      size: 10,
      align: 'middle'
    }
  },
  interaction: {
    hover: true,
    tooltipDelay: 300
  }
})

/**
 * Get layout configuration
 */
const getLayoutConfig = (layout) => {
  switch (layout) {
    case 'hierarchical':
      return {
        hierarchical: {
          enabled: true,
          direction: 'UD',
          sortMethod: 'directed',
          levelSeparation: 150,
          nodeSpacing: 100
        }
      }
    case 'physics':
      return { randomSeed: 2 }
    case 'circular':
      return { randomSeed: 2 }
    case 'random':
      return { randomSeed: Math.random() }
    default:
      return {}
  }
}

/**
 * Initialize the simple visualization
 */
const initializeNetwork = () => {
  // Simple initialization for placeholder
  parseOntologyData()
}

/**
 * Parse ontology data and create simple graph representation
 */
const parseOntologyData = () => {
  if (!props.data.trim()) {
    graphNodes.value = []
    graphEdges.value = []
    return
  }

  try {
    if (props.format === 'turtle') {
      parseTurtleData()
    } else if (props.format === 'jsonld') {
      parseJsonLdData()
    }
  } catch (error) {
    console.error('Error parsing ontology data:', error)
  }
}

/**
 * Parse Turtle format data (simplified)
 */
const parseTurtleData = () => {
  const data = props.data
  const nodes = []
  const edges = []

  // Extract class declarations
  const classMatches = data.match(/(\w+:\w+)\s+a\s+owl:Class/g)
  if (classMatches) {
    classMatches.forEach(match => {
      const className = match.split(/\s+/)[0]
      nodes.push({
        id: className,
        label: extractLocalName(className),
        type: 'class'
      })
    })
  }

  // Extract property declarations
  const propertyMatches = data.match(/(\w+:\w+)\s+a\s+owl:(ObjectProperty|DatatypeProperty)/g)
  if (propertyMatches) {
    propertyMatches.forEach(match => {
      const propertyName = match.split(/\s+/)[0]
      nodes.push({
        id: propertyName,
        label: extractLocalName(propertyName),
        type: 'property'
      })
    })
  }

  // Extract individuals
  const individualMatches = data.match(/(\w+:\w+)\s+a\s+(?!owl:)(?!rdfs:)(\w+:\w+)/g)
  if (individualMatches) {
    individualMatches.forEach(match => {
      const parts = match.split(/\s+/)
      const individualName = parts[0]
      const typeName = parts[parts.length - 1]

      nodes.push({
        id: individualName,
        label: extractLocalName(individualName),
        type: 'individual'
      })

      edges.push({
        id: edges.length,
        from: individualName,
        to: typeName,
        fromLabel: extractLocalName(individualName),
        toLabel: extractLocalName(typeName),
        label: 'type'
      })
    })
  }

  graphNodes.value = nodes
  graphEdges.value = edges
}

/**
 * Parse JSON-LD format data (simplified)
 */
const parseJsonLdData = () => {
  try {
    const data = JSON.parse(props.data)
    const nodes = []
    const edges = []

    // Simple JSON-LD parsing
    if (data['@graph']) {
      data['@graph'].forEach(item => {
        if (item['@id']) {
          const id = item['@id']
          const type = item['@type'] ? item['@type'][0] || item['@type'] : 'individual'

          nodes.push({
            id,
            label: item['rdfs:label'] || extractLocalName(id),
            type: type.includes('Class') ? 'class' : type.includes('Property') ? 'property' : 'individual'
          })

          // Add type edge if @type exists
          if (type && !type.includes('Class') && !type.includes('Property')) {
            edges.push({
              id: edges.length,
              from: id,
              to: type,
              fromLabel: item['rdfs:label'] || extractLocalName(id),
              toLabel: extractLocalName(type),
              label: 'type'
            })
          }
        }
      })
    }

    graphNodes.value = nodes
    graphEdges.value = edges
  } catch (error) {
    console.error('Error parsing JSON-LD:', error)
    graphNodes.value = []
    graphEdges.value = []
  }
}

/**
 * Extract local name from URI
 */
const extractLocalName = (uri) => {
  if (uri.includes('#')) {
    return uri.split('#').pop()
  }
  if (uri.includes('/')) {
    return uri.split('/').pop()
  }
  return uri
}

/**
 * Get node type from URI
 */
const getNodeType = (uri) => {
  if (uri.includes('Class')) return 'class'
  if (uri.includes('Property')) return 'property'
  return 'individual'
}

/**
 * Get node type from JSON-LD @type
 */
const getNodeTypeFromJsonLd = (type) => {
  if (!type) return 'individual'
  if (type.includes('Class')) return 'class'
  if (type.includes('Property')) return 'property'
  return 'individual'
}

/**
 * Get node color by type
 */
const getNodeColor = (type) => {
  const colors = {
    class: '#667eea',
    property: '#10b981',
    individual: '#f59e0b',
    literal: '#ef4444'
  }
  return colors[type] || '#94a3b8'
}

/**
 * Get node shape by type
 */
const getNodeShape = (type) => {
  const shapes = {
    class: 'box',
    property: 'ellipse',
    individual: 'dot',
    literal: 'diamond'
  }
  return shapes[type] || 'dot'
}

/**
 * Get node size by type
 */
const getNodeSize = (type) => {
  const sizes = {
    class: 25,
    property: 20,
    individual: 15,
    literal: 12
  }
  return sizes[type] || 15
}

/**
 * Create tooltip for node
 */
const createNodeTooltip = (node) => {
  let tooltip = `<strong>${node.label}</strong><br/>URI: ${node.id}`
  if (node.comment) {
    tooltip += `<br/>Описание: ${node.comment}`
  }
  if (node.properties.length > 0) {
    tooltip += `<br/>Свойств: ${node.properties.length}`
  }
  return tooltip
}

/**
 * Handle node click (simple implementation)
 */
const handleNodeClick = (node) => {
  selectedNode.value = node
}

/**
 * Handle node hover (simple implementation)
 */
const handleNodeHover = () => {
  // Simple hover effect
}

/**
 * Toggle node type filter
 */
const toggleFilter = (filterId) => {
  const filter = nodeFilters.value.find(f => f.id === filterId)
  if (filter) {
    filter.active = !filter.active
    updateVisibility()
  }
}

/**
 * Update node visibility based on filters
 */
const updateVisibility = () => {
  const activeFilters = nodeFilters.value.filter(f => f.active).map(f => f.id)
  
  const allNodes = nodes.get()
  allNodes.forEach(node => {
    const isVisible = activeFilters.includes(node.type)
    nodes.update({ ...node, hidden: !isVisible })
  })
}

/**
 * Apply selected layout (simple implementation)
 */
const applyLayout = () => {
  // Simple layout application - just re-parse the data
  parseOntologyData()
}

/**
 * Fit network to view (simple implementation)
 */
const fitToView = () => {
  // Simple fit - just log for now
  console.log('Fit to view')
}

/**
 * Reset zoom (simple implementation)
 */
const resetZoom = () => {
  // Simple reset - just log for now
  console.log('Reset zoom')
}

/**
 * Toggle labels (simple implementation)
 */
const toggleLabels = () => {
  showLabels.value = !showLabels.value
  // Simple label toggle - just re-render
  parseOntologyData()
}

// Watch for data changes
watch([() => props.data, () => props.format], () => {
  parseOntologyData()
}, { immediate: true })

// Lifecycle
onMounted(async () => {
  await nextTick()
  initializeNetwork()
})

onBeforeUnmount(() => {
  // Cleanup if needed
})
</script>

<style scoped>
.ontology-visualization {
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
}

.viz-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
}

.control-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.control-group label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  white-space: nowrap;
}

.filter-buttons {
  display: flex;
  gap: 0.25rem;
}

.filter-btn {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
  background: white;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s;
}

.filter-btn:hover {
  background: #f3f4f6;
}

.filter-btn.active {
  background: #667eea;
  color: white;
  border-color: #667eea;
}

.filter-icon {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.layout-select {
  padding: 0.375rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.875rem;
  background: white;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
  background: white;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s;
}

.action-btn:hover {
  background: #f3f4f6;
}

.action-btn .icon {
  font-size: 1rem;
}

.network-container {
  flex: 1;
  min-height: 400px;
  background: white;
  position: relative;
}

.visualization-content {
  padding: 1rem;
}

.graph-preview {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.graph-nodes {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem;
  border: 2px dashed #e5e7eb;
  border-radius: 8px;
  min-height: 120px;
}

.graph-node {
  padding: 0.75rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.875rem;
  font-weight: 500;
  display: flex;
  align-items: center;
}

.graph-node.class {
  background: #dbeafe;
  border: 2px solid #667eea;
  color: #1e40af;
}

.graph-node.property {
  background: #dcfce7;
  border: 2px solid #10b981;
  color: #065f46;
}

.graph-node.individual {
  background: #fef3c7;
  border: 2px solid #f59e0b;
  color: #92400e;
}

.graph-node:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.graph-edges {
  padding: 1rem;
  background: #f9fafb;
  border-radius: 8px;
}

.graph-edge {
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  background: white;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
  font-size: 0.875rem;
}

.edge-label {
  font-size: 0.75rem;
  color: #6b7280;
  margin-left: 0.5rem;
  padding: 0.125rem 0.375rem;
  background: #f3f4f6;
  border-radius: 4px;
}

.node-info {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 300px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
  z-index: 10;
}

.info-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
  background: #f9fafb;
  border-radius: 8px 8px 0 0;
}

.info-header h3 {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #6b7280;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  color: #374151;
}

.info-content {
  padding: 1rem;
  max-height: 300px;
  overflow-y: auto;
}

.info-row {
  margin-bottom: 0.75rem;
}

.info-row strong {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.25rem;
}

.uri {
  font-family: monospace;
  font-size: 0.75rem;
  color: #6b7280;
  word-break: break-all;
}

.info-section {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #f3f4f6;
}

.property-list,
.connection-list {
  margin: 0.5rem 0 0 0;
  padding: 0;
  list-style: none;
}

.property-list li,
.connection-list li {
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.25rem;
}

.legend {
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
}

.legend h4 {
  margin: 0 0 0.75rem 0;
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
}

.legend-items {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #6b7280;
}

.legend-icon {
  width: 12px;
  height: 12px;
  border-radius: 2px;
}

/* Responsive */
@media (max-width: 768px) {
  .viz-controls {
    flex-direction: column;
    align-items: stretch;
  }
  
  .control-group {
    flex-wrap: wrap;
  }
  
  .filter-buttons {
    flex-wrap: wrap;
  }
  
  .node-info {
    position: fixed;
    top: auto;
    bottom: 0;
    left: 0;
    right: 0;
    width: auto;
    border-radius: 16px 16px 0 0;
  }
  
  .legend {
    position: static;
    margin-top: 1rem;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .filter-btn,
  .action-btn {
    transition: none;
  }
}
</style>
