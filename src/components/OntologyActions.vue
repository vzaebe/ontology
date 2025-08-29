<template>
  <div class="ontology-actions">
    <div class="actions-container">
      <!-- Import Section -->
      <div class="action-group">
        <label class="action-label">Импорт</label>
        <div class="action-buttons">
          <div class="file-input-wrapper">
            <input 
              ref="fileInput"
              type="file"
              accept=".ttl,.jsonld,.rdf,.owl"
              @change="handleFileImport"
              class="file-input"
              id="file-import"
            />
            <label for="file-import" class="action-btn file-btn">
              <span class="icon">📁</span>
              Файл
            </label>
          </div>
          
          <button 
            @click="showUrlImport = true"
            class="action-btn"
          >
            <span class="icon">🌐</span>
            URL
          </button>
          
          <button 
            @click="importFromClipboard"
            class="action-btn"
          >
            <span class="icon">📋</span>
            Буфер
          </button>
        </div>
      </div>

      <!-- Export Section -->
      <div class="action-group">
        <label class="action-label">Экспорт</label>
        <div class="action-buttons">
          <button 
            @click="exportFile('turtle')"
            :disabled="!modelValue.trim()"
            class="action-btn"
          >
            <span class="icon">💾</span>
            TTL
          </button>
          
          <button 
            @click="exportFile('jsonld')"
            :disabled="!modelValue.trim()"
            class="action-btn"
          >
            <span class="icon">💾</span>
            JSON-LD
          </button>
          
          <button 
            @click="copyToClipboard"
            :disabled="!modelValue.trim()"
            class="action-btn"
          >
            <span class="icon">📋</span>
            Копировать
          </button>
        </div>
      </div>

      <!-- Format Section -->
      <div class="action-group">
        <label class="action-label">Формат</label>
        <div class="action-buttons">
          <select 
            :value="format"
            @change="$emit('format-change', $event.target.value)"
            class="format-select"
          >
            <option value="turtle">Turtle</option>
            <option value="jsonld">JSON-LD</option>
          </select>
        </div>
      </div>

      <!-- Validation Section -->
      <div class="action-group">
        <label class="action-label">Валидация</label>
        <div class="action-buttons">
          <button 
            @click="$emit('validate')"
            :disabled="!modelValue.trim() || isValidating"
            class="action-btn validate-btn"
          >
            <span v-if="isValidating" class="loading">⟳</span>
            <span v-else class="icon">✓</span>
            SHACL
          </button>
          
          <div v-if="validationResults" class="validation-status">
            <span :class="['status-indicator', getValidationStatusClass()]">
              {{ getValidationStatusText() }}
            </span>
            
            <button 
              v-if="validationResults.violations && validationResults.violations.length > 0"
              @click="showValidationDetails = !showValidationDetails"
              class="details-btn"
            >
              {{ showValidationDetails ? 'Скрыть' : 'Детали' }}
            </button>
          </div>
        </div>
      </div>

      <!-- Template Section -->
      <div class="action-group">
        <label class="action-label">Шаблон</label>
        <div class="action-buttons">
          <button 
            @click="$emit('reset')"
            class="action-btn reset-btn"
          >
            <span class="icon">🔄</span>
            Сброс
          </button>
        </div>
      </div>
    </div>

    <!-- Validation Details Modal -->
    <div v-if="showValidationDetails" class="validation-modal" @click="showValidationDetails = false">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>Результаты валидации</h3>
          <button @click="showValidationDetails = false" class="close-btn">×</button>
        </div>
        
        <div class="modal-body">
          <div v-if="validationResults.summary" class="validation-summary">
            <div class="summary-item">
              <span class="summary-label">Всего:</span>
              <span class="summary-value">{{ validationResults.summary.total }}</span>
            </div>
            <div v-if="validationResults.summary.errors > 0" class="summary-item error">
              <span class="summary-label">Ошибки:</span>
              <span class="summary-value">{{ validationResults.summary.errors }}</span>
            </div>
            <div v-if="validationResults.summary.warnings > 0" class="summary-item warning">
              <span class="summary-label">Предупреждения:</span>
              <span class="summary-value">{{ validationResults.summary.warnings }}</span>
            </div>
            <div v-if="validationResults.summary.info > 0" class="summary-item info">
              <span class="summary-label">Информация:</span>
              <span class="summary-value">{{ validationResults.summary.info }}</span>
            </div>
          </div>
          
          <div class="violations-list">
            <div 
              v-for="(violation, index) in validationResults.violations"
              :key="index"
              :class="['violation-item', violation.type]"
            >
              <div class="violation-header">
                <span class="violation-type">{{ getViolationTypeLabel(violation.type) }}</span>
                <span v-if="violation.line" class="violation-line">Строка {{ violation.line }}</span>
              </div>
              <div class="violation-message">{{ violation.message }}</div>
              <div v-if="violation.suggestion" class="violation-suggestion">
                Рекомендация: {{ violation.suggestion }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- URL Import Modal -->
    <div v-if="showUrlImport" class="url-modal" @click="showUrlImport = false">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>Импорт из URL</h3>
          <button @click="showUrlImport = false" class="close-btn">×</button>
        </div>
        
        <div class="modal-body">
          <div class="form-group">
            <label for="import-url">URL онтологии:</label>
            <input 
              id="import-url"
              v-model="importUrl"
              type="url"
              placeholder="https://example.org/ontology.ttl"
              class="url-input"
              @keyup.enter="importFromUrl"
            />
          </div>
          
          <div class="modal-actions">
            <button 
              @click="importFromUrl"
              :disabled="!importUrl.trim() || isImporting"
              class="action-btn"
            >
              <span v-if="isImporting" class="loading">⟳</span>
              <span v-else class="icon">📥</span>
              Импортировать
            </button>
            
            <button @click="showUrlImport = false" class="action-btn secondary">
              Отмена
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Notification -->
    <div v-if="notification" :class="['notification', notification.type]">
      <span class="notification-icon">
        {{ notification.type === 'success' ? '✅' : notification.type === 'error' ? '❌' : 'ℹ️' }}
      </span>
      <span class="notification-message">{{ notification.message }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Props
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  format: {
    type: String,
    default: 'turtle'
  },
  validationResults: {
    type: Object,
    default: null
  }
})

