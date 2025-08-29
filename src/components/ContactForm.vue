<template>
  <div class="contact-form-container">
    <form @submit.prevent="handleSubmit" class="contact-form" :class="{ 'form-disabled': isSubmitting }">
      <h3>Написать нам</h3>
      <p class="form-description">Заполните форму, и мы ответим в течение {{ responseTime }}</p>

      <!-- Honeypot для защиты от спама -->
      <input 
        type="text" 
        name="website" 
        v-model="formData.honeypot"
        style="position: absolute; left: -9999px; opacity: 0; pointer-events: none;"
        tabindex="-1"
        autocomplete="off"
      />

      <!-- Имя -->
      <div class="form-group">
        <label for="contact-name" class="form-label">
          Имя <span class="required">*</span>
        </label>
        <input 
          id="contact-name"
          type="text" 
          v-model="formData.name"
          class="form-input"
          :class="{ 'error': errors.name }"
          placeholder="Как к вам обращаться?"
          required
          :disabled="isSubmitting"
          @blur="validateField('name')"
        />
        <div v-if="errors.name" class="error-message">{{ errors.name }}</div>
      </div>

      <!-- Email или телефон -->
      <div class="form-group">
        <label for="contact-email" class="form-label">
          Email или телефон <span class="required">*</span>
        </label>
        <input 
          id="contact-email"
          type="text" 
          v-model="formData.contact"
          class="form-input"
          :class="{ 'error': errors.contact }"
          placeholder="name@company.com или +7 999 999-99-99"
          required
          :disabled="isSubmitting"
          @blur="validateField('contact')"
        />
        <div v-if="errors.contact" class="error-message">{{ errors.contact }}</div>
      </div>

      <!-- Компания -->
      <div class="form-group">
        <label for="contact-company" class="form-label">Компания</label>
        <input 
          id="contact-company"
          type="text" 
          v-model="formData.company"
          class="form-input"
          placeholder="ООО «Компания»"
          :disabled="isSubmitting"
        />
      </div>

      <!-- Направление/тема -->
      <div class="form-group">
        <label for="contact-direction" class="form-label">
          Направление <span class="required">*</span>
        </label>
        <select 
          id="contact-direction"
          v-model="formData.direction"
          class="form-select"
          :class="{ 'error': errors.direction }"
          required
          :disabled="isSubmitting"
          @change="validateField('direction')"
        >
          <option value="">Выберите направление</option>
          <option 
            v-for="direction in directions" 
            :key="direction.key"
            :value="direction.key"
          >
            {{ direction.label }}
          </option>
        </select>
        <div v-if="errors.direction" class="error-message">{{ errors.direction }}</div>
      </div>

      <!-- Сообщение -->
      <div class="form-group">
        <label for="contact-message" class="form-label">
          Сообщение <span class="required">*</span>
        </label>
        <textarea 
          id="contact-message"
          v-model="formData.message"
          class="form-textarea"
          :class="{ 'error': errors.message }"
          placeholder="Коротко опишите ваш запрос..."
          rows="4"
          required
          :disabled="isSubmitting"
          @blur="validateField('message')"
        ></textarea>
        <div class="form-hint">Минимум 20 символов ({{ formData.message.length }}/20)</div>
        <div v-if="errors.message" class="error-message">{{ errors.message }}</div>
      </div>

      <!-- Файлы -->
      <div class="form-group">
        <label for="contact-files" class="form-label">Прикрепить файлы</label>
        <input 
          id="contact-files"
          type="file" 
          @change="handleFileChange"
          class="form-file"
          multiple
          accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
          :disabled="isSubmitting"
        />
        <div class="form-hint">PDF, DOC, PNG, JPG до 10 МБ каждый</div>
        <div v-if="errors.files" class="error-message">{{ errors.files }}</div>
        
        <!-- Список прикрепленных файлов -->
        <div v-if="formData.files.length" class="attached-files">
          <div 
            v-for="(file, index) in formData.files" 
            :key="index"
            class="attached-file"
          >
            <span class="file-name">{{ file.name }}</span>
            <span class="file-size">({{ formatFileSize(file.size) }})</span>
            <button 
              type="button" 
              @click="removeFile(index)"
              class="file-remove"
              :disabled="isSubmitting"
            >
              ×
            </button>
          </div>
        </div>
      </div>

      <!-- Согласие на обработку данных -->
      <div class="form-group form-checkbox">
        <label class="checkbox-label">
          <input 
            type="checkbox"
            v-model="formData.privacy"
            class="checkbox-input"
            :class="{ 'error': errors.privacy }"
            required
            :disabled="isSubmitting"
            @change="validateField('privacy')"
          />
          <span class="checkbox-custom"></span>
          <span class="checkbox-text">
            Согласен с 
            <a href="/privacy-policy" target="_blank" class="privacy-link">
              политикой обработки персональных данных
            </a>
            <span class="required">*</span>
          </span>
        </label>
        <div v-if="errors.privacy" class="error-message">{{ errors.privacy }}</div>
      </div>

      <!-- Кнопки -->
      <div class="form-actions">
        <button 
          type="submit" 
          class="btn btn-primary form-submit"
          :disabled="isSubmitting || !isFormValid"
          :class="{ 'loading': isSubmitting }"
        >
          <span v-if="isSubmitting">Отправляем...</span>
          <span v-else>Отправить сообщение</span>
        </button>
        
        <button 
          type="button" 
          @click="openTelegram"
          class="btn btn-secondary"
          :disabled="isSubmitting"
        >
          Написать в Telegram
        </button>
      </div>

      <!-- Статус отправки -->
      <div v-if="submitStatus" class="submit-status" :class="`status-${submitStatus.type}`">
        <div class="status-message">{{ submitStatus.message }}</div>
      </div>
    </form>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { contactsData } from '../data/contacts.js'

