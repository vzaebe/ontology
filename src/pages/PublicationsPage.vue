<template>
  <div class="publications-page">
    <!-- Заголовок страницы -->
    <div class="page-header">
      <div class="container">
        <h1 class="page-title">Публикации</h1>
        <p class="page-subtitle">
          Научные статьи, конференции и исследования по онтологиям и графам знаний
        </p>
      </div>
    </div>

    <!-- Основной контент -->
    <div class="container">
      <div class="publications-layout">
        <!-- Фильтры и статистика -->
        <div class="publications-sidebar">
          <PublicationFilters
            :filters="publicationFilters"
            :publications="publications"
            @filter-change="handleFilterChange"
            @year-click="handleYearClick"
            @venue-click="handleVenueClick"
            @tag-click="handleTagClick"
          />
          
          <PublicationStats
            :publications="filteredPublications"
            @year-click="handleYearClick"
            @venue-click="handleVenueClick"
          />
        </div>

        <!-- Список публикаций -->
        <div class="publications-main">
          <!-- Строка результатов -->
          <div class="publications-toolbar">
            <div class="results-info">
              <span class="results-count">
                Найдено: {{ filteredPublications.length }}
              </span>
              <span v-if="hasActiveFilters" class="active-filters-info">
                (применены фильтры)
              </span>
            </div>

            <!-- Активные фильтры -->
            <div v-if="hasActiveFilters" class="active-filters">
              <div class="filter-chips">
                <span 
                  v-if="publicationFilters.search" 
                  class="filter-chip"
                  @click="clearSearchFilter"
                >
                  Поиск: "{{ publicationFilters.search }}"
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </span>

                <span 
                  v-for="type in publicationFilters.types" 
                  :key="type"
                  class="filter-chip"
                  @click="removeTypeFilter(type)"
                >
                  {{ getTypeLabel(type) }}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </span>

                <span 
                  v-for="tag in publicationFilters.tags" 
                  :key="tag"
                  class="filter-chip"
                  @click="removeTagFilter(tag)"
                >
                  {{ tag }}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </span>

                <button class="clear-all-filters" @click="clearAllFilters">
                  Очистить все фильтры
                </button>
              </div>
            </div>
          </div>

          <!-- Сетка публикаций -->
          <div class="publications-grid" v-if="filteredPublications.length">
            <PublicationCard
              v-for="publication in paginatedPublications"
              :key="publication.id"
              :publication="publication"
              :active-tags="publicationFilters.tags || []"
              @tag-click="handleTagClick"
              @article-click="handleArticleClick"
            />
          </div>

          <!-- Пустое состояние -->
          <div v-else class="empty-state">
            <div class="empty-icon">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
              </svg>
            </div>
            <h3>Публикации не найдены</h3>
            <p v-if="hasActiveFilters">
              Попробуйте изменить критерии поиска или 
              <button class="link-button" @click="clearAllFilters">очистить фильтры</button>
            </p>
            <p v-else>
              В данный момент публикации отсутствуют.
            </p>
          </div>

          <!-- Пагинация -->
          <div v-if="totalPages > 1" class="pagination">
            <button 
              class="pagination-btn"
              :disabled="currentPage === 1"
              @click="goToPage(currentPage - 1)"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
              Назад
            </button>

            <div class="pagination-pages">
              <button
                v-for="page in visiblePages"
                :key="page"
                class="pagination-page"
                :class="{ active: page === currentPage }"
                @click="goToPage(page)"
              >
                {{ page }}
              </button>
            </div>

            <button 
              class="pagination-btn"
              :disabled="currentPage === totalPages"
              @click="goToPage(currentPage + 1)"
            >
              Вперед
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { publications } from '../data/publications.js'
import PublicationCard from '../components/PublicationCard.vue'
import PublicationFilters from '../components/PublicationFilters.vue'
import PublicationStats from '../components/PublicationStats.vue'