// Emits
const emit = defineEmits(['update:modelValue', 'import', 'export', 'reset', 'validate', 'format-change'])

// Refs
const fileInput = ref(null)
const showValidationDetails = ref(false)
const showUrlImport = ref(false)
const importUrl = ref('')
const isValidating = ref(false)
const isImporting = ref(false)
const notification = ref(null)

/**
 * Handle file import
 */
const handleFileImport = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  try {
    const text = await file.text()
    const format = getFormatFromFile(file.name)
    
    emit('import', text)
    if (format !== props.format) {
      emit('format-change', format)
    }
    
    showNotification('success', `Файл ${file.name} успешно импортирован`)
  } catch (error) {
    showNotification('error', `Ошибка импорта файла: ${error.message}`)
  }

  // Reset file input
  event.target.value = ''
}

/**
 * Import from URL
 */
const importFromUrl = async () => {
  if (!importUrl.value.trim()) return

  isImporting.value = true
  
  try {
    const response = await fetch(importUrl.value)
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    
    const text = await response.text()
    const format = getFormatFromUrl(importUrl.value)
    
    emit('import', text)
    if (format !== props.format) {
      emit('format-change', format)
    }
    
    showNotification('success', 'Онтология успешно импортирована из URL')
    showUrlImport.value = false
    importUrl.value = ''
  } catch (error) {
    showNotification('error', `Ошибка импорта из URL: ${error.message}`)
  } finally {
    isImporting.value = false
  }
}

/**
 * Import from clipboard
 */
const importFromClipboard = async () => {
  try {
    const text = await navigator.clipboard.readText()
    if (text.trim()) {
      emit('import', text)
      showNotification('success', 'Данные из буфера обмена импортированы')
    } else {
      showNotification('warning', 'Буфер обмена пуст')
    }
  } catch (error) {
    showNotification('error', 'Не удалось прочитать буфер обмена')
  }
}

/**
 * Export file
 */
const exportFile = (format) => {
  if (!props.modelValue.trim()) return

  try {
    let content = props.modelValue
    let mimeType = 'text/plain'
    let extension = 'txt'

    if (format === 'turtle') {
      mimeType = 'text/turtle'
      extension = 'ttl'
    } else if (format === 'jsonld') {
      if (props.format === 'turtle') {
        // Convert Turtle to JSON-LD (simplified)
        content = convertToJsonLD(props.modelValue)
      }
      mimeType = 'application/ld+json'
      extension = 'jsonld'
    }

    const blob = new Blob([content], { type: mimeType })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    
    link.href = url
    link.download = `ontology.${extension}`
    link.click()
    
    URL.revokeObjectURL(url)
    
    showNotification('success', `Файл экспортирован как ${extension.toUpperCase()}`)
    emit('export', { format, content })
  } catch (error) {
    showNotification('error', `Ошибка экспорта: ${error.message}`)
  }
}

