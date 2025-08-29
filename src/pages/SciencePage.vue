<template>
  <div class="science-page">
    <!-- Hero секция -->
    <section class="hero-section">
      <div class="container">
        <h1 class="hero-title">Научные публикации</h1>
        <p class="hero-subtitle">
          Исследования в области онтологий, графов знаний и семантических технологий
        </p>
      </div>
    </section>

    <!-- Основной контент -->
    <section class="content-section">
      <div class="container">
        <!-- Фильтры -->
        <PublicationFilters
          v-model="filters"
          :publications="allPublications"
          @filter-change="handleFilterChange"
        />

        <!-- Статистика -->
        <PublicationStats
          :publications="filteredPublications"
          :show-chart="true"
          :show-top-venues="true"
          :show-trends="true"
          @year-click="handleYearClick"
          @venue-click="handleVenueClick"
          @tag-click="handleTagClick"
        />

        <!-- Популярные журналы (P1) -->
        <div class="popular-journals" v-if="showPopularJournals">
          <h3 class="journals-title">Популярные журналы</h3>
          <div class="journals-list">
            <button
              v-for="journal in popularJournals"
              :key="journal.name"
              class="journal-badge"
              @click="filterByVenue(journal.name)"
              :title="`${journal.count} публикаций в ${journal.name}`"
            >
              <span class="journal-name">{{ journal.name }}</span>
              <span class="journal-count">{{ journal.count }}</span>
            </button>
          </div>
        </div>

        <!-- Список публикаций -->
        <div class="publications-content">
          <div class="publications-header">
            <h2>Публикации</h2>
            <div class="view-controls">
              <button
                class="view-btn"
                :class="{ active: viewMode === 'grid' }"
                @click="viewMode = 'grid'"
                aria-label="Сетка"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="3" width="7" height="7"/>
                  <rect x="14" y="3" width="7" height="7"/>
                  <rect x="3" y="14" width="7" height="7"/>
                  <rect x="14" y="14" width="7" height="7"/>
                </svg>
              </button>
              <button
                class="view-btn"
                :class="{ active: viewMode === 'list' }"
                @click="viewMode = 'list'"
                aria-label="Список"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="8" y1="6" x2="21" y2="6"/>
                  <line x1="8" y1="12" x2="21" y2="12"/>
                  <line x1="8" y1="18" x2="21" y2="18"/>
                  <line x1="3" y1="6" x2="3.01" y2="6"/>
                  <line x1="3" y1="12" x2="3.01" y2="12"/>
                  <line x1="3" y1="18" x2="3.01" y2="18"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Пустое состояние -->
          <div v-if="!filteredPublications.length" class="empty-state">
            <div class="empty-icon">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
            </div>
            <h3>По выбранным фильтрам ничего не найдено</h3>
            <p>Попробуйте изменить параметры поиска или сбросить фильтры</p>
            <button @click="resetFilters" class="btn btn-primary">
              Сбросить фильтры
            </button>
          </div>

          <!-- Сетка публикаций -->
          <div 
            v-else
            class="publications-grid"
            :class="{ 'list-view': viewMode === 'list' }"
          >
            <PublicationCard
              v-for="publication in displayedPublications"
              :key="publication.id"
              :publication="publication"
              :compact="viewMode === 'list'"
              @tag-click="handleTagClick"
              @article-click="handleArticleClick"
            />
          </div>

          <!-- Пагинация -->
          <div v-if="hasMorePublications" class="pagination">
            <button
              @click="loadMore"
              class="btn btn-secondary load-more-btn"
              :disabled="loading"
            >
              {{ loading ? 'Загрузка...' : `Показать ещё (${remainingCount})` }}
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import PublicationCard from '../components/PublicationCard.vue'
import PublicationFilters from '../components/PublicationFilters.vue'
import PublicationStats from '../components/PublicationStats.vue'
import { publications } from '../data/publications.js'