export default {
  name: 'PublicationsPage',
  components: {
    PublicationCard,
    PublicationFilters,
    PublicationStats
  },
  setup() {
    const route = useRoute()
    const router = useRouter()

    // Состояние фильтров
    const publicationFilters = ref({
      search: '',
      types: [],
      years: [],
      tags: [],
      venues: []
    })

    // Пагинация
    const currentPage = ref(1)
    const itemsPerPage = 12

    // Типы публикаций
    const getTypeLabel = (type) => {
      const labels = {
        article: 'Статья',
        conference: 'Конференция',
        thesis: 'Тезисы',
        preprint: 'Препринт',
        report: 'Отчёт',
        book: 'Книга',
        chapter: 'Глава'
      }
      return labels[type] || type
    }

    // Фильтрация публикаций
    const filteredPublications = computed(() => {
      let result = [...publications]

      // Поиск по тексту
      if (publicationFilters.value.search) {
        const searchLower = publicationFilters.value.search.toLowerCase()
        result = result.filter(pub =>
          pub.title.toLowerCase().includes(searchLower) ||
          pub.abstract?.toLowerCase().includes(searchLower) ||
          pub.venue.toLowerCase().includes(searchLower) ||
          pub.authors?.some(author =>
            typeof author === 'string'
              ? author.toLowerCase().includes(searchLower)
              : author.name?.toLowerCase().includes(searchLower)
          )
        )
      }

      // Фильтр по типам
      if (publicationFilters.value.types && publicationFilters.value.types.length) {
        result = result.filter(pub => publicationFilters.value.types.includes(pub.type))
      }

      // Фильтр по годам
      if (publicationFilters.value.years && publicationFilters.value.years.length) {
        result = result.filter(pub => publicationFilters.value.years.includes(pub.year))
      }

      // Фильтр по тегам
      if (publicationFilters.value.tags && publicationFilters.value.tags.length) {
        result = result.filter(pub =>
          pub.tags?.some(tag => publicationFilters.value.tags.includes(tag))
        )
      }

      // Фильтр по площадкам
      if (publicationFilters.value.venues && publicationFilters.value.venues.length) {
        result = result.filter(pub => publicationFilters.value.venues.includes(pub.venue))
      }

      // Сортировка по году (новые сначала)
      return result.sort((a, b) => b.year - a.year)
    })

    // Пагинированные публикации
    const paginatedPublications = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage
      const end = start + itemsPerPage
      return filteredPublications.value.slice(start, end)
    })

    // Пагинация
    const totalPages = computed(() => Math.ceil(filteredPublications.value.length / itemsPerPage))

    const visiblePages = computed(() => {
      const pages = []
      const maxVisible = 5
      let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2))
      let end = Math.min(totalPages.value, start + maxVisible - 1)

      if (end - start + 1 < maxVisible) {
        start = Math.max(1, end - maxVisible + 1)
      }

      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      return pages
    })

    // Активные фильтры
    const hasActiveFilters = computed(() => {
      return !!(
        publicationFilters.value.search ||
        (publicationFilters.value.types && publicationFilters.value.types.length) ||
        (publicationFilters.value.years && publicationFilters.value.years.length) ||
        (publicationFilters.value.tags && publicationFilters.value.tags.length) ||
        (publicationFilters.value.venues && publicationFilters.value.venues.length)
      )
    })

    // Методы обработки фильтров
    const handleFilterChange = (newFilters) => {
      publicationFilters.value = { ...newFilters }
      currentPage.value = 1
      updateURL()
    }

    const handleYearClick = (year) => {
      const years = publicationFilters.value.years || []
      if (years.includes(year)) {
        publicationFilters.value.years = years.filter(y => y !== year)
      } else {
        publicationFilters.value.years = [...years, year]
      }
      currentPage.value = 1
      updateURL()
    }

    const handleVenueClick = (venue) => {
      const venues = publicationFilters.value.venues || []
      if (venues.includes(venue)) {
        publicationFilters.value.venues = venues.filter(v => v !== venue)
      } else {
        publicationFilters.value.venues = [...venues, venue]
      }
      currentPage.value = 1
      updateURL()
    }

    const handleTagClick = (tag) => {
      const tags = publicationFilters.value.tags || []
      if (tags.includes(tag)) {
        publicationFilters.value.tags = tags.filter(t => t !== tag)
      } else {
        publicationFilters.value.tags = [...tags, tag]
      }
      currentPage.value = 1
      updateURL()
    }

    const clearSearchFilter = () => {
      publicationFilters.value.search = ''
      currentPage.value = 1
      updateURL()
    }

    const removeTypeFilter = (type) => {
      publicationFilters.value.types = publicationFilters.value.types.filter(t => t !== type)
      currentPage.value = 1
      updateURL()
    }

    const removeTagFilter = (tag) => {
      publicationFilters.value.tags = publicationFilters.value.tags.filter(t => t !== tag)
      currentPage.value = 1
      updateURL()
    }

    const clearAllFilters = () => {
      publicationFilters.value = {
        search: '',
        types: [],
        years: [],
        tags: [],
        venues: []
      }
      currentPage.value = 1
      updateURL()
    }

    // Обработчик кликов по статьям
    const handleArticleClick = (publication) => {
      router.push(`/publications/${publication.slug}`)
    }

    // Пагинация
    const goToPage = (page) => {
      if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page
        updateURL()
        // Прокрутка к началу списка
        document.querySelector('.publications-grid')?.scrollIntoView({ behavior: 'smooth' })
      }
    }

    // URL синхронизация
    const updateURL = () => {
      const query = {}

      if (publicationFilters.value.search) {
        query.search = publicationFilters.value.search
      }
      if (publicationFilters.value.types && publicationFilters.value.types.length) {
        query.types = publicationFilters.value.types.join(',')
      }
      if (publicationFilters.value.years && publicationFilters.value.years.length) {
        query.years = publicationFilters.value.years.join(',')
      }
      if (publicationFilters.value.tags && publicationFilters.value.tags.length) {
        query.tags = publicationFilters.value.tags.join(',')
      }
      if (publicationFilters.value.venues && publicationFilters.value.venues.length) {
        query.venues = publicationFilters.value.venues.join(',')
      }
      if (currentPage.value > 1) {
        query.page = currentPage.value.toString()
      }

      router.replace({ query: Object.keys(query).length ? query : undefined })
    }

    const loadFromURL = () => {
      const query = route.query

      publicationFilters.value = {
        search: query.search || '',
        types: query.types ? query.types.split(',') : [],
        years: query.years ? query.years.split(',').map(Number) : [],
        tags: query.tags ? query.tags.split(',') : [],
        venues: query.venues ? query.venues.split(',') : []
      }

      currentPage.value = query.page ? parseInt(query.page, 10) : 1
    }

    // Следим за изменениями URL
    watch(() => route.query, loadFromURL, { immediate: true })

    // Сброс фильтров при размонтировании
    onMounted(() => {
      loadFromURL()
    })

    return {
      publications,
      publicationFilters,
      filteredPublications,
      paginatedPublications,
      currentPage,
      totalPages,
      visiblePages,
      hasActiveFilters,
      getTypeLabel,
      handleFilterChange,
      handleYearClick,
      handleVenueClick,
      handleTagClick,
      clearSearchFilter,
      removeTypeFilter,
      removeTagFilter,
      clearAllFilters,
      handleArticleClick,
      goToPage
    }
  }
}
</script>

