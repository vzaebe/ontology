<template>
  <div class="ontology-queries">
    <!-- Query Controls -->
    <div class="query-controls">
      <div class="preset-queries">
        <label>Готовые запросы:</label>
        <div class="preset-buttons">
          <button 
            v-for="(query, index) in presetQueries"
            :key="index"
            @click="loadPresetQuery(query)"
            class="preset-btn"
          >
            {{ query.name }}
          </button>
        </div>
      </div>
      
      <div class="query-actions">
        <button 
          @click="executeQuery"
          :disabled="!currentQuery.trim() || isExecuting"
          class="execute-btn"
        >
          <span v-if="isExecuting" class="loading">⟳</span>
          <span v-else class="icon">▶</span>
          Выполнить
        </button>
        
        <button 
          @click="clearQuery"
          class="action-btn"
        >
          <span class="icon">🗑</span>
          Очистить
        </button>
        
        <button 
          @click="formatQuery"
          class="action-btn"
        >
          <span class="icon">⌘</span>
          Форматировать
        </button>
      </div>
    </div>

    <!-- SPARQL Editor -->
    <div class="query-editor">
      <div class="editor-header">
        <h3>SPARQL Запрос</h3>
        <div class="query-info">
          <span class="info-item">Строки: {{ queryLineCount }}</span>
          <span class="info-item">Символы: {{ currentQuery.length }}</span>
        </div>
      </div>
      
      <textarea
        v-model="currentQuery"
        class="sparql-textarea"
        placeholder="Введите SPARQL запрос..."
        @keydown="handleKeydown"
        spellcheck="false"
      ></textarea>
    </div>

    <!-- Results Section -->
    <div class="query-results">
      <div class="results-header">
        <h3>Результаты</h3>
        <div v-if="lastExecutionTime" class="execution-info">
          <span class="info-item">Время выполнения: {{ lastExecutionTime }}мс</span>
          <span v-if="queryResults" class="info-item">
            Результатов: {{ queryResults.length }}
          </span>
        </div>
      </div>
      
      <!-- Error Display -->
      <div v-if="queryError" class="error-message">
        <div class="error-header">
          <span class="error-icon">⚠️</span>
          Ошибка запроса
        </div>
        <div class="error-detail">{{ queryError }}</div>
      </div>
      
      <!-- Results Table -->
      <div v-else-if="queryResults && queryResults.length > 0" class="results-table-container">
        <table class="results-table">
          <thead>
            <tr>
              <th v-for="variable in resultVariables" :key="variable">
                {{ variable }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(result, index) in queryResults" :key="index">
              <td v-for="variable in resultVariables" :key="variable">
                <span 
                  :class="['result-value', getValueTypeClass(result[variable])]"
                  :title="result[variable]?.type"
                >
                  {{ formatResultValue(result[variable]) }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Empty Results -->
      <div v-else-if="queryResults && queryResults.length === 0" class="empty-results">
        <div class="empty-icon">📭</div>
        <div class="empty-message">Запрос не вернул результатов</div>
      </div>
      
      <!-- No Query Executed -->
      <div v-else class="no-query">
        <div class="no-query-icon">🔍</div>
        <div class="no-query-message">
          Выберите готовый запрос или введите свой SPARQL запрос
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useOntologyTemplate } from '@/composables/useOntologyTemplate'

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

// State
const currentQuery = ref('')
const queryResults = ref(null)
const queryError = ref(null)
const isExecuting = ref(false)
const lastExecutionTime = ref(null)

// Get preset queries from template
const { getPresetQueries } = useOntologyTemplate()
const presetQueries = getPresetQueries()

// Computed
const queryLineCount = computed(() => {
  return currentQuery.value.split('\n').length
})

const resultVariables = computed(() => {
  if (!queryResults.value || queryResults.value.length === 0) return []
  return Object.keys(queryResults.value[0]).filter(key => key !== 'index')
})

/**
 * Load preset query
 */
const loadPresetQuery = (query) => {
  currentQuery.value = query.query
  queryResults.value = null
  queryError.value = null
}

/**
 * Execute SPARQL query
 */
const executeQuery = async () => {
  if (!currentQuery.value.trim()) return

  isExecuting.value = true
  queryError.value = null
  queryResults.value = null

  const startTime = performance.now()

  try {
    // For demo purposes, we'll implement basic SELECT query parsing
    // In a full implementation, this would use a proper SPARQL engine
    const results = await executeBasicSparqlQuery(currentQuery.value)
    queryResults.value = results
  } catch (error) {
    queryError.value = error.message
  } finally {
    isExecuting.value = false
    lastExecutionTime.value = Math.round(performance.now() - startTime)
  }
}

/**
 * Execute basic SPARQL query (simplified implementation)
 */
const executeBasicSparqlQuery = async (query) => {
  // Parse the query to extract SELECT variables and WHERE patterns
  const selectMatch = query.match(/SELECT\s+(.*?)\s+WHERE/i)
  if (!selectMatch) {
    throw new Error('Поддерживаются только SELECT запросы')
  }

  const variables = selectMatch[1]
    .split(/\s+/)
    .filter(v => v.startsWith('?'))
    .map(v => v.substring(1))

  // Get all quads from the store
  const quads = rdfStore.value.getQuads()
  
  if (quads.length === 0) {
    return []
  }

  // Simple pattern matching for demo
  const results = []

  if (query.includes('?class') && query.includes('owl:Class')) {
    // Classes query
    const classQuads = quads.filter(q => 
      q.predicate.value === 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type' &&
      q.object.value === 'http://www.w3.org/2002/07/owl#Class'
    )
    
    classQuads.forEach(quad => {
      // Count individuals of this class
      const individualsCount = quads.filter(q =>
        q.predicate.value === 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type' &&
        q.object.value === quad.subject.value
      ).length

      results.push({
        class: {
          type: 'uri',
          value: quad.subject.value
        },
        count: {
          type: 'literal',
          value: individualsCount.toString()
        }
      })
    })
  } else if (query.includes('?equipment') && query.includes('?requirement')) {
    // Equipment-requirement query
    const equipmentQuads = quads.filter(q =>
      q.predicate.value === 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type' &&
      q.object.value.includes('Equipment')
    )

    equipmentQuads.forEach(equipmentQuad => {
      const requirementQuads = quads.filter(q =>
        q.subject.value === equipmentQuad.subject.value &&
        q.object.value.includes('Requirement')
      )

      requirementQuads.forEach(reqQuad => {
        results.push({
          equipment: {
            type: 'uri',
            value: equipmentQuad.subject.value
          },
          requirement: {
            type: 'uri',
            value: reqQuad.object.value
          }
        })
      })
    })
  } else if (query.includes('?document') && query.includes('?equipment') && query.includes('?tag')) {
    // Document tracing query
    const documentQuads = quads.filter(q =>
      q.predicate.value.includes('hasDocument')
    )

    documentQuads.forEach(docQuad => {
      const tagQuads = quads.filter(q =>
        q.subject.value === docQuad.subject.value &&
        q.predicate.value.includes('hasTag')
      )

      tagQuads.forEach(tagQuad => {
        results.push({
          document: {
            type: 'uri',
            value: docQuad.object.value
          },
          equipment: {
            type: 'uri',
            value: docQuad.subject.value
          },
          tag: {
            type: 'literal',
            value: tagQuad.object.value.replace(/^"|"$/g, '')
          }
        })
      })
    })
  } else {
    // Generic query - return all triples
    quads.slice(0, 50).forEach((quad, index) => { // Limit to 50 for demo
      results.push({
        subject: {
          type: 'uri',
          value: quad.subject.value
        },
        predicate: {
          type: 'uri',
          value: quad.predicate.value
        },
        object: {
          type: quad.object.termType === 'Literal' ? 'literal' : 'uri',
          value: quad.object.value
        }
      })
    })
  }

  return results
}

/**
 * Clear query
 */
const clearQuery = () => {
  currentQuery.value = ''
  queryResults.value = null
  queryError.value = null
}

/**
 * Format query (basic indentation)
 */
const formatQuery = () => {
  if (!currentQuery.value.trim()) return

  // Basic SPARQL formatting
  let formatted = currentQuery.value
    .replace(/\s+/g, ' ')
    .replace(/SELECT\s+/i, 'SELECT ')
    .replace(/WHERE\s*\{/i, 'WHERE {\n  ')
    .replace(/\.\s*/g, ' .\n  ')
    .replace(/\}\s*$/, '\n}')
    .trim()

  currentQuery.value = formatted
}

/**
 * Handle keyboard shortcuts
 */
const handleKeydown = (event) => {
  if (event.ctrlKey || event.metaKey) {
    if (event.key === 'Enter') {
      event.preventDefault()
      executeQuery()
    } else if (event.key === 's') {
      event.preventDefault()
      // Save query to localStorage
      localStorage.setItem('lastSparqlQuery', currentQuery.value)
    }
  }
}

/**
 * Format result value for display
 */
const formatResultValue = (value) => {
  if (!value) return ''
  
  if (value.type === 'uri') {
    return extractLocalName(value.value)
  } else if (value.type === 'literal') {
    return value.value
  }
  
  return value.value
}

/**
 * Get CSS class for value type
 */
const getValueTypeClass = (value) => {
  if (!value) return ''
  
  switch (value.type) {
    case 'uri': return 'value-uri'
    case 'literal': return 'value-literal'
    default: return ''
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
 * Parse ontology data (simplified)
 */
const parseOntologyData = () => {
  // Simple parsing - no N3 store needed for basic demo
  if (!props.data.trim()) return

  // The actual query execution will parse the data as needed
  console.log('Ontology data updated for queries')
}

// Watch for data changes
watch([() => props.data, () => props.format], () => {
  parseOntologyData()
}, { immediate: true })

// Load last query on mount
const loadLastQuery = () => {
  const saved = localStorage.getItem('lastSparqlQuery')
  if (saved) {
    currentQuery.value = saved
  }
}

// Initialize
loadLastQuery()
</script>

<style scoped>
.ontology-queries {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.query-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

.preset-queries {
  flex: 1;
  min-width: 300px;
}

.preset-queries label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
}

.preset-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.preset-btn {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  background: white;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;
}

.preset-btn:hover {
  background: #f3f4f6;
  border-color: #9ca3af;
}

.preset-btn:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.query-actions {
  display: flex;
  gap: 0.5rem;
  align-items: flex-end;
}

.execute-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: white;
  background: #667eea;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s;
}

.execute-btn:hover:not(:disabled) {
  background: #5a67d8;
}

.execute-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem 0.75rem;
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

.loading {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.query-editor {
  flex: 1;
  min-height: 200px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
}

.editor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
}

.editor-header h3 {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
}

.query-info {
  display: flex;
  gap: 1rem;
}

.info-item {
  font-size: 0.75rem;
  color: #6b7280;
}

.sparql-textarea {
  width: 100%;
  height: 200px;
  padding: 1rem;
  border: none;
  resize: vertical;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.875rem;
  line-height: 1.5;
  background: white;
  color: #374151;
}

.sparql-textarea:focus {
  outline: none;
}

.query-results {
  flex: 1;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
}

.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
}

.results-header h3 {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
}

.execution-info {
  display: flex;
  gap: 1rem;
}

.error-message {
  padding: 1rem;
  background: #fef2f2;
  border-left: 4px solid #ef4444;
}

.error-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: #dc2626;
  margin-bottom: 0.5rem;
}

