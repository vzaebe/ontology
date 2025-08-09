<template>
  <div class="resources-page">
    <CurveDivider />
    <!-- Заголовок страницы -->
    <section class="page-header">
      <div class="container">
          <h1>Полезные ссылки</h1>
        <p class="page-subtitle">
          Инструменты, руководства и примеры по онтологиям и графам знаний
        </p>
      </div>
    </section>

    <!-- Фильтры -->
    <section class="filters-section">
      <div class="container">
        <div class="filters">
          <div class="filter-group">
            <label for="type-filter">Тип ресурса:</label>
            <select 
              id="type-filter" 
              v-model="filters.type"
              class="filter-select"
            >
              <option value="">Все типы</option>
              <option value="software">Программное обеспечение</option>
              <option value="manual">Методички</option>
              <option value="article">Статьи</option>
              <option value="video">Видео</option>
              
              <option value="book">Книги</option>
              <option value="dataset">Наборы данных</option>
              <option value="tool">Инструменты</option>
              <option value="framework">Фреймворки</option>
              <option value="library">Библиотеки</option>
            </select>
          </div>
          
          <div class="filter-group">
            <label for="language-filter">Язык:</label>
            <select 
              id="language-filter" 
              v-model="filters.language"
              class="filter-select"
            >
              <option value="">Все языки</option>
              <option value="ru">Русский</option>
              <option value="en">Английский</option>
              <option value="de">Немецкий</option>
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

    <!-- Категории ресурсов -->
    <section class="categories-section">
      <div class="container">
            <h2 id="standards">Категории ресурсов
              <CitationBadge :to="'/science#publications'" title="Публикации и стандарты" />
            </h2>
        <div class="categories-grid">
          <div 
            v-for="category in categories" 
            :key="category.type"
            class="category-card"
            @click="selectCategory(category.type)"
            :class="{ 'active': filters.type === category.type }"
          >
            <div class="category-icon" aria-hidden="true">
              <svg class="icon" width="24" height="24">
                <use :href="getCategoryIconId(category.type)" />
              </svg>
            </div>
            <h3>{{ category.name }}</h3>
            <p>{{ category.description }}</p>
            <div class="category-count">{{ getCategoryCount(category.type) }} ресурсов</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Список ресурсов -->
    <section class="resources-section">
      <div class="container">
        <div class="resources-header">
          <h2>Найдено ресурсов: {{ filteredResources.length }}</h2>
          <div class="sort-controls">
            <label for="sort-select">Сортировка:</label>
            <select 
              id="sort-select" 
              v-model="sortBy"
              class="sort-select"
            >
              <option value="rating">По рейтингу</option>
              <option value="year">По году</option>
              <option value="title">По названию</option>
            </select>
          </div>
        </div>
        
        <div class="resources-grid">
          <ResourceCard 
            v-for="resource in sortedResources" 
            :key="resource.id"
            :resource="resource"
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

    <!-- Рекомендуемые ресурсы -->
    <section class="recommended-section">
      <div class="container">
        <h2>Рекомендуемые ресурсы</h2>
        <div class="recommended-grid">
          <div 
            v-for="resource in recommendedResources" 
            :key="resource.id"
            class="recommended-card"
          >
            <div class="recommended-icon">
              <svg class="icon" width="24" height="24" aria-hidden="true">
                <use :href="getRecommendedIconId(resource.type)" />
              </svg>
            </div>
            <h3>{{ resource.title }}</h3>
            <p>{{ resource.description }}</p>
            <div class="recommended-rating">
              <span class="stars">
                <span 
                  v-for="star in 5" 
                  :key="star"
                  class="star"
                  :class="{ 'filled': star <= resource.rating }"
                >
                  ⭐
                </span>
              </span>
              <span class="rating-text">{{ resource.rating }}/5</span>
            </div>
            <a :href="resource.url" target="_blank" rel="noopener" class="btn btn-primary">
              Открыть
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { tools as cmsTools } from '../data/tools.js'
import { standards as cmsStandards } from '../data/standards.js'
import ResourceCard from '../components/ResourceCard.vue'
import CurveDivider from '../components/CurveDivider.vue'
import CitationBadge from '../components/CitationBadge.vue'