export default {
  name: 'ContactForm',
  props: {
    preselectedDirection: {
      type: String,
      default: ''
    },
    preselectedPerson: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const formData = ref({
      name: '',
      contact: '',
      company: '',
      direction: props.preselectedDirection || '',
      message: '',
      files: [],
      privacy: false,
      honeypot: '' // скрытое поле для анти-спама
    })

    const errors = ref({})
    const isSubmitting = ref(false)
    const submitStatus = ref(null)
    const submitStartTime = ref(null)

    // Данные из конфига
    const directions = contactsData.contactForm.directions
    const responseTime = contactsData.contactForm.responseTime
    const maxFileSize = contactsData.contactForm.maxFileSize
    const allowedFileTypes = contactsData.contactForm.allowedFileTypes

    // Валидация полей
    const validateField = (fieldName) => {
      switch (fieldName) {
        case 'name':
          if (!formData.value.name.trim()) {
            errors.value.name = 'Укажите ваше имя'
          } else if (formData.value.name.trim().length < 2) {
            errors.value.name = 'Имя должно содержать минимум 2 символа'
          } else {
            delete errors.value.name
          }
          break

        case 'contact':
          const contact = formData.value.contact.trim()
          if (!contact) {
            errors.value.contact = 'Укажите email или телефон'
          } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            const phoneRegex = /^(\+7|8)[\s\-]?\(?[489]\d{2}\)?[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}$/
            
            if (!emailRegex.test(contact) && !phoneRegex.test(contact)) {
              errors.value.contact = 'Укажите корректный email или телефон'
            } else {
              delete errors.value.contact
            }
          }
          break

        case 'direction':
          if (!formData.value.direction) {
            errors.value.direction = 'Выберите направление'
          } else {
            delete errors.value.direction
          }
          break

        case 'message':
          if (!formData.value.message.trim()) {
            errors.value.message = 'Напишите сообщение'
          } else if (formData.value.message.trim().length < 20) {
            errors.value.message = 'Сообщение должно содержать минимум 20 символов'
          } else {
            delete errors.value.message
          }
          break

        case 'privacy':
          if (!formData.value.privacy) {
            errors.value.privacy = 'Необходимо согласие на обработку данных'
          } else {
            delete errors.value.privacy
          }
          break
      }
    }

    const validateForm = () => {
      validateField('name')
      validateField('contact')
      validateField('direction')
      validateField('message')
      validateField('privacy')
      return Object.keys(errors.value).length === 0
    }

    const isFormValid = computed(() => {
      return formData.value.name.trim() &&
             formData.value.contact.trim() &&
             formData.value.direction &&
             formData.value.message.trim().length >= 20 &&
             formData.value.privacy &&
             Object.keys(errors.value).length === 0
    })

    // Обработка файлов
    const handleFileChange = (event) => {
      const files = Array.from(event.target.files)
      const validFiles = []
      
      for (const file of files) {
        // Проверка размера
        if (file.size > maxFileSize) {
          errors.value.files = `Файл "${file.name}" превышает 10 МБ`
          continue
        }
        
        // Проверка типа
        const extension = file.name.split('.').pop().toLowerCase()
        if (!allowedFileTypes.includes(extension)) {
          errors.value.files = `Файл "${file.name}" имеет недопустимый тип`
          continue
        }
        
        validFiles.push(file)
      }
      
      if (validFiles.length > 0) {
        formData.value.files = [...formData.value.files, ...validFiles]
        delete errors.value.files
      }
    }

    const removeFile = (index) => {
      formData.value.files.splice(index, 1)
    }

    const formatFileSize = (bytes) => {
      if (bytes === 0) return '0 Б'
      const k = 1024
      const sizes = ['Б', 'КБ', 'МБ']
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
    }

    // Отправка формы
    const handleSubmit = async () => {
      // Анти-спам проверки
      if (formData.value.honeypot) {
        console.log('Spam detected: honeypot filled')
        return
      }

      // Проверка минимального времени заполнения (0.8-1.2 сек)
      if (submitStartTime.value) {
        const timeDiff = Date.now() - submitStartTime.value
        if (timeDiff < 800) {
          console.log('Spam detected: too fast submission')
          return
        }
      }

      if (!validateForm()) {
        return
      }

      isSubmitting.value = true
      submitStatus.value = null

      try {
        // Имитация отправки на бэкенд
        await new Promise(resolve => setTimeout(resolve, 1500))

        // Успешная отправка
        submitStatus.value = {
          type: 'success',
          message: `Сообщение отправлено! Ответим в течение ${responseTime}.`
        }

        // Очистка формы
        formData.value = {
          name: '',
          contact: '',
          company: '',
          direction: '',
          message: '',
          files: [],
          privacy: false,
          honeypot: ''
        }
        errors.value = {}

        // Аналитика
        if (window.gtag) {
          window.gtag('event', 'contact_form_submit_success', {
            direction: formData.value.direction
          })
        }

      } catch (error) {
        submitStatus.value = {
          type: 'error', 
          message: 'Ошибка отправки. Попробуйте ещё раз или напишите на hello@example.org'
        }

        if (window.gtag) {
          window.gtag('event', 'contact_form_submit_error', {
            error_message: error.message
          })
        }
      } finally {
        isSubmitting.value = false
        
        // Автоскрытие статуса через 10 секунд
        setTimeout(() => {
          submitStatus.value = null
        }, 10000)
      }
    }

    const openTelegram = () => {
      const telegram = contactsData.generalContacts.messengers.telegram
      window.open(`https://t.me/${telegram.replace('@', '')}`, '_blank')
      
      if (window.gtag) {
        window.gtag('event', 'contact_telegram_click')
      }
    }

    onMounted(() => {
      submitStartTime.value = Date.now()
      
      // Если есть предзаполненный контакт-лицо
      if (props.preselectedPerson) {
        const person = contactsData.contactPersons.find(p => p.id === props.preselectedPerson)
        if (person) {
          formData.value.direction = person.directionKey
        }
      }
    })

    return {
      formData,
      errors,
      isSubmitting,
      submitStatus,
      directions,
      responseTime,
      isFormValid,
      validateField,
      handleFileChange,
      removeFile,
      formatFileSize,
      handleSubmit,
      openTelegram
    }
  }
}
</script>

