<template>
  <div class="project-card card">
    <!-- Заголовок проекта -->
    <div class="project-header">
      <h3 class="project-title">{{ project.title }}</h3>
      <div class="project-status" :class="`status-${project.status}`">
        {{ getStatusText(project.status) }}
      </div>
    </div>
    
    <!-- Описание проекта -->
    <p class="project-description">{{ project.description }}</p>
    
    <!-- Технологии -->
    <div class="project-technologies" v-if="project.technologies && project.technologies.length">
      <span class="technologies-label">Технологии:</span>
      <div class="technologies-list">
        <span 
          v-for="tech in project.technologies" 
          :key="tech"
          class="technology-tag"
        >
          {{ tech }}
        </span>
      </div>
    </div>
    
    <!-- Детали проекта -->
    <div class="project-details">
      <div class="detail-item">
        <span class="detail-icon">📅</span>
        <span class="detail-label">Сроки:</span>
        <span class="detail-value">{{ project.duration }}</span>
      </div>
      <div class="detail-item">
        <span class="detail-icon">👥</span>
        <span class="detail-label">Команда:</span>
        <span class="detail-value">{{ project.teamSize }} человек</span>
      </div>
      <div class="detail-item" v-if="project.budget">
        <span class="detail-icon">💰</span>
        <span class="detail-label">Бюджет:</span>
        <span class="detail-value">{{ project.budget }}</span>
      </div>
    </div>
    
    <!-- Вакансии -->
    <div class="project-vacancies" v-if="project.vacancies && project.vacancies.length">
      <h4 class="vacancies-title">Открытые вакансии:</h4>
      <div class="vacancies-list">
        <div 
          v-for="vacancy in project.vacancies" 
          :key="vacancy.id"
          class="vacancy-item"
        >
          <div class="vacancy-header">
            <h5 class="vacancy-title">{{ vacancy.title }}</h5>
            <span class="vacancy-salary">
              <svg class="icon" width="16" height="16" aria-hidden="true"><use href="#icon-cash" /></svg>
              {{ vacancy.salary }}
            </span>
          </div>
          <p class="vacancy-description">{{ vacancy.description }}</p>
          <div class="vacancy-requirements">
            <span class="requirements-label"><svg class="icon" width="14" height="14" aria-hidden="true"><use href="#icon-clipboard" /></svg> Требования:</span>
            <ul class="requirements-list">
              <li v-for="req in vacancy.requirements" :key="req">{{ req }}</li>
            </ul>
          </div>
          <div class="vacancy-actions">
            <button 
              @click="applyForVacancy(vacancy)"
              class="btn btn-primary icon-btn"
            >
              <svg class="icon" width="18" height="18" aria-hidden="true"><use href="#icon-pencil" /></svg>
              Откликнуться
            </button>
            <button 
              @click="showVacancyDetails(vacancy)"
              class="btn btn-secondary icon-btn"
            >
              <svg class="icon" width="18" height="18" aria-hidden="true"><use href="#icon-clipboard" /></svg>
              Подробнее
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Контакты проекта -->
    <div class="project-contacts" v-if="project.contacts">
      <h4>Контакты проекта:</h4>
      <div class="contact-info">
        <div class="contact-item" v-if="project.contacts.manager">
          <span class="contact-icon" aria-hidden="true"><svg class="icon" width="16" height="16"><use href="#icon-users" /></svg></span>
          <span class="contact-label">Руководитель:</span>
          <span class="contact-value">{{ project.contacts.manager }}</span>
        </div>
        <div class="contact-item" v-if="project.contacts.email">
          <span class="contact-icon" aria-hidden="true"><svg class="icon" width="16" height="16"><use href="#icon-mail" /></svg></span>
          <span class="contact-label">Email:</span>
          <a :href="`mailto:${project.contacts.email}`" class="contact-link">
            {{ project.contacts.email }}
          </a>
        </div>
        <div class="contact-item" v-if="project.contacts.phone">
          <span class="contact-icon" aria-hidden="true"><svg class="icon" width="16" height="16"><use href="#icon-phone" /></svg></span>
          <span class="contact-label">Телефон:</span>
          <a :href="`tel:${project.contacts.phone}`" class="contact-link">
            {{ project.contacts.phone }}
          </a>
        </div>
      </div>
    </div>
    
    <!-- Действия с проектом -->
    <div class="project-actions">
      <button 
        @click="showProjectDetails"
        class="btn btn-primary icon-btn"
      >
        <svg class="icon" width="18" height="18" aria-hidden="true"><use href="#icon-clipboard" /></svg>
        Подробности проекта
      </button>
      <button 
        @click="toggleFavorite"
        class="btn btn-secondary favorite-btn icon-btn"
        :class="{ 'favorited': isFavorited }"
      >
        <svg v-if="isFavorited" class="icon" width="18" height="18" aria-hidden="true"><use href="#icon-heart-solid" /></svg>
        <svg v-else class="icon" width="18" height="18" aria-hidden="true"><use href="#icon-heart" /></svg>
        В избранное
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'ProjectCard',
  props: {
    // Объект с данными проекта
    project: {
      type: Object,
      required: true,
      validator: (value) => {
        return value.title && value.description && value.status
      }
    }
  },
  setup(props) {
    // Состояние избранного
    const isFavorited = ref(false)
    
    // Получение текста статуса
    const getStatusText = (status) => {
      const statusMap = {
        'active': 'Активный',
        'planning': 'Планирование',
        'completed': 'Завершен',
        'on-hold': 'Приостановлен',
        'cancelled': 'Отменен'
      }
      return statusMap[status] || status
    }
    
    // Отклик на вакансию
    const applyForVacancy = (vacancy) => {
      // Здесь можно добавить логику отправки заявки
      console.log('Отклик на вакансию:', vacancy.title)
      alert(`Заявка на вакансию "${vacancy.title}" отправлена!`)
    }
    
    // Показать детали вакансии
    const showVacancyDetails = (vacancy) => {
      // Здесь можно открыть модальное окно с подробностями
      console.log('Детали вакансии:', vacancy)
    }
    
    // Показать детали проекта
    const showProjectDetails = () => {
      console.log('Детали проекта:', props.project)
    }
    
    // Переключение избранного
    const toggleFavorite = () => {
      isFavorited.value = !isFavorited.value
      localStorage.setItem(`project-favorite-${props.project.id}`, isFavorited.value)
    }
    
    // Проверяем статус избранного при загрузке
    const checkFavoriteStatus = () => {
      const saved = localStorage.getItem(`project-favorite-${props.project.id}`)
      if (saved !== null) {
        isFavorited.value = JSON.parse(saved)
      }
    }
    
    checkFavoriteStatus()
    
    return {
      isFavorited,
      getStatusText,
      applyForVacancy,
      showVacancyDetails,
      showProjectDetails,
      toggleFavorite
    }
  }
}
</script>