<style scoped>
.publications-page {
  min-height: 100vh;
  color: var(--text-primary);
}

/* Заголовок страницы */
.page-header {
  background: var(--gradient-glass);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 3rem 0 2rem;
  margin-bottom: 2rem;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  background: var(--gradient-text);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-subtitle {
  font-size: 1.125rem;
  color: var(--text-secondary);
  margin: 0;
  max-width: 600px;
}

/* Основная разметка */
.publications-layout {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 2rem;
  align-items: start;
}

.publications-sidebar {
  position: sticky;
  top: 100px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.publications-main {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Панель инструментов */
.publications-toolbar {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  background: var(--gradient-glass);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-lg);
  backdrop-filter: blur(10px);
}

.results-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
}

.results-count {
  font-weight: 600;
  color: var(--primary-color);
}

.active-filters-info {
  color: var(--text-secondary);
}

/* Активные фильтры */
.active-filters {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.filter-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
}

.filter-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 0.75rem;
  background: rgba(102, 126, 234, 0.15);
  color: #4f46e5;
  border: 1px solid rgba(102, 126, 234, 0.3);
  border-radius: 16px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-chip:hover {
  background: rgba(102, 126, 234, 0.25);
  border-color: rgba(102, 126, 234, 0.4);
}

.filter-chip svg {
  width: 14px;
  height: 14px;
  opacity: 0.7;
}

.clear-all-filters {
  padding: 0.375rem 0.75rem;
  background: rgba(239, 68, 68, 0.15);
  color: #dc2626;
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 16px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.clear-all-filters:hover {
  background: rgba(239, 68, 68, 0.25);
  border-color: rgba(239, 68, 68, 0.4);
}

/* Сетка публикаций */
.publications-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
}

/* Пустое состояние */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
  background: var(--gradient-glass);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-lg);
  backdrop-filter: blur(10px);
}

