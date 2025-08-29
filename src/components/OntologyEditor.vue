<template>
  <div class="ontology-editor">
    <!-- Format Selector -->
    <div class="editor-toolbar">
      <div class="format-selector">
        <label for="format-select">Формат:</label>
        <select 
          id="format-select"
          :value="format" 
          @change="$emit('format-change', $event.target.value)"
          class="format-select"
        >
          <option value="turtle">Turtle (.ttl)</option>
          <option value="jsonld">JSON-LD (.jsonld)</option>
        </select>
      </div>
      
      <div class="editor-actions">
        <button 
          @click="formatDocument"
          class="action-btn"
          title="Форматировать документ"
        >
          <span class="icon">⌘</span>
          Форматировать
        </button>
        
        <button 
          @click="toggleWordWrap"
          class="action-btn"
          title="Переключить перенос строк"
        >
          <span class="icon">↩</span>
          Перенос строк
        </button>
      </div>
    </div>

    <!-- Simple Editor Container -->
    <textarea
      ref="editorContainer"
      v-model="currentValue"
      class="editor-textarea"
      :placeholder="`Введите онтологию в формате ${format.toUpperCase()}...`"
      spellcheck="false"
      @input="handleInput"
      @keydown="handleKeydown"
    ></textarea>
    
    <!-- Status Bar -->
    <div class="editor-status">
      <div class="status-left">
        <span class="status-item">
          Строка {{ currentLine }}, Колонка {{ currentColumn }}
        </span>
        <span class="status-item">
          {{ characterCount }} символов
        </span>
      </div>
      
      <div class="status-right">
        <span class="status-item format-indicator">
          {{ format.toUpperCase() }}
        </span>
        <span 
          v-if="hasUnsavedChanges" 
          class="status-item unsaved-indicator"
          title="Есть несохраненные изменения"
        >
          ●
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, computed, nextTick } from 'vue'

// Props
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  format: {
    type: String,
    default: 'turtle'
  }
})

// Emits
const emit = defineEmits(['update:modelValue', 'format-change'])

// Refs
const editorContainer = ref(null)
const currentValue = ref(props.modelValue)
const hasUnsavedChanges = ref(false)

// State
let lastSavedValue = props.modelValue

// Computed
const characterCount = computed(() => props.modelValue.length)

/**
 * Initialize Simple Editor
 */
const initializeEditor = async () => {
  if (!editorContainer.value) return

  // Simple textarea setup
  currentValue.value = props.modelValue
}

/**
 * Handle textarea input
 */
const handleInput = () => {
  const value = currentValue.value
  emit('update:modelValue', value)
  hasUnsavedChanges.value = value !== lastSavedValue
}

/**
 * Handle keyboard shortcuts
 */
const handleKeydown = (event) => {
  if (event.ctrlKey || event.metaKey) {
    if (event.key === 's') {
      event.preventDefault()
      saveChanges()
    }
  }
}

// Language support functions removed for simple textarea implementation

// Completion functions removed for simple textarea implementation

/**
 * Format the document
 */
const formatDocument = () => {
  if (!editor) return
  
  editor.getAction('editor.action.formatDocument').run()
}

/**
 * Toggle word wrap
 */
const toggleWordWrap = () => {
  if (!editor) return
  
  const currentWrap = editor.getOption(monaco.editor.EditorOption.wordWrap)
  const newWrap = currentWrap === 'off' ? 'on' : 'off'
  
  editor.updateOptions({ wordWrap: newWrap })
}

/**
 * Save changes
 */
const saveChanges = () => {
  lastSavedValue = editor.getValue()
  hasUnsavedChanges.value = false
  
  // Save to localStorage
  localStorage.setItem('ontologyData', lastSavedValue)
  
  // Show save confirmation (could be a toast notification)
  console.log('Ontology saved to localStorage')
}

// Watch for format changes
watch(() => props.format, (newFormat) => {
  // Update placeholder when format changes
  if (editorContainer.value) {
    editorContainer.value.placeholder = `Введите онтологию в формате ${newFormat.toUpperCase()}...`
  }
})

// Watch for external value changes
watch(() => props.modelValue, (newValue) => {
  if (currentValue.value !== newValue) {
    currentValue.value = newValue
    lastSavedValue = newValue
    hasUnsavedChanges.value = false
  }
})

// Lifecycle
onMounted(async () => {
  await nextTick()
  await initializeEditor()
})

onBeforeUnmount(() => {
  if (editor) {
    editor.dispose()
  }
})
</script>

<style scoped>
.ontology-editor {
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
}

.editor-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
}

.format-selector {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.format-selector label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}

.format-select {
  padding: 0.375rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.875rem;
  background: white;
  color: #374151;
}

.format-select:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.editor-actions {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
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

.action-btn:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.action-btn .icon {
  font-size: 1rem;
  font-weight: normal;
}

.editor-textarea {
  width: 100%;
  height: 400px;
  padding: 1rem;
  border: none;
  resize: vertical;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 14px;
  line-height: 1.5;
  background: white;
  color: #374151;
  outline: none;
}

.editor-status {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  background: #f9fafb;
  border-top: 1px solid #e5e7eb;
  font-size: 0.75rem;
  color: #6b7280;
}

.status-left,
.status-right {
  display: flex;
  gap: 1rem;
}

.status-item {
  white-space: nowrap;
}

.format-indicator {
  font-weight: 600;
  color: #667eea;
}

.unsaved-indicator {
  color: #f59e0b;
  font-weight: bold;
}

/* Responsive */
@media (max-width: 768px) {
  .editor-toolbar {
    flex-direction: column;
    gap: 0.75rem;
    align-items: stretch;
  }
  
  .editor-actions {
    justify-content: center;
  }
  
  .editor-status {
    flex-direction: column;
    gap: 0.25rem;
    text-align: center;
  }
  
  .status-left,
  .status-right {
    justify-content: center;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .action-btn {
    transition: none;
  }
}
</style>