<style scoped>
.project-card {
  padding: 2rem;
  transition: all 0.3s ease;
}

.project-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.project-title {
  color: var(--primary-color);
  font-size: 1.5rem;
  margin: 0;
  flex: 1;
}

.project-status {
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.status-active {
  background: var(--success-color);
  color: white;
}

.status-planning {
  background: var(--warning-color);
  color: white;
}

.status-completed {
  background: var(--text-secondary);
  color: white;
}

.status-on-hold {
  background: var(--error-color);
  color: white;
}

.status-cancelled {
  background: var(--text-light);
  color: var(--text-primary);
}

.project-description {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.project-technologies {
  margin-bottom: 1.5rem;
}

.technologies-label {
  display: block;
  color: var(--text-secondary);
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.technologies-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.technology-tag {
  background: var(--accent-color);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
  font-weight: 500;
}

.project-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.detail-icon {
  font-size: 1.25rem;
}

.detail-label {
  color: var(--text-secondary);
  font-size: 0.875rem;
  font-weight: 500;
}

.detail-value {
  color: var(--text-primary);
  font-weight: 600;
}

.project-vacancies {
  margin-bottom: 2rem;
}

.vacancies-title {
  color: var(--primary-color);
  margin-bottom: 1rem;
  font-size: 1.25rem;
}

.vacancies-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.vacancy-item {
  padding: 1.5rem;
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
  border-left: 4px solid var(--primary-color);
}

.vacancy-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.vacancy-title {
  color: var(--primary-color);
  margin: 0;
  font-size: 1.125rem;
}

.vacancy-salary {
  background: var(--success-color);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-sm);
  font-weight: 600;
  font-size: 0.875rem;
}

.vacancy-description {
  color: var(--text-secondary);
  margin-bottom: 1rem;
  font-size: 0.875rem;
}

.vacancy-requirements {
  margin-bottom: 1rem;
}

.requirements-label {
  display: block;
  color: var(--text-secondary);
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.requirements-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.requirements-list li {
  color: var(--text-primary);
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
  padding-left: 1rem;
  position: relative;
}

.requirements-list li::before {
  content: '•';
  color: var(--primary-color);
  position: absolute;
  left: 0;
}

.vacancy-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.project-contacts {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: var(--bg-tertiary);
  border-radius: var(--radius-md);
}

.project-contacts h4 {
  color: var(--primary-color);
  margin-bottom: 1rem;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.contact-icon {
  font-size: 1.25rem;
}

.contact-label {
  color: var(--text-secondary);
  font-size: 0.875rem;
  font-weight: 500;
  min-width: 80px;
}

.contact-value,
.contact-link {
  color: var(--text-primary);
  font-weight: 500;
}

.contact-link {
  text-decoration: none;
}

.contact-link:hover {
  color: var(--primary-color);
}

.project-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.favorite-btn {
  transition: all 0.2s ease;
}

.favorite-btn.favorited {
  background-color: var(--error-color);
  color: white;
}

.favorite-btn.favorited:hover {
  background-color: #dc2626;
}

/* Адаптивность */
@media (max-width: 768px) {
  .project-card {
    padding: 1.5rem;
  }
  
  .project-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
  
  .project-details {
    grid-template-columns: 1fr;
  }
  
  .vacancy-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .vacancy-actions {
    flex-direction: column;
  }
  
  .project-actions {
    flex-direction: column;
  }
  
  .project-actions .btn {
    width: 100%;
    justify-content: center;
  }
}

.icon-btn .icon {
  margin-right: 0.5rem;
  vertical-align: -3px;
}
</style> 