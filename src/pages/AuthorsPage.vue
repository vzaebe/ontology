<template>
  <div class="authors-page">
    <CurveDivider />
    <!-- Заголовок страницы -->
    <section class="page-header">
      <div class="container">
        <h1>Авторы и эксперты</h1>
        <p class="page-subtitle">
          Профессионалы в области онтологий, графов знаний и семантических технологий
        </p>
      </div>
    </section>

    <!-- Фильтры -->
    <section class="filters-section">
      <div class="container">
        <div class="filters">
          <div class="filter-group">
            <label for="organization-filter">Организация:</label>
            <select 
              id="organization-filter" 
              v-model="filters.organization"
              class="filter-select"
            >
              <option value="">Все организации</option>
               <option value="DataLab Research">DataLab Research</option>
               <option value="Университет ИТ">Университет ИТ</option>
              <option value="Стэнфордский университет">Стэнфордский университет</option>
              <option value="MIT">MIT</option>
              <option value="Oxford University">Oxford University</option>
            </select>
          </div>
          
          <div class="filter-group">
            <label for="specialization-filter">Специализация:</label>
            <select 
              id="specialization-filter" 
              v-model="filters.specialization"
              class="filter-select"
            >
              <option value="">Все специализации</option>
              <option value="Онтологии">Онтологии</option>
              <option value="Семантический веб">Семантический веб</option>
              <option value="Машинное обучение">Машинное обучение</option>
              <option value="Финансы">Финансы</option>
              <option value="Автоматизация">Автоматизация</option>
            </select>
          </div>
          
          <div class="filter-group">
            <label for="search-filter">Поиск:</label>
            <input 
              id="search-filter"
              v-model="filters.search"
              type="text"
              placeholder="Поиск по имени, организации или специализации..."
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

    <!-- Статистика авторов -->
    <section class="stats-section">
      <div class="container">
        <h2>Статистика авторов</h2>
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon" aria-hidden="true"><svg class="icon" width="24" height="24"><use href="#icon-users" /></svg></div>
            <div class="stat-number">{{ totalAuthors }}</div>
            <div class="stat-label">Всего авторов</div>
          </div>
          
          <div class="stat-card">
            <div class="stat-icon" aria-hidden="true"><svg class="icon" width="24" height="24"><use href="#icon-building" /></svg></div>
            <div class="stat-number">{{ uniqueOrganizations }}</div>
            <div class="stat-label">Организаций</div>
          </div>
          
          <div class="stat-card">
            <div class="stat-icon" aria-hidden="true"><svg class="icon" width="24" height="24"><use href="#icon-chart" /></svg></div>
            <div class="stat-number">{{ averagePublications }}</div>
            <div class="stat-label">Среднее количество публикаций</div>
          </div>
          
          <div class="stat-card">
            <div class="stat-icon" aria-hidden="true"><svg class="icon" width="24" height="24"><use href="#icon-globe" /></svg></div>
            <div class="stat-number">{{ countriesCount }}</div>
            <div class="stat-label">Стран</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Список авторов -->
    <section class="authors-section">
      <div class="container">
        <div class="authors-header">
          <h2>Найдено авторов: {{ filteredAuthors.length }}</h2>
          <div class="sort-controls">
            <label for="sort-select">Сортировка:</label>
            <select 
              id="sort-select" 
              v-model="sortBy"
              class="sort-select"
            >
              <option value="publications">По количеству публикаций</option>
              <option value="name">По имени</option>
              <option value="organization">По организации</option>
              <option value="experience">По опыту</option>
            </select>
          </div>
        </div>
        
        <div class="authors-grid">
          <AuthorCard 
            v-for="author in sortedAuthors" 
            :key="author.id"
            :author="author"
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

    <!-- Организации -->
    <section class="organizations-section">
      <div class="container">
        <h2>Партнерские организации</h2>
        <div class="organizations-grid">
          <div 
            v-for="org in organizations" 
            :key="org.name"
            class="organization-card"
          >
            <div class="org-logo" aria-hidden="true">
              <svg class="icon" width="36" height="36"><use :href="getOrganizationIconId(org)" /></svg>
            </div>
            <h3>{{ org.name }}</h3>
            <p class="org-description">{{ org.description }}</p>
            <div class="org-stats">
              <div class="org-stat">
                <span class="stat-label">Авторов:</span>
                <span class="stat-value">{{ org.authorsCount }}</span>
              </div>
              <div class="org-stat">
                <span class="stat-label">Публикаций:</span>
                <span class="stat-value">{{ org.publicationsCount }}</span>
              </div>
            </div>
            <a :href="org.url" target="_blank" rel="noopener" class="btn btn-primary icon-btn">
              <svg class="icon" width="18" height="18" aria-hidden="true"><use href="#icon-external" /></svg>
              Перейти на сайт
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Контакты экспертов -->
    <section class="experts-contacts-section">
      <div class="container">
        <h2>Контакты экспертов</h2>
        <div class="experts-list">
          <div class="expert-item">
            <div class="expert-name">Александр Иванов</div>
            <div class="expert-role">Онтолог-разработчик</div>
            <a href="mailto:alex@ontology.ru" class="expert-contact">alex@ontology.ru</a>
          </div>
          <div class="expert-item">
            <div class="expert-name">Мария Петрова</div>
            <div class="expert-role">Семантический архитектор</div>
            <a href="mailto:maria@ontology.ru" class="expert-contact">maria@ontology.ru</a>
          </div>
          <div class="expert-item">
            <div class="expert-name">Дмитрий Козлов</div>
            <div class="expert-role">Инженер данных</div>
            <a href="mailto:dmitry@ontology.ru" class="expert-contact">dmitry@ontology.ru</a>
          </div>
        </div>
      </div>
    </section>

    <!-- Призыв к действию -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-content">
          <h2>Хотите присоединиться к команде?</h2>
          <p>
            Мы всегда открыты для сотрудничества с экспертами в области онтологий. 
            Присоединяйтесь к нашему сообществу!
          </p>
          <div class="cta-actions">
            <button @click="showContactForm" class="btn btn-primary icon-btn">
              <svg class="icon" width="18" height="18" aria-hidden="true"><use href="#icon-mail" /></svg>
              Связаться с нами
            </button>
            <router-link to="/projects" class="btn btn-secondary icon-btn">
              <svg class="icon" width="18" height="18" aria-hidden="true"><use href="#icon-rocket" /></svg>
              Посмотреть проекты
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import AuthorCard from '../components/AuthorCard.vue'
import CurveDivider from '../components/CurveDivider.vue'