export default {
  name: 'SciencePage',
  components: {
    PublicationCard,
    PublicationFilters,
    PublicationStats
  },
  setup() {
    const route = useRoute()
    const router = useRouter()

    // Состояние
    const allPublications = ref(publications)
    const viewMode = ref('grid')
    const loading = ref(false)
    const itemsPerPage = 12
    const currentPage = ref(1)

    // Фильтры из URL или по умолчанию
    const filters = ref({
      types: route.query.types ? route.query.types.split(',') : [],
      years: route.query.years ? route.query.years.split(',').map(Number) : [],
      venue: route.query.venue || '',
      tags: route.query.tags ? route.query.tags.split(',') : [],
      search: route.query.search || '',
      sort: route.query.sort || 'year-desc'
    })

    // Вычисляемые свойства
    const filteredPublications = computed(() => {
      let result = [...allPublications.value]

      // Фильтр по типу
      if (filters.value.types.length) {
        result = result.filter(pub => filters.value.types.includes(pub.type))
      }

      // Фильтр по году
      if (filters.value.years.length) {
        result = result.filter(pub => filters.value.years.includes(pub.year))
      }

      // Фильтр по площадке
      if (filters.value.venue) {
        result = result.filter(pub => pub.venue === filters.value.venue)
      }

      // Фильтр по тегам
      if (filters.value.tags.length) {
        result = result.filter(pub => 
          pub.tags && filters.value.tags.some(tag => pub.tags.includes(tag))
        )
      }

      // Поиск по названию
      if (filters.value.search) {
        const searchLower = filters.value.search.toLowerCase()
        result = result.filter(pub => 
          pub.title.toLowerCase().includes(searchLower) ||
          pub.authors?.some(author => 
            typeof author === 'string' 
              ? author.toLowerCase().includes(searchLower)
              : author.name?.toLowerCase().includes(searchLower)
          )
        )
      }

      // Сортировка
      switch (filters.value.sort) {
        case 'year-desc':
          result.sort((a, b) => b.year - a.year)
          break
        case 'year-asc':
          result.sort((a, b) => a.year - b.year)
          break
        case 'venue':
          result.sort((a, b) => a.venue.localeCompare(b.venue))
          break
        case 'type':
          result.sort((a, b) => a.type.localeCompare(b.type))
          break
      }

      return result
    })

    const displayedPublications = computed(() => {
      const endIndex = currentPage.value * itemsPerPage
      return filteredPublications.value.slice(0, endIndex)
    })

    const hasMorePublications = computed(() => {
      return displayedPublications.value.length < filteredPublications.value.length
    })

    const remainingCount = computed(() => {
      return filteredPublications.value.length - displayedPublications.value.length
    })

    const popularJournals = computed(() => {
      const venueCounts = {}
      allPublications.value.forEach(pub => {
        if (pub.venue) {
          venueCounts[pub.venue] = (venueCounts[pub.venue] || 0) + 1
        }
      })

      return Object.entries(venueCounts)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 6)
    })

    const showPopularJournals = computed(() => {
      return popularJournals.value.length > 0
    })

    // Методы
    const updateURL = () => {
      const query = {}
      
      if (filters.value.types.length) query.types = filters.value.types.join(',')
      if (filters.value.years.length) query.years = filters.value.years.join(',')
      if (filters.value.venue) query.venue = filters.value.venue
      if (filters.value.tags.length) query.tags = filters.value.tags.join(',')
      if (filters.value.search) query.search = filters.value.search
      if (filters.value.sort !== 'year-desc') query.sort = filters.value.sort

      router.replace({ query })
    }

    const handleFilterChange = () => {
      currentPage.value = 1
      updateURL()
    }

    const handleYearClick = (year) => {
      if (!filters.value.years.includes(year)) {
        filters.value.years.push(year)
        handleFilterChange()
      }
    }

    const handleVenueClick = (venue) => {
      filters.value.venue = venue
      handleFilterChange()
    }

    const handleTagClick = (tag) => {
      if (!filters.value.tags.includes(tag)) {
        filters.value.tags.push(tag)
        handleFilterChange()
      }
    }

    const filterByVenue = (venue) => {
      filters.value.venue = venue
      handleFilterChange()
    }

    const resetFilters = () => {
      filters.value = {
        types: [],
        years: [],
        venue: '',
        tags: [],
        search: '',
        sort: 'year-desc'
      }
      currentPage.value = 1
      updateURL()
    }

    const loadMore = () => {
      loading.value = true
      // Симуляция загрузки
      setTimeout(() => {
        currentPage.value++
        loading.value = false
      }, 300)
    }

    const handleArticleClick = (publication) => {
      // Открываем страницу публикации внутри сайта
      router.push(`/publications/${publication.slug}`)
    }

    // Наблюдение за изменениями URL
    watch(() => route.query, (newQuery) => {
      filters.value = {
        types: newQuery.types ? newQuery.types.split(',') : [],
        years: newQuery.years ? newQuery.years.split(',').map(Number) : [],
        venue: newQuery.venue || '',
        tags: newQuery.tags ? newQuery.tags.split(',') : [],
        search: newQuery.search || '',
        sort: newQuery.sort || 'year-desc'
      }
      currentPage.value = 1
    }, { deep: true })

    onMounted(() => {
      // Обновление заголовка страницы
      document.title = 'Научные публикации - Ontology.ru'
    })

    return {
      allPublications,
      filteredPublications,
      displayedPublications,
      hasMorePublications,
      remainingCount,
      popularJournals,
      showPopularJournals,
      filters,
      viewMode,
      loading,
      handleFilterChange,
      handleYearClick,
      handleVenueClick,
      handleTagClick,
      filterByVenue,
      resetFilters,
      loadMore,
      handleArticleClick
    }
  }
}
</script>