<style scoped>
.contact-form-container {
  background: var(--gradient-glass);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-lg);
  padding: 2rem;
  backdrop-filter: blur(10px);
}

.contact-form h3 {
  color: var(--primary-color);
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
  font-weight: 700;
}

.form-description {
  color: var(--text-secondary);
  margin: 0 0 2rem 0;
  font-size: 0.875rem;
}

.form-disabled {
  opacity: 0.7;
  pointer-events: none;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  color: var(--text-primary);
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
}

.required {
  color: var(--error-color, #ef4444);
}

.form-input,
.form-select,
.form-textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  background: var(--gradient-glass);
  backdrop-filter: blur(10px);
  color: var(--text-primary);
  font-size: 0.875rem;
  transition: all 0.2s ease;
  min-height: 44px;
  font-family: var(--font-sans);
}

.form-input:hover,
.form-select:hover,
.form-textarea:hover {
  border-color: var(--primary-color);
  background: rgba(102, 126, 234, 0.1);
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
  border-color: var(--primary-color);
  box-shadow: var(--shadow-glow);
}

.form-input:focus:not(:focus-visible),
.form-select:focus:not(:focus-visible),
.form-textarea:focus:not(:focus-visible) {
  outline: none;
}

.form-input:focus-visible,
.form-select:focus-visible,
.form-textarea:focus-visible {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}

