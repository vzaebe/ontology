<template>
  <div class="projects-page">
    <CurveDivider />
    <!-- Заголовок страницы -->
    <section class="page-header">
      <div class="container">
        <h1>Проекты и вакансии</h1>
        <p class="page-subtitle">
          Инициативы по онтологиям и графам знаний из разных отраслей
        </p>
      </div>
    </section>

    <!-- Фильтры -->
    <section class="filters-section">
      <div class="container">
        <div class="filters">
          <div class="filter-group">
            <label for="status-filter">Статус проекта:</label>
            <select 
              id="status-filter" 
              v-model="filters.status"
              class="filter-select"
            >
              <option value="">Все статусы</option>
              <option value="active">Активные</option>
              <option value="planning">Планирование</option>
              <option value="completed">Завершенные</option>
              <option value="on-hold">Приостановленные</option>
            </select>
          </div>
          
          <div class="filter-group">
            <label for="technology-filter">Технология:</label>
            <select 
              id="technology-filter" 
              v-model="filters.technology"
              class="filter-select"
            >
              <option value="">Все технологии</option>
              <option value="OWL">OWL</option>
              <option value="RDF">RDF</option>
              <option value="SPARQL">SPARQL</option>
              <option value="Protégé">Protégé</option>
              <option value="GraphDB">GraphDB</option>
            </select>
          </div>
          
          <div class="filter-group">
            <label for="search-filter">Поиск:</label>
            <input 
              id="search-filter"
              v-model="filters.search"
              type="text"
              placeholder="Поиск по названию или описанию..."
              class="filter-input"
            />
          </div>
          
          <button 
            @click="clearFilters"
            class="btn btn-secondary"
          >
            🗑️ Очистить фильтры
          </button>
        </div>
      </div>
    </section>

    <!-- Список проектов -->
    <section class="projects-section">
      <div class="container">
        <div class="projects-header">
          <h2>Найдено проектов: {{ filteredProjects.length }}</h2>
          <div class="view-controls">
            <button 
              @click="viewMode = 'grid'"
              class="view-btn icon-btn"
              :class="{ 'active': viewMode === 'grid' }"
            >
              <svg class="icon" width="16" height="16" aria-hidden="true"><use href="#icon-box" /></svg>
              Сетка
            </button>
            <button 
              @click="viewMode = 'list'"
              class="view-btn icon-btn"
              :class="{ 'active': viewMode === 'list' }"
            >
              <svg class="icon" width="16" height="16" aria-hidden="true"><use href="#icon-clipboard" /></svg>
              Список
            </button>
          </div>
        </div>
        
        <div 
          class="projects-grid"
          :class="{ 'list-view': viewMode === 'list' }"
        >
          <ProjectCard 
            v-for="project in filteredProjects" 
            :key="project.id"
            :project="project"
          />
        </div>
        
        <!-- Пагинация -->
        <div class="pagination" v-if="totalPages > 1">
          <button 
            @click="currentPage--"
            :disabled="currentPage === 1"
            class="pagination-btn"
          >
            ← Предыдущая
          </button>
          
          <div class="page-numbers">
            <button 
              v-for="page in visiblePages" 
              :key="page"
              @click="currentPage = page"
              class="page-btn"
              :class="{ 'active': currentPage === page }"
            >
              {{ page }}
            </button>
          </div>
          
          <button 
            @click="currentPage++"
            :disabled="currentPage === totalPages"
            class="pagination-btn"
          >
            Следующая →
          </button>
        </div>
      </div>
    </section>

    <!-- Статистика -->
    <section class="stats-section">
      <div class="container">
        <h2>Статистика проектов</h2>
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon" aria-hidden="true"><svg class="icon" width="24" height="24"><use href="#icon-rocket" /></svg></div>
            <div class="stat-number">{{ activeProjectsCount }}</div>
            <div class="stat-label">Активных проектов</div>
          </div>
          
          <div class="stat-card">
            <div class="stat-icon" aria-hidden="true"><svg class="icon" width="24" height="24"><use href="#icon-users" /></svg></div>
            <div class="stat-number">{{ totalVacanciesCount }}</div>
            <div class="stat-label">Открытых вакансий</div>
          </div>
          
          <div class="stat-card">
            <div class="stat-icon" aria-hidden="true"><svg class="icon" width="24" height="24"><use href="#icon-cash" /></svg></div>
            <div class="stat-number">{{ averageSalary }}</div>
            <div class="stat-label">Средняя зарплата</div>
          </div>
          
          <div class="stat-card">
            <div class="stat-icon" aria-hidden="true"><svg class="icon" width="24" height="24"><use href="#icon-trending-up" /></svg></div>
            <div class="stat-number">{{ completionRate }}%</div>
            <div class="stat-label">Процент завершения</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Вакансии (агрегированные) -->
    <section class="section">
      <div class="container">
        <div class="projects-header">
          <h2>Открытые вакансии</h2>
        </div>
        <div class="projects-grid list-view">
          <div v-for="vac in vacancies" :key="vac.id" class="card">
            <div class="project-header">
              <h3 class="project-title">{{ vac.title }}</h3>
              <div class="project-status status-planning">{{ vac.role_type }}</div>
            </div>
            <p class="project-description">
              Стек: {{ vac.stack.join(', ') }}
            </p>
            <div class="project-details">
              <div class="detail-item"><span class="detail-icon">🧩</span><span class="detail-label">Задачи:</span></div>
              <ul class="requirements-list">
                <li v-for="t in vac.tasks" :key="t">{{ t }}</li>
              </ul>
              <div class="detail-item"><span class="detail-icon">✅</span><span class="detail-label">Требования:</span></div>
              <ul class="requirements-list">
                <li v-for="r in vac.requirements" :key="r">{{ r }}</li>
              </ul>
              <div class="detail-item" v-if="vac.nice_to_have && vac.nice_to_have.length">
                <span class="detail-icon">⭐</span><span class="detail-label">Будет плюсом:</span>
              </div>
              <ul v-if="vac.nice_to_have && vac.nice_to_have.length" class="requirements-list">
                <li v-for="n in vac.nice_to_have" :key="n">{{ n }}</li>
              </ul>
            </div>
            <div class="project-actions">
              <button class="btn btn-primary" @click="applyVacancy(vac)">Откликнуться</button>
              <a class="btn btn-secondary" :href="`mailto:${vac.contact}`">Связаться</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import ProjectCard from '../components/ProjectCard.vue'
