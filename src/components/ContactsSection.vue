<template>
  <section id="contacts" class="contacts-section">
    <div class="container">
      <!-- Заголовок секции -->
      <div class="section-header">
        <h2>Контакты</h2>
        <p class="section-subtitle">
          Свяжитесь с нами любым удобным способом — ответим быстро и по существу
        </p>
      </div>

      <!-- Основной блок: контакты + форма -->
      <div class="contacts-main">
        <!-- Левая колонка: наши контакты -->
        <div class="contacts-info">
          <div class="contact-info-card">
            <h3>Наши контакты</h3>
            
            <!-- Организация -->
            <div class="contact-organization">
              <h4>{{ organizationData.fullName }}</h4>
              <div class="org-details">
                <span class="org-detail">ИНН: {{ organizationData.inn }}</span>
                <span class="org-detail">ОГРН: {{ organizationData.ogrn }}</span>
              </div>
            </div>

            <!-- Общие контакты -->
            <div class="contact-methods">
              <!-- Email -->
              <div class="contact-method">
                <div class="method-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div class="method-content">
                  <div class="method-label">Электронная почта</div>
                  <a :href="`mailto:${generalContacts.emails.general}`" class="method-value">
                    {{ generalContacts.emails.general }}
                  </a>
                </div>
              </div>

              <!-- Телефон -->
              <div class="contact-method">
                <div class="method-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <div class="method-content">
                  <div class="method-label">Телефон</div>
                  <a :href="`tel:${generalContacts.phone}`" class="method-value">
                    {{ formatPhone(generalContacts.phone) }}
                  </a>
                </div>
              </div>

              <!-- Telegram -->
              <div class="contact-method">
                <div class="method-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 12l2 2 4-4"/>
                    <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"/>
                  </svg>
                </div>
                <div class="method-content">
                  <div class="method-label">Telegram</div>
                  <a :href="getTelegramLink(generalContacts.messengers.telegram)" target="_blank" class="method-value">
                    {{ generalContacts.messengers.telegram }}
                  </a>
                </div>
              </div>

              <!-- Адрес -->
              <div class="contact-method">
                <div class="method-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div class="method-content">
                  <div class="method-label">Адрес</div>
                  <span class="method-value">{{ primaryLocation.fullAddress }}</span>
                </div>
              </div>

              <!-- Часы работы -->
              <div class="contact-method">
                <div class="method-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12,6 12,12 16,14"/>
                  </svg>
                </div>
                <div class="method-content">
                  <div class="method-label">Часы работы</div>
                  <span class="method-value">{{ generalContacts.workingHours }}</span>
                  <div class="working-status" :class="workingStatus.isOpen ? 'status-open' : 'status-closed'">
                    {{ workingStatus.message }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Дополнительные контакты -->
            <div class="additional-contacts">
              <h5>По направлениям</h5>
              <div class="additional-emails">
                <a :href="`mailto:${generalContacts.emails.partners}`" class="additional-email">
                  <span class="email-label">Партнёрства:</span>
                  {{ generalContacts.emails.partners }}
                </a>
                <a :href="`mailto:${generalContacts.emails.tech}`" class="additional-email">
                  <span class="email-label">Техподдержка:</span>
                  {{ generalContacts.emails.tech }}
                </a>
                <a :href="`mailto:${generalContacts.emails.hr}`" class="additional-email">
                  <span class="email-label">HR:</span>
                  {{ generalContacts.emails.hr }}
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Правая колонка: форма обращения -->
        <div class="contacts-form">
          <ContactForm 
            :preselected-direction="preselectedDirection"
            :preselected-person="preselectedPerson"
            @form-submitted="handleFormSubmit"
          />
        </div>
      </div>

      <!-- Карта -->
      <YandexMap 
        :locations="locations"
        :api-key="mapSettings.apiKey"
        :auto-load="true"
        map-height="450px"
      />

      <!-- Контакт-лица по направлениям -->
      <div class="contact-persons-section">
        <div class="section-header">
          <h3>Контакт-лица по направлениям</h3>
          <p class="section-subtitle">
            Обращайтесь напрямую к специалистам по вашему вопросу
          </p>
        </div>
        
        <div class="contact-persons-grid">
          <ContactPersonCard 
            v-for="person in contactPersons"
            :key="person.id"
            :person="person"
            @write-message="handlePersonContact"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { contactsData, formatPhone as formatPhoneHelper, getWorkingHoursStatus } from '../data/contacts.js'
import ContactForm from './ContactForm.vue'
import ContactPersonCard from './ContactPersonCard.vue'
import YandexMap from './YandexMap.vue'

export default {
  name: 'ContactsSection',
  components: {
    ContactForm,
    ContactPersonCard,
    YandexMap
  },
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
  emits: ['person-contact', 'form-submitted'],
  setup(props, { emit }) {
    // Данные из конфига
    const organizationData = contactsData.organization
    const generalContacts = contactsData.generalContacts
    const locations = contactsData.locations
    const contactPersons = contactsData.contactPersons
    const mapSettings = contactsData.mapSettings

    // Основная локация
    const primaryLocation = computed(() => {
      return locations.find(loc => loc.isHeadquarters) || locations[0]
    })

    // Статус работы
    const workingStatus = ref(getWorkingHoursStatus())

    // Хелперы
    const formatPhone = (phone) => {
      return formatPhoneHelper(phone)
    }

    const getTelegramLink = (telegram) => {
      const username = telegram.replace('@', '')
      return `https://t.me/${username}`
    }

    // Обработчики событий
    const handlePersonContact = (data) => {
      emit('person-contact', data)
      
      // Скроллим к форме
      const formElement = document.querySelector('.contacts-form')
      if (formElement) {
        formElement.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        })
      }

      // Аналитика
      if (window.gtag) {
        window.gtag('event', 'contact_person_click', {
          person_id: data.person,
          direction: data.direction
        })
      }
    }

    const handleFormSubmit = (formData) => {
      emit('form-submitted', formData)
      
      // Аналитика
      if (window.gtag) {
        window.gtag('event', 'contact_form_submit', {
          direction: formData.direction
        })
      }
    }

    // Обновление статуса работы каждую минуту
    let statusInterval = null

    onMounted(() => {
      // Обновляем статус работы каждую минуту
      statusInterval = setInterval(() => {
        workingStatus.value = getWorkingHoursStatus()
      }, 60000)

      // Аналитика просмотра контактов
      if (window.gtag) {
        window.gtag('event', 'contact_view')
      }

      // Анимация появления элементов
      const animateElements = document.querySelectorAll('.contact-info-card, .contact-person-card')
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
          }
        })
      }, {
        threshold: 0.1,
        rootMargin: '50px 0px'
      })

      animateElements.forEach(el => observer.observe(el))
    })

    return {
      organizationData,
      generalContacts,
      locations,
      contactPersons,
      mapSettings,
      primaryLocation,
      workingStatus,
      formatPhone,
      getTelegramLink,
      handlePersonContact,
      handleFormSubmit
    }
  }
}
</script>