/**
 * Copy to clipboard
 */
const copyToClipboard = async () => {
  if (!props.modelValue.trim()) return

  try {
    await navigator.clipboard.writeText(props.modelValue)
    showNotification('success', 'Данные скопированы в буфер обмена')
  } catch (error) {
    showNotification('error', 'Не удалось скопировать в буфер обмена')
  }
}

/**
 * Get format from file name
 */
const getFormatFromFile = (filename) => {
  const ext = filename.split('.').pop().toLowerCase()
  switch (ext) {
    case 'ttl':
    case 'turtle':
      return 'turtle'
    case 'jsonld':
    case 'json':
      return 'jsonld'
    default:
      return 'turtle'
  }
}

/**
 * Get format from URL
 */
const getFormatFromUrl = (url) => {
  return getFormatFromFile(url)
}

/**
 * Convert Turtle to JSON-LD (basic regex-based conversion)
 */
const convertToJsonLD = (turtleData) => {
  try {
    // Basic regex-based conversion for demo purposes
    const lines = turtleData.split('\n')
    const graph = []
    const subjects = new Map()

    lines.forEach(line => {
      line = line.trim()
      if (!line || line.startsWith('@') || line.startsWith('#')) return

      // Simple subject extraction
      const subjectMatch = line.match(/^(\w+:\w+)\s+/)
      if (subjectMatch) {
        const subject = subjectMatch[1]
        if (!subjects.has(subject)) {
          subjects.set(subject, { '@id': subject })
        }
      }

      // Simple predicate-object extraction
      const tripleMatch = line.match(/(\w+:\w+)\s+([^;.\s]+)\s*[;.]?/)
      if (tripleMatch) {
        const subject = tripleMatch[1]
        const predicate = tripleMatch[2]
        const object = tripleMatch[3]

        if (subjects.has(subject)) {
          const subjectObj = subjects.get(subject)
          if (object.startsWith('"') && object.endsWith('"')) {
            subjectObj[predicate] = object.slice(1, -1)
          } else {
            subjectObj[predicate] = { '@id': object }
          }
        }
      }
    })

    return JSON.stringify({
      '@context': {
        'rdf': 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
        'rdfs': 'http://www.w3.org/2000/01/rdf-schema#',
        'owl': 'http://www.w3.org/2002/07/owl#',
        'xsd': 'http://www.w3.org/2001/XMLSchema#',
        'ex': 'http://example.org/ontology#'
      },
      '@graph': Array.from(subjects.values())
    }, null, 2)
  } catch (error) {
    console.error('Conversion error:', error)
    return props.modelValue // Fallback to original
  }
}

/**
 * Get validation status class
 */
const getValidationStatusClass = () => {
  if (!props.validationResults) return 'status-unknown'
  
  if (props.validationResults.error) return 'status-error'
  
  if (props.validationResults.isValid && props.validationResults.summary?.errors === 0) {
    return 'status-valid'
  } else if (props.validationResults.summary?.errors > 0) {
    return 'status-error'
  } else {
    return 'status-warning'
  }
}

/**
 * Get validation status text
 */
const getValidationStatusText = () => {
  if (!props.validationResults) return 'Не проверено'
  
  if (props.validationResults.error) return 'Ошибка'
  
  const summary = props.validationResults.summary
  if (!summary) return 'Проверено'
  
  if (summary.errors > 0) {
    return `${summary.errors} ошибок`
  } else if (summary.warnings > 0) {
    return `${summary.warnings} предупреждений`
  } else {
    return 'Валидно'
  }
}

/**
 * Get violation type label
 */
const getViolationTypeLabel = (type) => {
  const labels = {
    error: 'Ошибка',
    warning: 'Предупреждение',
    info: 'Информация',
    success: 'Успех'
  }
  return labels[type] || type
}

/**
 * Show notification
 */
const showNotification = (type, message) => {
  notification.value = { type, message }
  setTimeout(() => {
    notification.value = null
  }, 3000)
}
</script>

<style scoped>
.ontology-actions {
  position: relative;
}