export default {
  name: 'AuthorsPage',
  components: {
    AuthorCard,
    CurveDivider
  },
  setup() {
    // Состояние фильтров
    const filters = ref({
      organization: '',
      specialization: '',
      search: ''
    })
    
    // Сортировка
    const sortBy = ref('publications')
    
    // Пагинация
    const currentPage = ref(1)
    const itemsPerPage = ref(6)
    
    // Данные авторов
    const authors = ref([
      {
        id: 1,
        name: 'Иванов Александр Петрович',
        title: 'Ведущий научный сотрудник',
         organization: 'DataLab Research',
         specializations: ['Онтологии', 'Автоматизация', 'Каталоги данных'],
         description: 'Эксперт в области разработки онтологий и корпоративных графов знаний. Автор более 50 публикаций и 10 патентов.',
        contacts: {
         email: 'ivanov@datalab.example',
          phone: '+7 (495) 123-45-67',
          linkedin: 'https://linkedin.com/in/ivanov-ap'
        },
        publications: [
          { id: 1, title: 'Ontology-based approach for automated pipeline design', year: 2024, url: '#' },
          { id: 2, title: 'Semantic integration in oil and gas domain', year: 2023, url: '#' },
          { id: 3, title: 'Knowledge management using ontologies', year: 2022, url: '#' }
        ],
        avatar: null
      },
      {
        id: 2,
        name: 'Петров Владимир Сергеевич',
        title: 'Заведующий лабораторией',
         organization: 'Университет ИТ',
        specializations: ['Семантический веб', 'Машинное обучение', 'Онтологии'],
         description: 'Профессор, специализирующийся на семантических технологиях и их применении в бизнесе и промышленности.',
        contacts: {
          email: 'petrov@gubkin.ru',
          phone: '+7 (495) 987-65-43',
          linkedin: 'https://linkedin.com/in/petrov-vs'
        },
        publications: [
          { id: 4, title: 'Machine learning with ontologies', year: 2024, url: '#' },
          { id: 5, title: 'Semantic web applications', year: 2023, url: '#' }
        ],
        avatar: null
      },
      {
        id: 3,
        name: 'Сидоров Михаил Константинович',
        title: 'Научный сотрудник',
         organization: 'Semantic Systems',
         specializations: ['RDF', 'SPARQL', 'Data Integration'],
         description: 'Специалист по семантическим технологиям и интеграции данных.',
        contacts: {
         email: 'sidorov@semantics.example',
          phone: '+7 (495) 111-22-33',
          linkedin: 'https://linkedin.com/in/sidorov-mk'
        },
        publications: [
          { id: 6, title: 'RDF-based data modeling', year: 2022, url: '#' },
          { id: 7, title: 'SPARQL for operational data', year: 2021, url: '#' }
        ],
        avatar: null
      },
      {
        id: 4,
        name: 'Козлов Дмитрий Александрович',
        title: 'Доцент',
         organization: 'Tech University',
        specializations: ['Управление знаниями', 'Промышленная автоматизация', 'Онтологии'],
         description: 'Исследователь в области управления знаниями и автоматизации с использованием онтологий.',
        contacts: {
          email: 'kozlov@gubkin.ru',
          phone: '+7 (495) 444-55-66',
          linkedin: 'https://linkedin.com/in/kozlov-da'
        },
        publications: [
          { id: 8, title: 'Knowledge management in automation', year: 2023, url: '#' },
          { id: 9, title: 'Industrial ontologies', year: 2022, url: '#' }
        ],
        avatar: null
      },
      {
        id: 5,
        name: 'Новиков Павел Владимирович',
        title: 'Инженер-исследователь',
         organization: 'Industrial Data Lab',
        specializations: ['Жизненный цикл оборудования', 'RDF', 'Моделирование'],
         description: 'Специалист по моделированию жизненного цикла и семантическим технологиям.',
        contacts: {
          email: 'novikov@transneft.ru',
          phone: '+7 (495) 777-88-99',
          linkedin: 'https://linkedin.com/in/novikov-pv'
        },
        publications: [
          { id: 10, title: 'Equipment lifecycle modeling', year: 2022, url: '#' }
        ],
        avatar: null
      },
      {
        id: 6,
        name: 'Морозов Андрей Игоревич',
        title: 'Старший научный сотрудник',
         organization: 'Safety&Risk Institute',
         specializations: ['OWL', 'Стандарты', 'Оценка рисков'],
         description: 'Эксперт по разработке онтологий для стандартов безопасности и оценки рисков.',
        contacts: {
          email: 'morozov@transneft.ru',
          phone: '+7 (495) 333-44-55',
          linkedin: 'https://linkedin.com/in/morozov-ai'
        },
        publications: [
          { id: 11, title: 'OWL ontologies for safety', year: 2022, url: '#' },
          { id: 12, title: 'Risk assessment ontologies', year: 2021, url: '#' }
        ],
        avatar: null
      }
    ])
    
    // Организации
    const organizations = ref([
      {
        name: 'DataLab Research',
        icon: 'factory',
        description: 'Исследовательская лаборатория по онтологиям и графам знаний',
        authorsCount: 4,
        publicationsCount: 25,
        url: '#'
      },
      {
        name: 'Университет ИТ',
        icon: 'university',
        description: 'Университет с сильной школой по семантическим технологиям',
        authorsCount: 2,
        publicationsCount: 15,
        url: '#'
      },
      {
        name: 'Стэнфордский университет',
        icon: 'university',
        description: 'Мировой лидер в области семантических технологий и онтологий',
        authorsCount: 8,
        publicationsCount: 45,
        url: 'https://stanford.edu'
      },
      {
        name: 'MIT',
        icon: 'university',
        description: 'Центр инноваций в области ИИ и семантических технологий',
        authorsCount: 6,
        publicationsCount: 32,
        url: 'https://mit.edu'
      }
    ])
    
    // Фильтрация авторов
    const filteredAuthors = computed(() => {
      return authors.value.filter(author => {
        // Фильтр по организации
        if (filters.value.organization && author.organization !== filters.value.organization) {
          return false
        }
        
        // Фильтр по специализации
        if (filters.value.specialization && !author.specializations.includes(filters.value.specialization)) {
          return false
        }
        
        // Фильтр по поиску
        if (filters.value.search) {
          const searchLower = filters.value.search.toLowerCase()
          const nameMatch = author.name.toLowerCase().includes(searchLower)
          const orgMatch = author.organization.toLowerCase().includes(searchLower)
          const specMatch = author.specializations.some(spec => 
            spec.toLowerCase().includes(searchLower)
          )
          if (!nameMatch && !orgMatch && !specMatch) {
            return false
          }
        }
        
        return true
      })
    })
    
    // Сортировка
    const sortedAuthors = computed(() => {
      const sorted = [...filteredAuthors.value]
      
      switch (sortBy.value) {
        case 'publications':
          return sorted.sort((a, b) => b.publications.length - a.publications.length)
        case 'name':
          return sorted.sort((a, b) => a.name.localeCompare(b.name))
        case 'organization':
          return sorted.sort((a, b) => a.organization.localeCompare(b.organization))
        case 'experience':
          // Сортируем по количеству публикаций как показатель опыта
          return sorted.sort((a, b) => b.publications.length - a.publications.length)
        default:
          return sorted
      }
    })
    
    // Пагинация
    const totalPages = computed(() => {
      return Math.ceil(sortedAuthors.value.length / itemsPerPage.value)
    })
    
    const paginatedAuthors = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage.value
      const end = start + itemsPerPage.value
      return sortedAuthors.value.slice(start, end)
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
    const totalAuthors = computed(() => authors.value.length)
    
    const uniqueOrganizations = computed(() => {
      const orgs = new Set(authors.value.map(a => a.organization))
      return orgs.size
    })
    
    const averagePublications = computed(() => {
      const total = authors.value.reduce((sum, author) => sum + author.publications.length, 0)
      return Math.round(total / authors.value.length)
    })
    
    const countriesCount = computed(() => {
      // Упрощенная логика - считаем только Россию и США
      const countries = new Set()
      authors.value.forEach(author => {
        if (author.organization.includes('Транснефть') || author.organization.includes('Губкинский')) {
          countries.add('Россия')
        } else {
          countries.add('США')
        }
      })
      return countries.size
    })
    
    // Методы
    const clearFilters = () => {
      filters.value = {
        organization: '',
        specialization: '',
        search: ''
      }
      currentPage.value = 1
    }
    
    const showContactForm = () => {
      alert('Форма связи будет добавлена в следующей версии!')
    }
    
    const getOrganizationIconId = (org) => {
      const map = {
        factory: '#icon-building',
        university: '#icon-book'
      }
      return map[org.icon] || '#icon-building'
    }
    
    return {
      filters,
      sortBy,
      currentPage,
      filteredAuthors: paginatedAuthors,
      totalPages,
      visiblePages,
      organizations,
      totalAuthors,
      uniqueOrganizations,
      averagePublications,
      countriesCount,
      clearFilters,
      showContactForm,
      getOrganizationIconId
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

/* Статистика */
.stats-section {
  padding: 4rem 0;
  background: var(--bg-secondary);
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

/* Авторы */
.authors-section {
  padding: 4rem 0;
}

.authors-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.authors-header h2 {
  color: var(--primary-color);
  margin: 0;
}

.sort-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.sort-controls label {
  font-weight: 600;
  color: var(--text-primary);
  font-size: 0.875rem;
}

.sort-select {
  padding: 0.5rem;
  border: 1px solid var(--text-light);
  border-radius: var(--radius-md);
  background: var(--bg-primary);
  font-size: 0.875rem;
}

.authors-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
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

/* Организации */
.organizations-section {
  background: var(--bg-secondary);
  padding: 4rem 0;
}

.organizations-section h2 {
  text-align: center;
  color: var(--primary-color);
  margin-bottom: 3rem;
}

.organizations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.organization-card {
  background: var(--bg-primary);
  padding: 2rem;
  border-radius: var(--radius-lg);
  text-align: center;
  box-shadow: var(--shadow-md);
}

.org-logo {
  margin-bottom: 1rem;
}

.org-icon {
  font-size: 4rem;
  display: block;
}

.organization-card h3 {
  color: var(--primary-color);
  margin-bottom: 1rem;
}

.org-description {
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
}

.org-stats {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 1.5rem;
}

.org-stat {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.stat-label {
  color: var(--text-secondary);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stat-value {
  color: var(--text-primary);
  font-weight: 600;
  font-size: 1.125rem;
}

/* CTA секция */
.cta-section {
  background: radial-gradient(600px 400px at 12% 20%, rgba(255,47,109,0.35), transparent 60%),
              linear-gradient(135deg, #2a0b3b, #0a0d1f 70%);
  color: white;
  padding: 4rem 0;
  text-align: center;
}

.icon-btn .icon {
  margin-right: 0.5rem;
  vertical-align: -3px;
}

/* Контакты экспертов */
.experts-contacts-section {
  padding: 4rem 0;
}

.experts-contacts-section h2 {
  text-align: center;
  color: var(--primary-color);
  margin-bottom: 2rem;
}

.experts-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
}

.expert-item {
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
  padding: 1.25rem 1.5rem;
  box-shadow: var(--shadow-md);
}

.expert-name {
  font-weight: 700;
  color: var(--text-primary);
}

.expert-role {
  color: var(--text-secondary);
  margin: 0.25rem 0 0.5rem;
  font-size: 0.9rem;
}

.expert-contact {
  color: var(--primary-color);
  text-decoration: none;
}

.expert-contact:hover {
  color: var(--secondary-color);
}

.cta-content h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.cta-content p {
  font-size: 1.125rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.cta-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
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
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .authors-header {
    flex-direction: column;
    align-items: stretch;
  }
  
  .authors-grid {
    grid-template-columns: 1fr;
  }
  
  .pagination {
    flex-direction: column;
    gap: 1rem;
  }
  
  .organizations-grid {
    grid-template-columns: 1fr;
  }
  
  .org-stats {
    flex-direction: column;
    gap: 1rem;
  }
  
  .cta-actions {
    flex-direction: column;
    align-items: center;
  }
}
</style> 