.empty-icon {
  margin-bottom: 1.5rem;
  opacity: 0.5;
}

.empty-icon svg {
  color: var(--text-secondary);
}

.empty-state h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 0.75rem 0;
  color: var(--text-primary);
}

.empty-state p {
  color: var(--text-secondary);
  margin: 0;
  line-height: 1.5;
}

.link-button {
  background: none;
  border: none;
  color: var(--primary-color);
  text-decoration: underline;
  cursor: pointer;
  font-size: inherit;
}

.link-button:hover {
  color: var(--secondary-color);
}

/* Пагинация */
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 2rem 0;
}

.pagination-btn,
.pagination-page {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-width: 44px;
  min-height: 44px;
  padding: 0.75rem 1rem;
  background: var(--gradient-glass);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: var(--text-primary);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
}

.pagination-btn:hover:not(:disabled),
.pagination-page:hover {
  background: rgba(102, 126, 234, 0.15);
  border-color: rgba(102, 126, 234, 0.3);
  color: #4f46e5;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-pages {
  display: flex;
  gap: 0.25rem;
}

.pagination-page.active {
  background: var(--primary-color);
  border-color: var(--primary-color);
  color: white;
}

.pagination-page.active:hover {
  background: var(--secondary-color);
  border-color: var(--secondary-color);
  color: white;
}

/* Адаптивность */
@media (max-width: 1024px) {
  .publications-layout {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .publications-sidebar {
    position: static;
    order: 1;
  }

  .publications-main {
    order: 0;
  }
}

@media (max-width: 768px) {
  .page-header {
    padding: 2rem 0 1.5rem;
  }

  .page-title {
    font-size: 2rem;
  }

  .page-subtitle {
    font-size: 1rem;
  }

  .publications-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .publications-toolbar {
    padding: 1rem;
  }

  .filter-chips {
    gap: 0.375rem;
  }

  .filter-chip,
  .clear-all-filters {
    font-size: 0.8125rem;
    padding: 0.3125rem 0.625rem;
  }

  .pagination {
    flex-wrap: wrap;
    gap: 0.5rem;
    padding: 1.5rem 0;
  }

  .pagination-btn,
  .pagination-page {
    min-width: 40px;
    min-height: 40px;
    padding: 0.625rem;
  }
}

/* Улучшения доступности */
@media (prefers-reduced-motion: reduce) {
  .filter-chip,
  .clear-all-filters,
  .pagination-btn,
  .pagination-page {
    transition: none;
  }
}

@media (prefers-contrast: high) {
  .publications-toolbar,
  .empty-state {
    border-width: 2px;
    border-color: var(--text-primary);
  }

  .filter-chip,
  .clear-all-filters,
  .pagination-btn,
  .pagination-page {
    border-width: 2px;
  }
}
</style>
