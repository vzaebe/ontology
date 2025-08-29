<template>
  <div class="ontology-demo">
    <!-- Header Section -->
    <section class="demo-header">
      <div class="demo-cover">
        <div class="demo-badge">Demo</div>
        <h1>Редактор онтологий</h1>
        <p class="demo-description">
          Создайте мини-онтологию: классы, свойства, связи. Проверка SHACL и граф-визуализация.
        </p>
      </div>
    </section>

    <!-- Main Editor Interface -->
    <section class="demo-interface">
      <div class="demo-container">
        <!-- Main Content Area -->
        <div class="demo-main">
          <!-- Tab Navigation -->
          <div class="demo-tabs">
            <button 
              v-for="tab in tabs" 
              :key="tab.id"
              :class="['demo-tab', { active: activeTab === tab.id }]"
              @click="activeTab = tab.id"
            >
              {{ tab.label }}
            </button>
          </div>

          <!-- Tab Content -->
          <div class="demo-content">
            <!-- Editor Tab -->
            <div v-show="activeTab === 'editor'" class="tab-panel">
              <OntologyEditor 
                v-model="ontologyData"
                :format="editorFormat"
                @format-change="editorFormat = $event"
              />
            </div>

            <!-- Visualization Tab -->
            <div v-show="activeTab === 'visualization'" class="tab-panel">
              <OntologyVisualization 
                :data="ontologyData"
                :format="editorFormat"
              />
            </div>

            <!-- Queries Tab -->
            <div v-show="activeTab === 'queries'" class="tab-panel">
              <OntologyQueries 
                :data="ontologyData"
                :format="editorFormat"
              />
            </div>
          </div>
        </div>

        <!-- Side Inspector Panel -->
        <div class="demo-inspector">
          <OntologyInspector 
            v-model="ontologyData"
            :format="editorFormat"
            @add-entity="handleAddEntity"
          />
        </div>
      </div>

      <!-- Bottom Actions Panel -->
      <div class="demo-actions">
        <OntologyActions
          v-model="ontologyData"
          :format="editorFormat"
          :validation-results="validationResults"
          @import="handleImport"
          @export="handleExport"
          @reset="handleReset"
          @validate="handleValidate"
          @format-change="editorFormat = $event"
        />
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, provide } from 'vue'
import OntologyEditor from '@/components/OntologyEditor.vue'
import OntologyVisualization from '@/components/OntologyVisualization.vue'
import OntologyQueries from '@/components/OntologyQueries.vue'
import OntologyInspector from '@/components/OntologyInspector.vue'
import OntologyActions from '@/components/OntologyActions.vue'
import { useOntologyTemplate } from '@/composables/useOntologyTemplate'
import { useOntologyValidation } from '@/composables/useOntologyValidation'

// Meta tags can be set using @vueuse/head when the package is installed

// State
const activeTab = ref('editor')
const editorFormat = ref('turtle') // 'turtle' or 'jsonld'
const ontologyData = ref('')
const validationResults = ref(null)

// Tab configuration
const tabs = [
  { id: 'editor', label: 'Редактор' },
  { id: 'visualization', label: 'Визуализация' },
  { id: 'queries', label: 'Запросы' }
]

// Composables
const { getDefaultTemplate, resetToTemplate } = useOntologyTemplate()
const { validateOntology } = useOntologyValidation()

// Event handlers
const handleAddEntity = (entity) => {
  // Logic to add entity to ontology data
  console.log('Adding entity:', entity)
}

const handleImport = (data) => {
  ontologyData.value = data
  localStorage.setItem('ontologyData', data)
}

const handleExport = () => {
  const blob = new Blob([ontologyData.value], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `ontology.${editorFormat.value === 'turtle' ? 'ttl' : 'jsonld'}`
  link.click()
  URL.revokeObjectURL(url)
}

const handleReset = () => {
  ontologyData.value = resetToTemplate()
  localStorage.setItem('ontologyData', ontologyData.value)
}

const handleValidate = async () => {
  try {
    validationResults.value = await validateOntology(ontologyData.value, editorFormat.value)
  } catch (error) {
    console.error('Validation error:', error)
    validationResults.value = { error: error.message }
  }
}

// Initialize
onMounted(() => {
  // Load from localStorage or use default template
  const saved = localStorage.getItem('ontologyData')
  ontologyData.value = saved || getDefaultTemplate()
})

// Provide shared state to child components
provide('ontologyData', ontologyData)
provide('editorFormat', editorFormat)
provide('validationResults', validationResults)
</script>

<style scoped>
.ontology-demo {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.demo-header {
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
}

.demo-cover {
  max-width: 1200px;
  margin: 0 auto;
  aspect-ratio: 16/9;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
}

.demo-badge {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 1rem;
  backdrop-filter: blur(10px);
}

.demo-cover h1 {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.demo-description {
  font-size: 1.2rem;
  max-width: 600px;
  opacity: 0.9;
  line-height: 1.6;
}

.demo-interface {
  background: white;
  min-height: calc(100vh - 300px);
}

.demo-container {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 2rem;
  padding: 2rem;
}

.demo-main {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.demo-tabs {
  display: flex;
  border-bottom: 1px solid #e5e7eb;
  background: #f9fafb;
}

.demo-tab {
  flex: 1;
  padding: 1rem 2rem;
  background: none;
  border: none;
  font-size: 1rem;
  font-weight: 500;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s;
  border-bottom: 3px solid transparent;
}

.demo-tab:hover {
  background: #f3f4f6;
  color: #374151;
}

.demo-tab.active {
  color: #667eea;
  border-bottom-color: #667eea;
  background: white;
}

.demo-content {
  min-height: 500px;
}

.tab-panel {
  padding: 2rem;
  height: 100%;
}

.demo-inspector {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  height: fit-content;
  position: sticky;
  top: 2rem;
}

.demo-actions {
  background: #f9fafb;
  border-top: 1px solid #e5e7eb;
  padding: 1rem 2rem;
  position: sticky;
  bottom: 0;
  z-index: 10;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .demo-container {
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 1rem;
  }
  
  .demo-inspector {
    position: static;
    order: -1;
  }
  
  .demo-cover h1 {
    font-size: 2rem;
  }
  
  .demo-description {
    font-size: 1rem;
  }
}

@media (max-width: 768px) {
  .demo-tabs {
    flex-direction: column;
  }
  
  .demo-tab {
    border-bottom: 1px solid #e5e7eb;
    border-right: none;
  }
  
  .demo-tab.active {
    border-bottom-color: #e5e7eb;
    border-left: 3px solid #667eea;
  }
  
  .tab-panel {
    padding: 1rem;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .demo-tab {
    transition: none;
  }
}

/* Focus styles for keyboard navigation */
.demo-tab:focus-visible {
  outline: 2px solid #667eea;
  outline-offset: -2px;
}
</style>