import CurveDivider from '../components/CurveDivider.vue'
import { projects as cmsProjects } from '../data/projects.js'
import { vacancies as cmsVacancies } from '../data/vacancies.js'

export default {
  name: 'ProjectsPage',
  components: {
    ProjectCard,
    CurveDivider
  },
  setup() {
    // Состояние фильтров
    const filters = ref({
      status: '',
      technology: '',
      search: ''
    })
    
    // Режим отображения
    const viewMode = ref('grid')
    
    // Пагинация
    const currentPage = ref(1)
    const itemsPerPage = ref(6)
    
    // Базовые проекты (существующие)
      const baseProjects = ref([
      {
        id: 1,
        title: 'Семантический каталог данных',
        description: 'Внедрение онтологии и единого словаря терминов для улучшения поиска, качества данных и соблюдения регламентов.',
        status: 'active',
        duration: '12 месяцев',
        teamSize: 8,
        budget: '—',
        technologies: ['OWL', 'RDF', 'Protégé', 'GraphDB'],
        vacancies: [
          {
            id: 1,
            title: 'Онтолог-разработчик',
            salary: '—',
            description: 'Разработка и поддержка онтологии предметной области',
            requirements: [
              'Опыт работы с OWL/RDF не менее 2 лет',
              'Знание Protégé или аналогичных инструментов',
              'Навыки моделирования домена',
              'Опыт работы с GraphDB или аналогичными СУБД'
            ]
          },
          {
            id: 2,
            title: 'Инженер по данным',
            salary: '—',
            description: 'Подготовка и интеграция данных в граф знаний',
            requirements: [
              'Опыт работы с большими данными',
              'Знание SQL и NoSQL баз данных',
              'Опыт работы с ETL процессами',
              'Базовые знания онтологий'
            ]
          }
        ],
        contacts: {
          manager: 'Иванов А.П.',
          email: 'project1@ontology.ru',
          phone: '+7 (495) 123-45-67'
        }
      },
      {
        id: 2,
        title: 'Семантический поиск и рекомендации',
        description: 'Граф знаний для персонализации и поиска в медиаконтенте.',
        status: 'active',
        duration: '18 месяцев',
        teamSize: 12,
        budget: '—',
        technologies: ['OWL', 'SPARQL', 'Java', 'Spring'],
        vacancies: [
          {
            id: 3,
            title: 'Java-разработчик',
            salary: '—',
            description: 'Разработка backend сервисов для поиска и рекомендаций',
            requirements: [
              'Опыт работы с Java 8+ не менее 3 лет',
              'Знание Spring Framework',
              'Опыт работы с онтологиями',
              'Знание SPARQL и RDF'
            ]
          }
        ],
        contacts: {
          manager: 'Петров В.С.',
          email: 'project2@ontology.ru',
          phone: '+7 (495) 123-45-68'
        }
      },
      {
        id: 3,
        title: 'Онтология регуляторных требований',
        description: 'Формализация требований и проверка соответствия в ИТ и финсекторе.',
        status: 'planning',
        duration: '8 месяцев',
        teamSize: 6,
        budget: '—',
        technologies: ['OWL', 'RDFS', 'Protégé'],
        vacancies: [
          {
            id: 4,
            title: 'Специалист по безопасности',
            salary: '—',
            description: 'Анализ стандартов безопасности и их формализация',
            requirements: [
              'Опыт работы в области промышленной безопасности',
              'Знание нормативных документов',
              'Базовые знания онтологий',
              'Опыт работы с документацией'
            ]
          }
        ],
        contacts: {
          manager: 'Сидоров М.К.',
          email: 'project3@ontology.ru',
          phone: '+7 (495) 123-45-69'
        }
      },
      {
        id: 4,
        title: 'Интеграция данных из различных источников',
        description: 'Создание системы интеграции данных из различных источников с использованием семантических технологий.',
        status: 'completed',
        duration: '10 месяцев',
        teamSize: 10,
        budget: '—',
        technologies: ['RDF', 'SPARQL', 'GraphDB', 'Python'],
        vacancies: [],
        contacts: {
          manager: 'Козлов Д.А.',
          email: 'project4@ontology.ru',
          phone: '+7 (495) 123-45-70'
        }
      }
    ])

    // Маппинг CMS-проектов к форме карточки без потерь полей (добавляемые поля сохраняются в объекте)
    const mapCmsToUiProject = (p) => ({
      id: p.id,
      title: p.title,
      description: p.summary,
      status: p.status === 'prod' ? 'active' : p.status === 'mvp' ? 'planning' : 'planning',
      duration: p.duration || '—',
      teamSize: p.teamSize || 0,
      budget: p.budget || '',
      technologies: p.stack || [],
      vacancies: [],
      contacts: p.contacts || {}
    })

    const projects = ref([
      ...baseProjects.value,
      ...cmsProjects.map(mapCmsToUiProject)
    ])

    // Вывод «Вакансии» как отдельный блок внизу (агрегировано из CMS)
    const vacancies = ref(cmsVacancies)

    const applyVacancy = (vac) => {
      alert(`Отклик по вакансии: ${vac.title}`)
    }
    
    // Фильтрация проектов
    const filteredProjects = computed(() => {
      return projects.value.filter(project => {
        // Фильтр по статусу
        if (filters.value.status && project.status !== filters.value.status) {
          return false
        }
        
        // Фильтр по технологии
        if (filters.value.technology && !project.technologies.includes(filters.value.technology)) {
          return false
        }
        
        // Фильтр по поиску
        if (filters.value.search) {
          const searchLower = filters.value.search.toLowerCase()
          const titleMatch = project.title.toLowerCase().includes(searchLower)
          const descMatch = project.description.toLowerCase().includes(searchLower)
          if (!titleMatch && !descMatch) {
            return false
          }
        }
        
        return true
      })
    })
    
    // Пагинация
    const totalPages = computed(() => {
      return Math.ceil(filteredProjects.value.length / itemsPerPage.value)
    })
    
    const paginatedProjects = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage.value
      const end = start + itemsPerPage.value
      return filteredProjects.value.slice(start, end)
    })
    
    const visiblePages = computed(() => {
      const pages = []
      const start = Math.max(1, currentPage.value - 2)
      const end = Math.min(totalPages.value, currentPage.value + 2)
      
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
      
      return pages
    })
    
    // Статистика
    const activeProjectsCount = computed(() => projects.value.filter(p => p.status === 'active').length)
    
    const totalVacanciesCount = computed(() => projects.value.reduce((total, project) => total + (project.vacancies ? project.vacancies.length : 0), 0))
    
    const averageSalary = computed(() => {
      const salaries = []
      projects.value.forEach(project => {
        project.vacancies?.forEach(vacancy => {
          const salary = vacancy.salary.match(/\d+/g)
          if (salary && salary.length >= 2) {
            salaries.push((parseInt(salary[0]) + parseInt(salary[1])) / 2)
          }
        })
      })
      
      if (salaries.length === 0) return '0'
      return Math.round(salaries.reduce((a, b) => a + b, 0) / salaries.length)
    })
    
    const completionRate = computed(() => {
      const completed = projects.value.filter(p => p.status === 'completed').length
      return Math.round((completed / projects.value.length) * 100)
    })
    
    // Методы
    const clearFilters = () => {
      filters.value = {
        status: '',
        technology: '',
        search: ''
      }
      currentPage.value = 1
    }
    
    // Следим за изменением фильтров и сбрасываем страницу
    const watchFilters = () => {
      currentPage.value = 1
    }
    
    return {
      filters,
      viewMode,
      currentPage,
      filteredProjects: paginatedProjects,
      totalPages,
      visiblePages,
      activeProjectsCount,
      totalVacanciesCount,
      averageSalary,
      completionRate,
      clearFilters,
      watchFilters,
      vacancies,
      applyVacancy
    }
  }
}
</script>