export default {
  name: 'ResourcesPage',
  components: {
    ResourceCard,
    CurveDivider,
    CitationBadge
  },
  setup() {
    // Состояние фильтров
    const filters = ref({
      type: '',
      language: '',
      search: ''
    })
    
    // Сортировка
    const sortBy = ref('rating')
    
    // Пагинация
    const currentPage = ref(1)
    const itemsPerPage = ref(9)
    
    // Категории ресурсов
    const categories = ref([
      {
        type: 'software',
        name: 'Программное обеспечение',
        description: 'Редакторы онтологий и специализированные программы',
        icon: '💻'
      },
      {
        type: 'manual',
        name: 'Методички',
        description: 'Руководства и инструкции по работе с онтологиями',
        icon: '📖'
      },
      {
        type: 'book',
        name: 'Книги',
        description: 'Учебники и научная литература',
        icon: '📚'
      },
      {
        type: 'video',
        name: 'Видео',
        description: 'Видеолекции и презентации',
        icon: '🎥'
      },
      {
        type: 'tool',
        name: 'Инструменты',
        description: 'Утилиты и вспомогательные инструменты',
        icon: '🔧'
      },
      {
        type: 'standard',
        name: 'Стандарты',
        description: 'ГОСТ и международные стандарты',
        icon: '📐'
      },
      {
        type: 'demo',
        name: 'Демо',
        description: 'Демо-модели и примеры',
        icon: '🧪'
      }
    ])
    
    // Данные ресурсов
    const resources = ref([
      {
        id: 1,
        title: 'Protégé',
        description: 'Самый популярный редактор онтологий от Стэнфордского университета',
        type: 'software',
        url: 'https://protege.stanford.edu/',
        author: 'Stanford University',
        year: 2024,
        language: 'en',
        rating: 5,
        tags: ['OWL', 'RDF', 'Редактор'],
        extra: {
          fileSize: '150 MB',
          pages: null,
          duration: null
        }
      },
      {
        id: 2,
        title: 'Методичка по созданию онтологий',
        description: 'Подробное руководство по разработке онтологий для нефтегазовой отрасли',
        type: 'manual',
        url: 'https://example.com/manual.pdf',
        author: 'НИИ Транснефть',
        year: 2023,
        language: 'ru',
        rating: 4,
        tags: ['Методика', 'Нефтегаз', 'Руководство'],
        extra: {
          fileSize: '5 MB',
          pages: 120,
          duration: null
        }
      },
      
      {
        id: 4,
        title: 'GraphDB',
        description: 'Графовая база данных для работы с RDF и онтологиями',
        type: 'software',
        url: 'https://www.ontotext.com/products/graphdb/',
        author: 'Ontotext',
        year: 2024,
        language: 'en',
        rating: 5,
        tags: ['База данных', 'RDF', 'SPARQL'],
        extra: {
          fileSize: '500 MB',
          pages: null,
          duration: null
        }
      },
      {
        id: 5,
        title: 'OWL API',
        description: 'Java API для работы с OWL онтологиями',
        type: 'library',
        url: 'https://github.com/owlcs/owlapi',
        author: 'OWL API Team',
        year: 2024,
        language: 'en',
        rating: 4,
        tags: ['Java', 'API', 'OWL'],
        extra: {
          fileSize: '2 MB',
          pages: null,
          duration: null
        }
      },
      {
        id: 6,
        title: 'Видеокурс по SPARQL',
        description: 'Подробный курс по языку запросов SPARQL',
        type: 'video',
        url: 'https://youtube.com/sparql-course',
        author: 'Semantic Web Academy',
        year: 2023,
        language: 'en',
        rating: 4,
        tags: ['SPARQL', 'Видео', 'Запросы'],
        extra: {
          fileSize: null,
          pages: null,
          duration: '3 часа'
        }
      },
      {
        id: 7,
        title: 'Книга "Semantic Web Primer"',
        description: 'Классическая книга по семантическому вебу',
        type: 'book',
        url: 'https://mitpress.mit.edu/semantic-web-primer',
        author: 'Grigoris Antoniou',
        year: 2012,
        language: 'en',
        rating: 5,
        tags: ['Книга', 'Семантический веб', 'Основы'],
        extra: {
          fileSize: '10 MB',
          pages: 300,
          duration: null
        }
      },
      {
        id: 8,
        title: 'TopBraid Composer',
        description: 'Профессиональный редактор онтологий',
        type: 'software',
        url: 'https://www.topquadrant.com/topbraid-composer/',
        author: 'TopQuadrant',
        year: 2024,
        language: 'en',
        rating: 4,
        tags: ['Редактор', 'OWL', 'Профессиональный'],
        extra: {
          fileSize: '200 MB',
          pages: null,
          duration: null
        }
      },
      {
        id: 9,
        title: 'Инструмент для валидации онтологий',
        description: 'Утилита для проверки корректности онтологий',
        type: 'tool',
        url: 'https://github.com/ontology-validator',
        author: 'Open Source',
        year: 2023,
        language: 'en',
        rating: 3,
        tags: ['Валидация', 'Инструмент', 'Проверка'],
        extra: {
          fileSize: '1 MB',
          pages: null,
          duration: null
        }
      }
    ])

    // Добавочные карточки по ТЗ (инструменты/стандарты), не ломая фильтры
    const additiveResources = [
      ...cmsTools.map((t, idx) => ({
        id: 1000 + idx,
        title: t.name,
        description: t.kind === 'editor' ? 'Редактор онтологий' : t.kind === 'lib' ? 'Библиотека для работы с онтологиями' : 'Спецификации W3C',
        type: t.kind === 'editor' ? 'software' : t.kind === 'lib' ? 'library' : 'tool',
        url: t.link,
        author: '—',
        year: 2024,
        language: 'en',
        rating: 5,
        tags: ['OWL', 'RDF'],
        extra: { fileSize: null, pages: null, duration: null }
      })),
      ...cmsStandards.map((s, idx) => ({
        id: 1100 + idx,
        title: `${s.code}`,
        description: `${s.title} (${s.year})`,
        type: 'standard',
        url: s.link || '#',
        author: 'ГОСТ',
        year: s.year,
        language: 'ru',
        rating: 5,
        tags: ['Стандарт'],
        extra: { fileSize: null, pages: null, duration: null }
      }))
    ]

    resources.value = [...resources.value, ...additiveResources]
    
    // Фильтрация ресурсов
    const filteredResources = computed(() => {
      return resources.value.filter(resource => {
        // Фильтр по типу
        if (filters.value.type && resource.type !== filters.value.type) {
          return false
        }
        
        // Фильтр по языку
        if (filters.value.language && resource.language !== filters.value.language) {
          return false
        }
        
        // Фильтр по поиску
        if (filters.value.search) {
          const searchLower = filters.value.search.toLowerCase()
          const titleMatch = resource.title.toLowerCase().includes(searchLower)
          const descMatch = resource.description.toLowerCase().includes(searchLower)
          const tagsMatch = resource.tags.some(tag => 
            tag.toLowerCase().includes(searchLower)
          )
          if (!titleMatch && !descMatch && !tagsMatch) {
            return false
          }
        }
        
        return true
      })
    })
    
    // Сортировка
    const sortedResources = computed(() => {
      const sorted = [...filteredResources.value]
      
      switch (sortBy.value) {
        case 'rating':
          return sorted.sort((a, b) => b.rating - a.rating)
        case 'year':
          return sorted.sort((a, b) => b.year - a.year)
        case 'title':
          return sorted.sort((a, b) => a.title.localeCompare(b.title))
        default:
          return sorted
      }
    })
    
    // Пагинация
    const totalPages = computed(() => {
      return Math.ceil(sortedResources.value.length / itemsPerPage.value)
    })
    
    const paginatedResources = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage.value
      const end = start + itemsPerPage.value
      return sortedResources.value.slice(start, end)
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
    
    // Рекомендуемые ресурсы (топ по рейтингу)
    const recommendedResources = computed(() => {
      return resources.value
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 3)
    })
    
    // Методы
    const getCategoryCount = (type) => {
      return resources.value.filter(r => r.type === type).length
    }
    
    const selectCategory = (type) => {
      filters.value.type = filters.value.type === type ? '' : type
      currentPage.value = 1
    }
    
    const clearFilters = () => {
      filters.value = {
        type: '',
        language: '',
        search: ''
      }
      currentPage.value = 1
    }
    
    const getResourceIcon = (type) => {
      const iconMap = {
        'software': '💻',
        'manual': '📖',
        'article': '📄',
        'video': '🎥',
        'book': '📚',
        'dataset': '📊',
        'tool': '🔧',
        'framework': '⚙️',
        'library': '📦'
      }
      return iconMap[type] || '🔗'
    }

    const getRecommendedIconId = (type) => {
      const map = {
        'software': '#icon-laptop',
        'manual': '#icon-book',
        'article': '#icon-file',
        'video': '#icon-video',
        'book': '#icon-book',
        'dataset': '#icon-database',
        'tool': '#icon-tool',
        'framework': '#icon-box',
        'library': '#icon-box'
      }
      return map[type] || '#icon-link'
    }

    const getCategoryIconId = (type) => {
      const map = {
        'software': '#icon-laptop',
        'manual': '#icon-book',
        'course': '#icon-book',
        'book': '#icon-book',
        'video': '#icon-video',
        'tool': '#icon-tool',
        'dataset': '#icon-database',
        'framework': '#icon-box',
        'library': '#icon-box',
        'standard': '#icon-book',
        'demo': '#icon-rocket'
      }
      return map[type] || '#icon-link'
    }

    onMounted(() => {
      const hash = window.location.hash?.replace('#', '')
      const allowed = ['standard', 'tool', 'demo', 'software', 'manual', 'book', 'video', 'dataset', 'framework', 'library']
      if (hash && allowed.includes(hash)) {
        filters.value.type = hash
        const el = document.getElementById('standards')
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }
    })
    
    return {
      filters,
      sortBy,
      currentPage,
      categories,
      filteredResources: paginatedResources,
      totalPages,
      visiblePages,
      recommendedResources,
      getCategoryCount,
      selectCategory,
      clearFilters,
      getResourceIcon,
      getRecommendedIconId,
      getCategoryIconId
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

/* Категории */
.categories-section {
  padding: 4rem 0;
  background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.0)), var(--bg-secondary);
}

