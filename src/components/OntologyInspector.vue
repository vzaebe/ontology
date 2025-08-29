<template>
  <div class="ontology-inspector">
    <div class="inspector-header">
      <h3>Инспектор</h3>
      <div class="header-subtitle">Быстрое добавление сущностей</div>
    </div>

    <!-- Entity Type Selector -->
    <div class="entity-selector">
      <div class="selector-tabs">
        <button 
          v-for="type in entityTypes"
          :key="type.id"
          :class="['selector-tab', { active: activeEntityType === type.id }]"
          @click="activeEntityType = type.id"
        >
          <span class="tab-icon" :style="{ backgroundColor: type.color }"></span>
          {{ type.label }}
        </button>
      </div>
    </div>

    <!-- Entity Forms -->
    <div class="entity-forms">
      <!-- Class Form -->
      <div v-show="activeEntityType === 'class'" class="entity-form">
        <h4>Создать класс</h4>
        
        <div class="form-group">
          <label for="class-name">Имя класса *</label>
          <input 
            id="class-name"
            v-model="classForm.name"
            type="text"
            placeholder="ex:MyClass"
            class="form-input"
            @keyup.enter="addEntity('class')"
          />
        </div>
        
        <div class="form-group">
          <label for="class-label">Метка</label>
          <input 
            id="class-label"
            v-model="classForm.label"
            type="text"
            placeholder="Название класса"
            class="form-input"
          />
        </div>
        
        <div class="form-group">
          <label for="class-parent">Родительский класс</label>
          <select id="class-parent" v-model="classForm.parent" class="form-select">
            <option value="">Нет родителя</option>
            <option v-for="cls in availableClasses" :key="cls" :value="cls">
              {{ extractLocalName(cls) }}
            </option>
          </select>
        </div>
        
        <div class="form-group">
          <label for="class-comment">Описание</label>
          <textarea 
            id="class-comment"
            v-model="classForm.comment"
            placeholder="Описание класса"
            class="form-textarea"
            rows="2"
          ></textarea>
        </div>
        
        <button 
          @click="addEntity('class')"
          :disabled="!classForm.name.trim()"
          class="add-btn"
        >
          <span class="icon">+</span>
          Добавить класс
        </button>
      </div>

      <!-- Property Form -->
      <div v-show="activeEntityType === 'property'" class="entity-form">
        <h4>Создать свойство</h4>
        
        <div class="form-group">
          <label>Тип свойства *</label>
          <div class="radio-group">
            <label class="radio-label">
              <input 
                v-model="propertyForm.type" 
                type="radio" 
                value="object"
                class="radio-input"
              />
              <span class="radio-text">Объектное</span>
            </label>
            <label class="radio-label">
              <input 
                v-model="propertyForm.type" 
                type="radio" 
                value="data"
                class="radio-input"
              />
              <span class="radio-text">Данных</span>
            </label>
          </div>
        </div>
        
        <div class="form-group">
          <label for="property-name">Имя свойства *</label>
          <input 
            id="property-name"
            v-model="propertyForm.name"
            type="text"
            placeholder="ex:myProperty"
            class="form-input"
            @keyup.enter="addEntity('property')"
          />
        </div>
        
        <div class="form-group">
          <label for="property-label">Метка</label>
          <input 
            id="property-label"
            v-model="propertyForm.label"
            type="text"
            placeholder="Название свойства"
            class="form-input"
          />
        </div>
        
        <div class="form-group">
          <label for="property-domain">Домен</label>
          <select id="property-domain" v-model="propertyForm.domain" class="form-select">
            <option value="">Любой класс</option>
            <option v-for="cls in availableClasses" :key="cls" :value="cls">
              {{ extractLocalName(cls) }}
            </option>
          </select>
        </div>
        
        <div class="form-group">
          <label for="property-range">Область значений</label>
          <select id="property-range" v-model="propertyForm.range" class="form-select">
            <option value="">Не указано</option>
            <optgroup v-if="propertyForm.type === 'object'" label="Классы">
              <option v-for="cls in availableClasses" :key="cls" :value="cls">
                {{ extractLocalName(cls) }}
              </option>
            </optgroup>
            <optgroup v-if="propertyForm.type === 'data'" label="Типы данных">
              <option value="xsd:string">Строка</option>
              <option value="xsd:integer">Целое число</option>
              <option value="xsd:decimal">Десятичное число</option>
              <option value="xsd:boolean">Логический</option>
              <option value="xsd:date">Дата</option>
              <option value="xsd:dateTime">Дата и время</option>
            </optgroup>
          </select>
        </div>
        
        <div class="form-group">
          <label for="property-comment">Описание</label>
          <textarea 
            id="property-comment"
            v-model="propertyForm.comment"
            placeholder="Описание свойства"
            class="form-textarea"
            rows="2"
          ></textarea>
        </div>
        
        <button 
          @click="addEntity('property')"
          :disabled="!propertyForm.name.trim() || !propertyForm.type"
          class="add-btn"
        >
          <span class="icon">+</span>
          Добавить свойство
        </button>
      </div>

      <!-- Individual Form -->
      <div v-show="activeEntityType === 'individual'" class="entity-form">
        <h4>Создать индивид</h4>
        
        <div class="form-group">
          <label for="individual-name">Имя индивида *</label>
          <input 
            id="individual-name"
            v-model="individualForm.name"
            type="text"
            placeholder="ex:myIndividual"
            class="form-input"
            @keyup.enter="addEntity('individual')"
          />
        </div>
        
        <div class="form-group">
          <label for="individual-label">Метка</label>
          <input 
            id="individual-label"
            v-model="individualForm.label"
            type="text"
            placeholder="Название индивида"
            class="form-input"
          />
        </div>
        
        <div class="form-group">
          <label for="individual-type">Класс *</label>
          <select id="individual-type" v-model="individualForm.type" class="form-select">
            <option value="">Выберите класс</option>
            <option v-for="cls in availableClasses" :key="cls" :value="cls">
              {{ extractLocalName(cls) }}
            </option>
          </select>
        </div>
        
        <div class="form-group">
          <label for="individual-comment">Описание</label>
          <textarea 
            id="individual-comment"
            v-model="individualForm.comment"
            placeholder="Описание индивида"
            class="form-textarea"
            rows="2"
          ></textarea>
        </div>
        
        <button 
          @click="addEntity('individual')"
          :disabled="!individualForm.name.trim() || !individualForm.type"
          class="add-btn"
        >
          <span class="icon">+</span>
          Добавить индивид
        </button>
      </div>
    </div>

    <!-- Quick Templates -->
    <div class="quick-templates">
      <h4>Быстрые шаблоны</h4>
      <div class="template-buttons">
        <button 
          @click="addQuickTemplate('equipment')"
          class="template-btn"
          title="Добавить оборудование с базовыми свойствами"
        >
          <span class="icon">⚙️</span>
          Оборудование
        </button>
        
        <button 
          @click="addQuickTemplate('document')"
          class="template-btn"
          title="Добавить документ с метаданными"
        >
          <span class="icon">📄</span>
          Документ
        </button>
        
        <button 
          @click="addQuickTemplate('relation')"
          class="template-btn"
          title="Добавить связь между сущностями"
        >
          <span class="icon">🔗</span>
          Связь
        </button>
      </div>
    </div>

    <!-- Namespace Helper -->
    <div class="namespace-helper">
      <h4>Префиксы</h4>
      <div class="prefix-list">
        <div v-for="prefix in commonPrefixes" :key="prefix.prefix" class="prefix-item">
          <code class="prefix-code">{{ prefix.prefix }}</code>
          <span class="prefix-desc">{{ prefix.description }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
// import { Parser } from 'n3' - commented out until n3 package is installed

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
const emit = defineEmits(['update:modelValue', 'add-entity'])

// State
const activeEntityType = ref('class')
const availableClasses = ref([])

// Entity types configuration
const entityTypes = [
  { id: 'class', label: 'Класс', color: '#667eea' },
  { id: 'property', label: 'Свойство', color: '#10b981' },
  { id: 'individual', label: 'Индивид', color: '#f59e0b' }
]

// Form data
const classForm = ref({
  name: '',
  label: '',
  parent: '',
  comment: ''
})

const propertyForm = ref({
  name: '',
  label: '',
  type: 'object',
  domain: '',
  range: '',
  comment: ''
})

const individualForm = ref({
  name: '',
  label: '',
  type: '',
  comment: ''
})

// Common prefixes
const commonPrefixes = [
  { prefix: 'ex:', description: 'Пример' },
  { prefix: 'owl:', description: 'OWL онтология' },
  { prefix: 'rdfs:', description: 'RDF Schema' },
  { prefix: 'rdf:', description: 'RDF' },
  { prefix: 'xsd:', description: 'XML Schema' }
]

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
 * Extract available classes from ontology data
 */
const extractAvailableClasses = () => {
  availableClasses.value = []
  
  if (!props.modelValue.trim()) return

  try {
    if (props.format === 'turtle') {
      // Simple regex-based class extraction (without n3 library)
      const classes = new Set()

      // Look for patterns like ":ClassName a owl:Class"
      const classPattern = /:(\w+)\s+a\s+owl:Class/g
      let match
      while ((match = classPattern.exec(props.modelValue)) !== null) {
        classes.add(match[1])
      }

      // Also look for patterns like "<http://...> a owl:Class"
      const fullUriPattern = /<([^>]+)>\s+a\s+owl:Class/g
      while ((match = fullUriPattern.exec(props.modelValue)) !== null) {
        classes.add(match[1])
      }

      availableClasses.value = Array.from(classes)
    }
  } catch (error) {
    console.error('Error extracting classes:', error)
  }
}

/**
 * Add entity to ontology
 */
const addEntity = (type) => {
  let turtleCode = ''
  
  switch (type) {
    case 'class':
      turtleCode = generateClassTurtle()
      resetForm('class')
      break
    case 'property':
      turtleCode = generatePropertyTurtle()
      resetForm('property')
      break
    case 'individual':
      turtleCode = generateIndividualTurtle()
      resetForm('individual')
      break
  }
  
  if (turtleCode) {
    // Append to existing ontology data
    const newData = props.modelValue + '\n\n' + turtleCode
    emit('update:modelValue', newData)
    emit('add-entity', { type, code: turtleCode })
  }
}

/**
 * Generate Turtle code for class
 */
const generateClassTurtle = () => {
  const form = classForm.value
  if (!form.name.trim()) return ''
  
  let turtle = `# Class: ${form.name}\n`
  turtle += `${form.name} a owl:Class`
  
  if (form.parent) {
    turtle += ` ;\n    rdfs:subClassOf ${form.parent}`
  }
  
  if (form.label) {
    turtle += ` ;\n    rdfs:label "${form.label}"@en`
  }
  
  if (form.comment) {
    turtle += ` ;\n    rdfs:comment "${form.comment}"@en`
  }
  
  turtle += ' .'
  
  return turtle
}

/**
 * Generate Turtle code for property
 */
const generatePropertyTurtle = () => {
  const form = propertyForm.value
  if (!form.name.trim() || !form.type) return ''
  
  const propertyType = form.type === 'object' ? 'owl:ObjectProperty' : 'owl:DatatypeProperty'
  
  let turtle = `# Property: ${form.name}\n`
  turtle += `${form.name} a ${propertyType}`
  
  if (form.label) {
    turtle += ` ;\n    rdfs:label "${form.label}"@en`
  }
  
  if (form.domain) {
    turtle += ` ;\n    rdfs:domain ${form.domain}`
  }
  
  if (form.range) {
    turtle += ` ;\n    rdfs:range ${form.range}`
  }
  
  if (form.comment) {
    turtle += ` ;\n    rdfs:comment "${form.comment}"@en`
  }
  
  turtle += ' .'
  
  return turtle
}

/**
 * Generate Turtle code for individual
 */
const generateIndividualTurtle = () => {
  const form = individualForm.value
  if (!form.name.trim() || !form.type) return ''
  
  let turtle = `# Individual: ${form.name}\n`
  turtle += `${form.name} a ${form.type}`
  
  if (form.label) {
    turtle += ` ;\n    rdfs:label "${form.label}"@en`
  }
  
  if (form.comment) {
    turtle += ` ;\n    rdfs:comment "${form.comment}"@en`
  }
  
  turtle += ' .'
  
  return turtle
}

/**
 * Reset form data
 */
const resetForm = (type) => {
  switch (type) {
    case 'class':
      classForm.value = { name: '', label: '', parent: '', comment: '' }
      break
    case 'property':
      propertyForm.value = { name: '', label: '', type: 'object', domain: '', range: '', comment: '' }
      break
    case 'individual':
      individualForm.value = { name: '', label: '', type: '', comment: '' }
      break
  }
}

/**
 * Add quick template
 */
const addQuickTemplate = (templateType) => {
  let turtleCode = ''
  
  switch (templateType) {
    case 'equipment':
      turtleCode = `# Equipment Template
ex:NewEquipment a ex:Equipment ;
    rdfs:label "New Equipment"@en ;
    ex:hasTag "EQ-XXX" ;
    rdfs:comment "Equipment description"@en .`
      break
      
    case 'document':
      turtleCode = `# Document Template
ex:NewDocument a ex:Document ;
    rdfs:label "New Document"@en ;
    rdfs:comment "Document description"@en .

ex:SomeEquipment ex:hasDocument ex:NewDocument .`
      break
      
    case 'relation':
      turtleCode = `# Relation Template
ex:Equipment1 ex:controls ex:Equipment2 .
ex:Equipment2 rdfs:label "Controlled Equipment"@en .`
      break
  }
  
  if (turtleCode) {
    const newData = props.modelValue + '\n\n' + turtleCode
    emit('update:modelValue', newData)
    emit('add-entity', { type: 'template', template: templateType, code: turtleCode })
  }
}

// Watch for changes in ontology data to update available classes
watch(() => props.modelValue, () => {
  extractAvailableClasses()
}, { immediate: true })
</script>

<style scoped>
.ontology-inspector {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  height: 100%;
  overflow-y: auto;
}

.inspector-header {
  text-align: center;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.inspector-header h3 {
  margin: 0 0 0.25rem 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
}

.header-subtitle {
  font-size: 0.875rem;
  color: #6b7280;
}

.entity-selector {
  margin-bottom: 1rem;
}

.selector-tabs {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.selector-tab {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s;
  text-align: left;
}

.selector-tab:hover {
  background: #f9fafb;
  border-color: #d1d5db;
}

.selector-tab.active {
  background: #667eea;
  color: white;
  border-color: #667eea;
}

.tab-icon {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.entity-forms {
  flex: 1;
}

.entity-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.entity-form h4 {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #f3f4f6;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}

.form-input,
.form-select,
.form-textarea {
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.875rem;
  background: white;
  color: #374151;
  transition: border-color 0.15s;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-textarea {
  resize: vertical;
  min-height: 60px;
}

.radio-group {
  display: flex;
  gap: 1rem;
}

.radio-label {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  cursor: pointer;
}

.radio-input {
  margin: 0;
}

.radio-text {
  font-size: 0.875rem;
  color: #374151;
}

.add-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: white;
  background: #667eea;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s;
}

.add-btn:hover:not(:disabled) {
  background: #5a67d8;
}

.add-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quick-templates {
  border-top: 1px solid #e5e7eb;
  padding-top: 1rem;
}

.quick-templates h4 {
  margin: 0 0 0.75rem 0;
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
}

.template-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.template-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s;
  text-align: left;
}

.template-btn:hover {
  background: #f3f4f6;
  border-color: #d1d5db;
}

.namespace-helper {
  border-top: 1px solid #e5e7eb;
  padding-top: 1rem;
}

.namespace-helper h4 {
  margin: 0 0 0.75rem 0;
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
}

.prefix-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.prefix-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background: #f9fafb;
  border-radius: 4px;
}

.prefix-code {
  font-family: monospace;
  font-size: 0.75rem;
  color: #667eea;
  font-weight: 600;
  min-width: 3rem;
}

.prefix-desc {
  font-size: 0.75rem;
  color: #6b7280;
}

.icon {
  font-size: 1rem;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .ontology-inspector {
    gap: 1rem;
  }
  
  .selector-tabs {
    flex-direction: row;
    flex-wrap: wrap;
  }
  
  .selector-tab {
    flex: 1;
    min-width: 0;
    justify-content: center;
  }
  
  .radio-group {
    flex-direction: column;
    gap: 0.5rem;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .selector-tab,
  .add-btn,
  .template-btn,
  .form-input,
  .form-select,
  .form-textarea {
    transition: none;
  }
}

/* Focus styles for keyboard navigation */
.selector-tab:focus-visible,
.add-btn:focus-visible,
.template-btn:focus-visible {
  outline: 2px solid #667eea;
  outline-offset: 2px;
}
</style>