<style scoped>
/* Заголовок страницы */
.page-header {
  background: radial-gradient(600px 400px at 12% 20%, rgba(255,47,109,0.35), transparent 60%),
              linear-gradient(135deg, #2a0b3b, #0a0d1f 70%);
  color: white;
  padding: 4rem 0;
  text-align: center;
}

.page-header h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.page-subtitle {
  font-size: 1.25rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
}

/* Фильтры */
.filters-section {
  background: var(--bg-secondary);
  padding: 2rem 0;
  border-bottom: 1px solid var(--bg-tertiary);
}

.filters {
  display: flex;
  gap: 2rem;
  align-items: end;
  flex-wrap: wrap;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.filter-group label {
  font-weight: 600;
  color: var(--text-primary);
  font-size: 0.875rem;
}

.filter-select,
.filter-input {
  padding: 0.75rem;
  border: 1px solid var(--text-light);
  border-radius: var(--radius-md);
  background: var(--bg-primary);
  font-size: 0.875rem;
  min-width: 200px;
}

.filter-select:focus,
.filter-input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(30, 58, 138, 0.1);
}

/* Секция проектов */
.projects-section {
  padding: 4rem 0;
}

.projects-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.projects-header h2 {
  color: var(--primary-color);
  margin: 0;
}

.view-controls {
  display: flex;
  gap: 0.5rem;
}

.view-btn {
  padding: 0.5rem 1rem;
  border: 1px solid var(--text-light);
  background: var(--bg-primary);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.2s ease;
}

.view-btn.active {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.projects-grid.list-view {
  grid-template-columns: 1fr;
}

/* Пагинация */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 3rem;
}

.pagination-btn {
  padding: 0.75rem 1.5rem;
  border: 1px solid var(--text-light);
  background: var(--bg-primary);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.2s ease;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-btn:not(:disabled):hover {
  background: var(--bg-secondary);
}

.page-numbers {
  display: flex;
  gap: 0.5rem;
}

.page-btn {
  width: 3rem;
  height: 3rem;
  border: 1px solid var(--text-light);
  background: var(--bg-primary);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.page-btn.active {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.page-btn:hover:not(.active) {
  background: var(--bg-secondary);
}

/* Статистика */
.stats-section {
  background: var(--bg-secondary);
  padding: 4rem 0;
}

.stats-section h2 {
  text-align: center;
  color: var(--primary-color);
  margin-bottom: 3rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

.stat-card {
  background: var(--bg-primary);
  padding: 2rem;
  border-radius: var(--radius-lg);
  text-align: center;
  box-shadow: var(--shadow-md);
}

.stat-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
}

.stat-label {
  color: var(--text-secondary);
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Адаптивность */
@media (max-width: 768px) {
  .page-header h1 {
    font-size: 2rem;
  }
  
  .page-subtitle {
    font-size: 1rem;
  }
  
  .filters {
    flex-direction: column;
    align-items: stretch;
  }
  
  .filter-select,
  .filter-input {
    min-width: auto;
  }
  
  .projects-header {
    flex-direction: column;
    align-items: stretch;
  }
  
  .projects-grid {
    grid-template-columns: 1fr;
  }
  
  .pagination {
    flex-direction: column;
    gap: 1rem;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style> 