.categories-section h2 {
  text-align: center;
  color: var(--primary-color);
  margin-bottom: 3rem;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.category-card {
  background: var(--bg-primary);
  padding: 2rem;
  border-radius: var(--radius-lg);
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: var(--shadow-md);
  border: 2px solid transparent;
}

.category-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.category-card.active {
  border-color: var(--primary-color);
  background: var(--primary-color);
  color: white;
}

.category-card.active h3,
.category-card.active p,
.category-card.active .category-count {
  color: white;
}

.category-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.category-card h3 {
  color: var(--primary-color);
  margin-bottom: 1rem;
}

.category-card p {
  color: var(--text-secondary);
  margin-bottom: 1rem;
  font-size: 0.875rem;
}

.category-count {
  color: var(--text-light);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Ресурсы */
.resources-section {
  padding: 4rem 0;
}

.resources-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.resources-header h2 {
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

.resources-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
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

/* Рекомендуемые */
.recommended-section {
  background: var(--bg-secondary);
  padding: 4rem 0;
}

.recommended-section h2 {
  text-align: center;
  color: var(--primary-color);
  margin-bottom: 3rem;
}

.recommended-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.recommended-card {
  background: var(--bg-primary);
  padding: 2rem;
  border-radius: var(--radius-lg);
  text-align: center;
  box-shadow: var(--shadow-md);
  transition: transform 0.3s ease;
}

.recommended-card:hover {
  transform: translateY(-5px);
}

.recommended-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.recommended-card h3 {
  color: var(--primary-color);
  margin-bottom: 1rem;
}

.recommended-card p {
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}

.recommended-rating {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.stars {
  display: flex;
  gap: 0.25rem;
}

.star {
  font-size: 1.25rem;
  opacity: 0.3;
  transition: opacity 0.2s ease;
}

.star.filled {
  opacity: 1;
}

.rating-text {
  color: var(--text-secondary);
  font-weight: 600;
  font-size: 0.875rem;
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
  
  .categories-grid {
    grid-template-columns: 1fr;
  }
  
  .resources-header {
    flex-direction: column;
    align-items: stretch;
  }
  
  .resources-grid {
    grid-template-columns: 1fr;
  }
  
  .pagination {
    flex-direction: column;
    gap: 1rem;
  }
  
  .recommended-grid {
    grid-template-columns: 1fr;
  }
}
</style> 