.error-detail {
  font-size: 0.875rem;
  color: #991b1b;
  font-family: monospace;
}

.results-table-container {
  max-height: 400px;
  overflow: auto;
}

.results-table {
  width: 100%;
  border-collapse: collapse;
}

.results-table th {
  background: #f9fafb;
  padding: 0.75rem;
  text-align: left;
  font-weight: 600;
  color: #374151;
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
}

.results-table td {
  padding: 0.75rem;
  border-bottom: 1px solid #f3f4f6;
  vertical-align: top;
}

.result-value {
  display: inline-block;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.value-uri {
  color: #0066cc;
  font-family: monospace;
  font-size: 0.875rem;
}

.value-literal {
  color: #059669;
}

.empty-results,
.no-query {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  color: #6b7280;
  text-align: center;
}

.empty-icon,
.no-query-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.empty-message,
.no-query-message {
  font-size: 1rem;
  line-height: 1.5;
}

/* Responsive */
@media (max-width: 768px) {
  .query-controls {
    flex-direction: column;
  }
  
  .preset-queries {
    min-width: auto;
  }
  
  .preset-buttons {
    justify-content: center;
  }
  
  .query-actions {
    justify-content: center;
  }
  
  .results-header {
    flex-direction: column;
    gap: 0.5rem;
    align-items: stretch;
    text-align: center;
  }
  
  .execution-info {
    justify-content: center;
  }
  
  .result-value {
    max-width: 150px;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .preset-btn,
  .execute-btn,
  .action-btn {
    transition: none;
  }
  
  .loading {
    animation: none;
  }
}
</style>
