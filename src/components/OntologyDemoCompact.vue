<template>
  <div class="ontology-demo-compact">
    <!-- Header -->
    <div class="demo-header">
      <div class="demo-badge">Demo</div>
      <h2>Попробуйте редактор онтологий</h2>
      <p>Создайте мини-онтологию прямо в браузере с валидацией и визуализацией</p>
    </div>

    <!-- Compact Editor Interface -->
    <div class="demo-interface">
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

      <div class="demo-content">
        <!-- Editor Tab -->
        <div v-show="activeTab === 'editor'" class="tab-panel">
          <div class="editor-simple">
            <div class="editor-toolbar">
              <select 
                v-model="editorFormat" 
                class="format-select"
                @change="convertFormat"
              >
                <option value="turtle">Turtle</option>
                <option value="jsonld">JSON-LD</option>
              </select>
              
              <button @click="formatCode" class="toolbar-btn">
                <span class="icon">⌘</span>
                Форматировать
              </button>
            </div>
            
            <textarea
              v-model="ontologyData"
              class="editor-textarea"
              placeholder="Введите онтологию в формате Turtle..."
              spellcheck="false"
            ></textarea>
          </div>
        </div>

        <!-- Visualization Tab -->
        <div v-show="activeTab === 'visualization'" class="tab-panel">
          <div class="visualization-simple">
            <div v-if="!ontologyData.trim()" class="placeholder">
              <div class="placeholder-icon">🎯</div>
              <div class="placeholder-text">
                Добавьте онтологию для визуализации
              </div>
            </div>
            
            <div v-else class="graph-preview">
              <div class="graph-info">
                <div class="info-item">
                  <span class="info-label">Классы:</span>
                  <span class="info-value">{{ stats.classes }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Свойства:</span>
                  <span class="info-value">{{ stats.properties }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Индивиды:</span>
                  <span class="info-value">{{ stats.individuals }}</span>
                </div>
              </div>
              
              <div class="graph-placeholder">
                <div class="graph-icon">📊</div>
                <div class="graph-text">
                  Граф визуализация
                  <br />
                  <small>{{ stats.total }} элементов</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Query Tab -->
        <div v-show="activeTab === 'queries'" class="tab-panel">
          <div class="queries-simple">
            <div class="preset-queries">
              <h4>Готовые запросы:</h4>
              <div class="query-buttons">
                <button 
                  v-for="query in presetQueries"
                  :key="query.name"
                  @click="runQuery(query)"
                  class="query-btn"
                >
                  {{ query.name }}
                </button>
              </div>
            </div>
            
            <div v-if="queryResult" class="query-result">
              <h4>Результат:</h4>
              <div class="result-preview">
                {{ queryResult }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="demo-actions">
      <div class="action-buttons">
        <button @click="loadTemplate" class="action-btn">
          <span class="icon">📝</span>
          Загрузить шаблон
        </button>
        
        <button @click="validateOntology" class="action-btn">
          <span class="icon">✓</span>
          Валидация
        </button>
        
        <button @click="exportOntology" class="action-btn">
          <span class="icon">💾</span>
          Экспорт
        </button>
      </div>
      
      <router-link 
        to="/demo/ontology-editor" 
        class="full-editor-link"
      >
        Открыть полный редактор →
      </router-link>
    </div>

    <!-- Status -->
    <div v-if="status" :class="['demo-status', status.type]">
      <span class="status-icon">
        {{ status.type === 'success' ? '✅' : status.type === 'error' ? '❌' : 'ℹ️' }}
      </span>
      <span class="status-message">{{ status.message }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useOntologyTemplate } from '@/composables/useOntologyTemplate'

// Composables
const { getDefaultTemplate, getPresetQueries } = useOntologyTemplate()

// State
const activeTab = ref('editor')
const editorFormat = ref('turtle')
const ontologyData = ref('')
const queryResult = ref(null)
const status = ref(null)

// Configuration
const tabs = [
  { id: 'editor', label: 'Редактор' },
  { id: 'visualization', label: 'Визуализация' },
  { id: 'queries', label: 'Запросы' }
]

const presetQueries = getPresetQueries().slice(0, 2) // Show only first 2 queries

// Computed
const stats = computed(() => {
  if (!ontologyData.value.trim()) {
    return { classes: 0, properties: 0, individuals: 0, total: 0 }
  }

  // Simple regex-based counting for demo purposes
  const data = ontologyData.value

  let classes = 0
  let properties = 0
  let individuals = 0

  if (editorFormat.value === 'turtle') {
    // Count OWL classes
    classes = (data.match(/owl:Class/g) || []).length
    // Count properties
    properties = (data.match(/owl:(ObjectProperty|DatatypeProperty)/g) || []).length
    // Count individuals (rough estimate)
    individuals = (data.match(/a\s+/g) || []).length - classes - properties
  }

  return {
    classes: Math.max(0, classes),
    properties: Math.max(0, properties),
    individuals: Math.max(0, individuals),
    total: classes + properties + individuals
  }
})

/**
 * Load template ontology
 */
const loadTemplate = () => {
  ontologyData.value = getDefaultTemplate(editorFormat.value)
  showStatus('success', 'Шаблон загружен')
}

/**
 * Format code
 */
const formatCode = () => {
  if (!ontologyData.value.trim()) return
  
  if (editorFormat.value === 'turtle') {
    // Basic Turtle formatting
    const formatted = ontologyData.value
      .replace(/\s+/g, ' ')
      .replace(/\.\s*/g, ' .\n')
      .replace(/@prefix\s+/g, '\n@prefix ')
      .trim()
    
    ontologyData.value = formatted
  } else if (editorFormat.value === 'jsonld') {
    try {
      const parsed = JSON.parse(ontologyData.value)
      ontologyData.value = JSON.stringify(parsed, null, 2)
    } catch (error) {
      showStatus('error', 'Ошибка форматирования JSON-LD')
      return
    }
  }
  
  showStatus('success', 'Код отформатирован')
}

/**
 * Convert between formats
 */
const convertFormat = () => {
  if (!ontologyData.value.trim()) {
    ontologyData.value = getDefaultTemplate(editorFormat.value)
    return
  }
  
  // For demo purposes, just load appropriate template
  // In a full implementation, this would convert between formats
  ontologyData.value = getDefaultTemplate(editorFormat.value)
  showStatus('info', `Формат изменен на ${editorFormat.value.toUpperCase()}`)
}

/**
 * Validate ontology
 */
const validateOntology = () => {
  if (!ontologyData.value.trim()) {
    showStatus('error', 'Нет данных для валидации')
    return
  }
  
  try {
    if (editorFormat.value === 'turtle') {
      const parser = new Parser()
      parser.parse(ontologyData.value)
      showStatus('success', 'Синтаксис корректен')
    } else if (editorFormat.value === 'jsonld') {
      JSON.parse(ontologyData.value)
      showStatus('success', 'JSON-LD валиден')
    }
  } catch (error) {
    showStatus('error', `Ошибка валидации: ${error.message}`)
  }
}

/**
 * Export ontology
 */
const exportOntology = () => {
  if (!ontologyData.value.trim()) {
    showStatus('error', 'Нет данных для экспорта')
    return
  }
  
  const blob = new Blob([ontologyData.value], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  
  link.href = url
  link.download = `ontology.${editorFormat.value === 'turtle' ? 'ttl' : 'jsonld'}`
  link.click()
  
  URL.revokeObjectURL(url)
  showStatus('success', 'Файл экспортирован')
}

/**
 * Run preset query
 */
const runQuery = (query) => {
  if (!ontologyData.value.trim()) {
    showStatus('error', 'Загрузите онтологию для выполнения запросов')
    return
  }
  
  // Simplified query execution for demo
  queryResult.value = `Результат запроса "${query.name}": найдено ${Math.floor(Math.random() * 10) + 1} элементов`
  showStatus('success', 'Запрос выполнен')
}

/**
 * Show status message
 */
const showStatus = (type, message) => {
  status.value = { type, message }
  setTimeout(() => {
    status.value = null
  }, 3000)
}

// Initialize with template
loadTemplate()
</script>

<style scoped>
.ontology-demo-compact {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin: 2rem 0;
}

.demo-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
  text-align: center;
  position: relative;
}

.demo-badge {
  display: inline-block;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 1rem;
  backdrop-filter: blur(10px);
}

.demo-header h2 {
  margin: 0 0 0.5rem 0;
  font-size: 1.875rem;
  font-weight: 700;
}

.demo-header p {
  margin: 0;
  opacity: 0.9;
  font-size: 1.125rem;
}

.demo-interface {
  border-bottom: 1px solid #e5e7eb;
}

.demo-tabs {
  display: flex;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
}

.demo-tab {
  flex: 1;
  padding: 1rem;
  background: none;
  border: none;
  font-size: 0.875rem;
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
  min-height: 300px;
}

.tab-panel {
  padding: 1.5rem;
  height: 100%;
}

.editor-simple {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
}

.editor-toolbar {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.format-select {
  padding: 0.375rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.875rem;
  background: white;
}

.toolbar-btn {
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

.toolbar-btn:hover {
  background: #f3f4f6;
}

.editor-textarea {
  flex: 1;
  min-height: 200px;
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.875rem;
  line-height: 1.5;
  resize: vertical;
}

.editor-textarea:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.visualization-simple {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 250px;
}

.placeholder {
  text-align: center;
  color: #6b7280;
}

.placeholder-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.placeholder-text {
  font-size: 1.125rem;
}

.graph-preview {
  width: 100%;
  text-align: center;
}

.graph-info {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 8px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  align-items: center;
}

.info-label {
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
}

.info-value {
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
}

.graph-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  border: 2px dashed #d1d5db;
  border-radius: 8px;
  color: #6b7280;
}

.graph-icon {
  font-size: 3rem;
  opacity: 0.7;
}

.graph-text {
  font-size: 1.125rem;
  font-weight: 500;
}

.queries-simple {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.preset-queries h4 {
  margin: 0 0 1rem 0;
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
}

.query-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.query-btn {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  background: #f3f4f6;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s;
}

.query-btn:hover {
  background: #e5e7eb;
}

.query-result h4 {
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
}

.result-preview {
  padding: 1rem;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 6px;
  font-size: 0.875rem;
  color: #166534;
}

.demo-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  background: #f9fafb;
}

.action-buttons {
  display: flex;
  gap: 0.75rem;
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
  border-color: #9ca3af;
}

.full-editor-link {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.875rem;
  padding: 0.5rem 1rem;
  border: 1px solid #667eea;
  border-radius: 6px;
  transition: all 0.15s;
}

.full-editor-link:hover {
  background: #667eea;
  color: white;
}

.demo-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  font-size: 0.875rem;
  font-weight: 500;
}

.demo-status.success {
  background: #d1fae5;
  color: #065f46;
}

.demo-status.error {
  background: #fee2e2;
  color: #991b1b;
}

.demo-status.info {
  background: #eff6ff;
  color: #1e40af;
}

.icon {
  font-size: 1rem;
}

/* Responsive */
@media (max-width: 768px) {
  .demo-header {
    padding: 1.5rem;
  }
  
  .demo-header h2 {
    font-size: 1.5rem;
  }
  
  .demo-header p {
    font-size: 1rem;
  }
  
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
  
  .graph-info {
    flex-direction: column;
    gap: 1rem;
  }
  
  .demo-actions {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
    text-align: center;
  }
  
  .action-buttons {
    justify-content: center;
    flex-wrap: wrap;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .demo-tab,
  .toolbar-btn,
  .action-btn,
  .query-btn,
  .full-editor-link {
    transition: none;
  }
}
</style>