<style scoped>
.contacts-section {
  padding: 5rem 0;
  background: var(--bg-primary);
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-header h2 {
  color: var(--primary-color);
  font-size: 2.5rem;
  font-weight: 900;
  margin: 0 0 1rem 0;
}

.section-subtitle {
  color: var(--text-secondary);
  font-size: 1.125rem;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.5;
}

.contacts-main {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-bottom: 4rem;
}

.contact-info-card {
  background: var(--gradient-glass);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-lg);
  padding: 2rem;
  backdrop-filter: blur(10px);
  height: fit-content;
}

.contact-info-card h3 {
  color: var(--primary-color);
  margin: 0 0 1.5rem 0;
  font-size: 1.5rem;
  font-weight: 700;
}

.contact-organization {
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.contact-organization h4 {
  color: var(--text-primary);
  margin: 0 0 0.5rem 0;
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.3;
}

.org-details {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.org-detail {
  color: var(--text-light);
  font-size: 0.8125rem;
}

.contact-methods {
  margin-bottom: 2rem;
}

.contact-method {
  display: flex;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.contact-method:last-child {
  border-bottom: none;
}

.method-icon {
  color: var(--primary-color);
  flex-shrink: 0;
  padding-top: 0.125rem;
}

.method-content {
  flex: 1;
  min-width: 0;
}

.method-label {
  color: var(--text-secondary);
  font-size: 0.8125rem;
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.method-value {
  color: var(--text-primary);
  font-size: 0.875rem;
  text-decoration: none;
  word-break: break-all;
  transition: color 0.2s ease;
}

a.method-value:hover {
  color: var(--primary-color);
  text-decoration: underline;
}

.working-status {
  font-size: 0.75rem;
  font-weight: 500;
  margin-top: 0.25rem;
  padding: 0.25rem 0.5rem;
  border-radius: var(--radius-sm);
  display: inline-block;
}

.status-open {
  background: rgba(34, 197, 94, 0.1);
  color: var(--success-color, #22c55e);
}

.status-closed {
  background: rgba(156, 163, 175, 0.1);
  color: var(--text-light);
}

.additional-contacts {
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.additional-contacts h5 {
  color: var(--text-primary);
  margin: 0 0 1rem 0;
  font-size: 0.9375rem;
  font-weight: 600;
}

.additional-emails {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.additional-email {
  display: flex;
  gap: 0.5rem;
  font-size: 0.8125rem;
  text-decoration: none;
  color: var(--text-secondary);
  transition: color 0.2s ease;
  align-items: baseline;
}

.additional-email:hover {
  color: var(--primary-color);
}

.email-label {
  font-weight: 500;
  min-width: 80px;
  flex-shrink: 0;
}

.contact-persons-section {
  margin-top: 5rem;
}

.contact-persons-section .section-header {
  margin-bottom: 3rem;
}

.contact-persons-section .section-header h3 {
  color: var(--primary-color);
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
}

.contact-persons-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

/* Анимации */
.contact-info-card,
.contact-person-card {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), 
              transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.contact-info-card.animate-in,
.contact-person-card.animate-in {
  opacity: 1;
  transform: translateY(0);
}

/* Адаптивность */
@media (max-width: 1024px) {
  .contacts-main {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

@media (max-width: 768px) {
  .contacts-section {
    padding: 3rem 0;
  }

  .section-header h2 {
    font-size: 2rem;
  }

  .section-subtitle {
    font-size: 1rem;
  }

  .contact-info-card {
    padding: 1.5rem;
  }

  .contact-method {
    padding: 0.75rem 0;
  }

  .org-details {
    flex-direction: column;
    gap: 0.25rem;
  }

  .additional-email {
    flex-direction: column;
    gap: 0.25rem;
  }

  .email-label {
    min-width: auto;
  }

  .contact-persons-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}

/* Состояния доступности */
.method-value:focus {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}

.method-value:focus:not(:focus-visible) {
  outline: none;
}

.method-value:focus-visible {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}

.additional-email:focus {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}

.additional-email:focus:not(:focus-visible) {
  outline: none;
}

.additional-email:focus-visible {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}

/* Отключение анимаций для пользователей с пониженным восприятием движения */
@media (prefers-reduced-motion: reduce) {
  .contact-info-card,
  .contact-person-card {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