.form-input.error,
.form-select.error,
.form-textarea.error {
  border-color: var(--error-color, #ef4444);
}

.form-input:disabled,
.form-select:disabled,
.form-textarea:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  border-color: var(--text-light);
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
}

.form-file {
  width: 100%;
  padding: 0.5rem;
  border: 2px dashed var(--border-color);
  border-radius: var(--radius-md);
  background: transparent;
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.2s ease;
}

.form-file:hover {
  border-color: var(--primary-color);
  background: rgba(102, 126, 234, 0.05);
}

.form-hint {
  color: var(--text-light);
  font-size: 0.75rem;
  margin-top: 0.25rem;
}

.error-message {
  color: var(--error-color, #ef4444);
  font-size: 0.75rem;
  margin-top: 0.25rem;
}

.attached-files {
  margin-top: 0.75rem;
}

.attached-file {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background: rgba(102, 126, 234, 0.1);
  border-radius: var(--radius-sm);
  margin-bottom: 0.5rem;
}

.file-name {
  flex: 1;
  font-size: 0.8125rem;
  color: var(--text-primary);
}

.file-size {
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.file-remove {
  background: none;
  border: none;
  color: var(--error-color, #ef4444);
  cursor: pointer;
  font-size: 1.25rem;
  font-weight: bold;
  padding: 0.25rem 0.5rem;
  border-radius: var(--radius-sm);
  transition: background 0.2s ease;
}

.file-remove:hover {
  background: rgba(239, 68, 68, 0.1);
}

.form-checkbox {
  margin-bottom: 2rem;
}

.checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  cursor: pointer;
  font-size: 0.875rem;
  line-height: 1.4;
}

.checkbox-input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.checkbox-custom {
  width: 20px;
  height: 20px;
  border: 2px solid var(--border-color);
  border-radius: var(--radius-sm);
  background: var(--gradient-glass);
  flex-shrink: 0;
  position: relative;
  transition: all 0.2s ease;
}

.checkbox-input:checked + .checkbox-custom {
  background: var(--primary-color);
  border-color: var(--primary-color);
}

.checkbox-input:checked + .checkbox-custom::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 0.75rem;
  font-weight: bold;
}

.checkbox-input:focus + .checkbox-custom {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}

.checkbox-input.error + .checkbox-custom {
  border-color: var(--error-color, #ef4444);
}

.checkbox-text {
  color: var(--text-primary);
}

.privacy-link {
  color: var(--primary-color);
  text-decoration: underline;
}

.privacy-link:hover {
  color: var(--accent-color);
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.form-submit {
  flex: 1;
  min-width: 200px;
}

.form-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.form-submit.loading {
  position: relative;
}

.form-submit.loading::after {
  content: '';
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: translateY(-50%) rotate(360deg); }
}

.submit-status {
  padding: 1rem;
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  font-weight: 500;
}

.status-success {
  background: rgba(34, 197, 94, 0.1);
  color: var(--success-color, #22c55e);
  border: 1px solid rgba(34, 197, 94, 0.3);
}

.status-error {
  background: rgba(239, 68, 68, 0.1);
  color: var(--error-color, #ef4444);
  border: 1px solid rgba(239, 68, 68, 0.3);
}

@media (max-width: 768px) {
  .contact-form-container {
    padding: 1.5rem;
  }

  .form-actions {
    flex-direction: column;
  }

  .form-submit {
    min-width: auto;
  }
}
</style>