.actions-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  align-items: flex-start;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.action-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 120px;
}

.action-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.25rem;
}

.action-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  background: white;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;
}

.action-btn:hover:not(:disabled) {
  background: #f9fafb;
  border-color: #9ca3af;
}

.action-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.action-btn.secondary {
  background: #f3f4f6;
  color: #6b7280;
}

.validate-btn {
  background: #10b981;
  color: white;
  border-color: #10b981;
}

.validate-btn:hover:not(:disabled) {
  background: #059669;
}

.reset-btn {
  background: #ef4444;
  color: white;
  border-color: #ef4444;
}

.reset-btn:hover:not(:disabled) {
  background: #dc2626;
}

.file-input-wrapper {
  position: relative;
}

.file-input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.file-btn {
  cursor: pointer;
}

.format-select {
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.875rem;
  background: white;
  color: #374151;
}

.validation-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.25rem;
}

.status-indicator {
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: 4px;
  white-space: nowrap;
}

.status-valid {
  background: #d1fae5;
  color: #065f46;
}

.status-warning {
  background: #fef3c7;
  color: #92400e;
}

.status-error {
  background: #fee2e2;
  color: #991b1b;
}

.status-unknown {
  background: #f3f4f6;
  color: #6b7280;
}

.details-btn {
  padding: 0.125rem 0.5rem;
  font-size: 0.75rem;
  background: none;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  cursor: pointer;
  color: #6b7280;
}

.details-btn:hover {
  background: #f9fafb;
}

.validation-modal,
.url-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  max-height: 80vh;
  width: 90%;
  overflow: hidden;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  background: #f9fafb;
}

.modal-header h3 {
  margin: 0;
  font-size: 1.125rem;
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
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
}

.close-btn:hover {
  background: #f3f4f6;
  color: #374151;
}

.modal-body {
  padding: 1.5rem;
  max-height: 60vh;
  overflow-y: auto;
}

.validation-summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 8px;
}

.summary-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  text-align: center;
}

.summary-label {
  font-size: 0.75rem;
  color: #6b7280;
  font-weight: 500;
}

.summary-value {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
}

.summary-item.error .summary-value {
  color: #dc2626;
}

.summary-item.warning .summary-value {
  color: #d97706;
}

.summary-item.info .summary-value {
  color: #2563eb;
}

.violations-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.violation-item {
  padding: 1rem;
  border-radius: 8px;
  border-left: 4px solid #d1d5db;
}

.violation-item.error {
  background: #fef2f2;
  border-left-color: #ef4444;
}

.violation-item.warning {
  background: #fffbeb;
  border-left-color: #f59e0b;
}

.violation-item.info {
  background: #eff6ff;
  border-left-color: #3b82f6;
}

.violation-item.success {
  background: #f0fdf4;
  border-left-color: #10b981;
}

.violation-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.violation-type {
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
}

.violation-line {
  font-size: 0.75rem;
  color: #6b7280;
}

.violation-message {
  font-size: 0.875rem;
  color: #374151;
  margin-bottom: 0.5rem;
}

.violation-suggestion {
  font-size: 0.75rem;
  color: #6b7280;
  font-style: italic;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
}

.url-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.875rem;
}

.url-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.modal-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #f3f4f6;
}

.notification {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  z-index: 1001;
  animation: slideIn 0.3s ease-out;
}

.notification.success {
  background: #d1fae5;
  color: #065f46;
  border: 1px solid #a7f3d0;
}

.notification.error {
  background: #fee2e2;
  color: #991b1b;
  border: 1px solid #fca5a5;
}

.notification.warning {
  background: #fef3c7;
  color: #92400e;
  border: 1px solid #fcd34d;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.loading {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.icon {
  font-size: 1rem;
}

/* Responsive */
@media (max-width: 768px) {
  .actions-container {
    flex-direction: column;
    gap: 1rem;
  }
  
  .action-group {
    min-width: auto;
  }
  
  .action-buttons {
    justify-content: center;
  }
  
  .modal-content {
    width: 95%;
    margin: 1rem;
  }
  
  .validation-summary {
    grid-template-columns: 1fr 1fr;
  }
  
  .notification {
    bottom: 1rem;
    right: 1rem;
    left: 1rem;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .action-btn {
    transition: none;
  }
  
  .notification {
    animation: none;
  }
  
  .loading {
    animation: none;
  }
}
</style>