<style scoped>
/* Hero секция */
.hero-section {
  background: var(--gradient-primary);
  color: white;
  padding: 4rem 0;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 80%, rgba(102, 126, 234, 0.2) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(118, 75, 162, 0.2) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(120, 119, 198, 0.1) 0%, transparent 50%);
  pointer-events: none;
}

.hero-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.2;
  position: relative;
  z-index: 1;
}

.hero-subtitle {
  font-size: 1.25rem;
  max-width: 600px;
  margin: 0 auto;
  opacity: 0.9;
  line-height: 1.5;
  position: relative;
  z-index: 1;
}

/* Контент */
.content-section {
  padding: 3rem 0;
  background: var(--bg-primary);
  min-height: 80vh;
  position: relative;
  overflow: hidden;
}

.content-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 70% 10%, rgba(102, 126, 234, 0.03) 0%, transparent 40%),
    radial-gradient(circle at 30% 60%, rgba(118, 75, 162, 0.02) 0%, transparent 40%),
    radial-gradient(circle at 90% 90%, rgba(120, 119, 198, 0.025) 0%, transparent 40%);
  pointer-events: none;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  position: relative;
  z-index: 1;
}

/* Популярные журналы */
.popular-journals {
  background: var(--gradient-glass);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: var(--shadow-md);
}

.journals-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1rem;
  text-align: center;
}

.journals-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.journal-badge {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  background: rgba(102, 126, 234, 0.1);
  border: 1px solid rgba(102, 126, 234, 0.2);
  border-radius: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  color: inherit;
  min-height: 44px;
}

.journal-badge:hover {
  background: rgba(102, 126, 234, 0.2);
  border-color: rgba(102, 126, 234, 0.4);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
}

.journal-name {
  font-weight: 500;
  color: var(--text-primary);
  font-size: 0.875rem;
}

.journal-count {
  background: #667eea;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
}

/* Контент публикаций */
.publications-content {
  background: var(--gradient-glass);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: var(--radius-lg);
  padding: 2rem;
  box-shadow: var(--shadow-md);
}

.publications-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.publications-header h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
}

.view-controls {
  display: flex;
  gap: 0.5rem;
  background: rgba(107, 114, 128, 0.1);
  padding: 0.25rem;
  border-radius: 8px;
}

.view-btn {
  padding: 0.5rem;
  background: none;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  color: var(--text-secondary);
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 44px;
  min-height: 44px;
}

.view-btn:hover {
  background: rgba(255, 255, 255, 0.5);
  color: var(--text-primary);
}

.view-btn.active {
  background: var(--gradient-glass);
  color: var(--primary-color);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* Пустое состояние */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: var(--text-secondary);
}

.empty-icon {
  margin-bottom: 1.5rem;
  opacity: 0.5;
}

.empty-state h3 {
  font-size: 1.25rem;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.empty-state p {
  margin-bottom: 2rem;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}

/* Сетка публикаций */
.publications-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 2rem;
}

.publications-grid.list-view {
  grid-template-columns: 1fr;
  gap: 1rem;
}

/* Пагинация */
.pagination {
  text-align: center;
  margin-top: 3rem;
}

.load-more-btn {
  min-width: 200px;
}

.load-more-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Кнопки */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  min-height: 44px;
}

.btn-primary {
  background: #667eea;
  color: white;
}

.btn-primary:hover {
  background: #5a67d8;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.btn-secondary {
  background: transparent;
  color: var(--primary-color);
  border: 2px solid #667eea;
}

.btn-secondary:hover {
  background: #667eea;
  color: white;
  transform: translateY(-2px);
}

/* Адаптивность */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 1.125rem;
  }
  
  .content-section {
    padding: 2rem 0;
  }
  
  .publications-content {
    padding: 1.5rem;
  }
  
  .publications-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .publications-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .journals-list {
    flex-direction: column;
    align-items: center;
  }
  
  .journal-badge {
    width: 100%;
    max-width: 300px;
    justify-content: space-between;
  }
}

/* Поддержка prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  .journal-badge,
  .view-btn,
  .btn {
    transition: none;
  }
  
  .journal-badge:hover,
  .btn:hover {
    transform: none;
  }
}

/* Высокий контраст */
@media (prefers-contrast: high) {
  .popular-journals,
  .publications-content {
    border-width: 2px;
    border-color: var(--text-primary);
  }
  
  .journals-title,
  .publications-header h2 {
    font-weight: 800;
  }
}
</style>