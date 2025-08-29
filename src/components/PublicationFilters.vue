<template>
  <div class="publication-filters" :class="{ 'compact': compact }">
    <!-- Основные фильтры -->
    <div class="filters-main">
      <div class="filters-row">
        <!-- Тип публикации -->
        <div class="filter-group">
          <label class="filter-label">Тип:</label>
          <div class="filter-chips">
            <button
              v-for="type in availableTypes"
              :key="type.value"
              class="filter-chip"
              :class="{ active: selectedTypes.includes(type.value) }"
              @click="toggleType(type.value)"
              :aria-pressed="selectedTypes.includes(type.value)"
            >
              {{ type.label }}
            </button>
          </div>
        </div>

        <!-- Год -->
        <div class="filter-group" v-if="!compact">
          <label class="filter-label">Год:</label>
          <div class="filter-chips">
            <button
              v-for="year in availableYears"
              :key="year"
              class="filter-chip"
              :class="{ active: selectedYears.includes(year) }"
              @click="toggleYear(year)"
              :aria-pressed="selectedYears.includes(year)"
            >
              {{ year }}
            </button>
          </div>
        </div>

        <!-- Площадка (селект) -->
        <div class="filter-group" v-if="!compact">
          <label for="venue-select" class="filter-label">Площадка:</label>
          <select 
            id="venue-select"
            v-model="selectedVenue" 
            class="filter-select"
            @change="updateVenue"
          >
            <option value="">Все площадки</option>
            <option v-for="venue in availableVenues" :key="venue" :value="venue">
              {{ venue }}
            </option>
          </select>
        </div>

        <!-- Сортировка -->
        <div class="filter-group">
          <label for="sort-select" class="filter-label">Сортировка:</label>
          <select 
            id="sort-select"
            v-model="selectedSort" 
            class="filter-select"
            @change="updateSort"
          >
            <option value="year-desc">По году (новые→старые)</option>
            <option value="year-asc">По году (старые→новые)</option>
            <option value="venue">По площадке</option>
            <option value="type">По типу</option>
          </select>
        </div>
      </div>

      <!-- Теги -->
      <div class="filters-row" v-if="!compact && availableTags.length">
        <div class="filter-group filter-group-wide">
          <label class="filter-label">Теги:</label>
          <div class="filter-chips">
            <button
              v-for="tag in availableTags"
              :key="tag"
              class="filter-chip"
              :class="{ active: selectedTags.includes(tag) }"
              @click="toggleTag(tag)"
              :aria-pressed="selectedTags.includes(tag)"
            >
              {{ tag }}
            </button>
          </div>
        </div>
      </div>

      <!-- Поиск -->
      <div class="filters-row" v-if="!compact">
        <div class="filter-group filter-group-wide">
          <label for="search-input" class="filter-label">Поиск по названию:</label>
          <div class="search-container">
            <input
              id="search-input"
              type="text"
              v-model="searchQuery"
              placeholder="Введите ключевые слова..."
              class="search-input"
              @input="updateSearch"
            />
            <button 
              v-if="searchQuery"
              @click="clearSearch"
              class="search-clear"
              aria-label="Очистить поиск"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Активные фильтры и сброс -->
      <div class="filters-row" v-if="hasActiveFilters">
        <div class="active-filters">
          <span class="active-filters-label">Активные фильтры:</span>
          <div class="active-filter-chips">
            <span 
              v-for="type in selectedTypes" 
              :key="`type-${type}`"
              class="active-filter-chip"
            >
              {{ getTypeLabel(type) }}
              <button @click="toggleType(type)" aria-label="Убрать фильтр">×</button>
            </span>
            <span 
              v-for="year in selectedYears" 
              :key="`year-${year}`"
              class="active-filter-chip"
            >
              {{ year }}
              <button @click="toggleYear(year)" aria-label="Убрать фильтр">×</button>
            </span>
            <span 
              v-if="selectedVenue"
              class="active-filter-chip"
            >
              {{ selectedVenue }}
              <button @click="clearVenue" aria-label="Убрать фильтр">×</button>
            </span>
            <span 
              v-for="tag in selectedTags" 
              :key="`tag-${tag}`"
              class="active-filter-chip"
            >
              {{ tag }}
              <button @click="toggleTag(tag)" aria-label="Убрать фильтр">×</button>
            </span>
          </div>
          <button 
            @click="resetFilters"
            class="reset-filters-btn"
          >
            Сбросить все
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue'

export default {
  name: 'PublicationFilters',
  props: {
    compact: {
      type: Boolean,
      default: false
    },
    publications: {
      type: Array,
      default: () => []
    },
    modelValue: {
      type: Object,
      default: () => ({
        types: [],
        years: [],
        venue: '',
        tags: [],
        search: '',
        sort: 'year-desc'
      })
    }
  },
  emits: ['update:modelValue', 'filter-change'],
  setup(props, { emit }) {
    // Реактивные данные
    const selectedTypes = ref([...props.modelValue.types])
    const selectedYears = ref([...props.modelValue.years])
    const selectedVenue = ref(props.modelValue.venue)
    const selectedTags = ref([...props.modelValue.tags])
    const searchQuery = ref(props.modelValue.search)
    const selectedSort = ref(props.modelValue.sort)

    // Доступные варианты
    const availableTypes = [
      { value: 'article', label: 'Статья' },
      { value: 'conference', label: 'Конференция' },
      { value: 'thesis', label: 'Тезисы' },
      { value: 'preprint', label: 'Препринт' },
      { value: 'report', label: 'Отчёт' },
      { value: 'book', label: 'Книга' }
    ]

    const availableYears = computed(() => {
      const years = [...new Set(props.publications.map(p => p.year))]
      return years.sort((a, b) => b - a)
    })

    const availableVenues = computed(() => {
      const venues = [...new Set(props.publications.map(p => p.venue).filter(Boolean))]
      return venues.sort()
    })

    const availableTags = computed(() => {
      const tags = [...new Set(props.publications.flatMap(p => p.tags || []))]
      return tags.sort()
    })

    // Вычисляемые свойства
    const hasActiveFilters = computed(() => {
      return selectedTypes.value.length > 0 ||
             selectedYears.value.length > 0 ||
             selectedVenue.value ||
             selectedTags.value.length > 0 ||
             searchQuery.value
    })

    // Методы
    const toggleType = (type) => {
      const index = selectedTypes.value.indexOf(type)
      if (index > -1) {
        selectedTypes.value.splice(index, 1)
      } else {
        selectedTypes.value.push(type)
      }
      emitFilterChange()
    }

    const toggleYear = (year) => {
      const index = selectedYears.value.indexOf(year)
      if (index > -1) {
        selectedYears.value.splice(index, 1)
      } else {
        selectedYears.value.push(year)
      }
      emitFilterChange()
    }

    const toggleTag = (tag) => {
      const index = selectedTags.value.indexOf(tag)
      if (index > -1) {
        selectedTags.value.splice(index, 1)
      } else {
        selectedTags.value.push(tag)
      }
      emitFilterChange()
    }

    const updateVenue = () => {
      emitFilterChange()
    }

    const updateSort = () => {
      emitFilterChange()
    }

    const updateSearch = () => {
      emitFilterChange()
    }

    const clearVenue = () => {
      selectedVenue.value = ''
      emitFilterChange()
    }

    const clearSearch = () => {
      searchQuery.value = ''
      emitFilterChange()
    }

    const resetFilters = () => {
      selectedTypes.value = []
      selectedYears.value = []
      selectedVenue.value = ''
      selectedTags.value = []
      searchQuery.value = ''
      selectedSort.value = 'year-desc'
      emitFilterChange()
    }

    const getTypeLabel = (type) => {
      const typeObj = availableTypes.find(t => t.value === type)
      return typeObj ? typeObj.label : type
    }

    const emitFilterChange = () => {
      const filters = {
        types: [...selectedTypes.value],
        years: [...selectedYears.value],
        venue: selectedVenue.value,
        tags: [...selectedTags.value],
        search: searchQuery.value,
        sort: selectedSort.value
      }
      emit('update:modelValue', filters)
      emit('filter-change', filters)
    }

    // Наблюдение за изменениями props.modelValue
    watch(() => props.modelValue, (newValue) => {
      selectedTypes.value = [...newValue.types]
      selectedYears.value = [...newValue.years]
      selectedVenue.value = newValue.venue
      selectedTags.value = [...newValue.tags]
      searchQuery.value = newValue.search
      selectedSort.value = newValue.sort
    }, { deep: true })

    return {
      selectedTypes,
      selectedYears,
      selectedVenue,
      selectedTags,
      searchQuery,
      selectedSort,
      availableTypes,
      availableYears,
      availableVenues,
      availableTags,
      hasActiveFilters,
      toggleType,
      toggleYear,
      toggleTag,
      updateVenue,
      updateSort,
      updateSearch,
      clearVenue,
      clearSearch,
      resetFilters,
      getTypeLabel
    }
  }
}
</script>

<style scoped>
.publication-filters {
  background: var(--gradient-glass);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: var(--shadow-md);
}

.publication-filters.compact {
  padding: 1rem;
  margin-bottom: 1.5rem;
}

.filters-main {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.compact .filters-main {
  gap: 1rem;
}

.filters-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  align-items: flex-start;
}

.compact .filters-row {
  gap: 1rem;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 120px;
}

.filter-group-wide {
  flex: 1;
  min-width: 200px;
}

.filter-label {
  font-weight: 600;
  color: var(--text-primary);
  font-size: 0.875rem;
}

.compact .filter-label {
  font-size: 0.8125rem;
}

/* Чипсы фильтров */
.filter-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.filter-chip {
  padding: 0.5rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.1);
  color: var(--text-primary);
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 44px;
  display: flex;
  align-items: center;
}

.filter-chip:hover {
  border-color: var(--primary-color);
  background: rgba(102, 126, 234, 0.1);
}

.filter-chip.active {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.filter-chip:focus {
  outline: 2px solid #667eea;
  outline-offset: 2px;
}

.compact .filter-chip {
  padding: 0.375rem 0.75rem;
  font-size: 0.8125rem;
  min-height: 36px;
}

/* Селекты */
.filter-select {
  padding: 0.75rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  background: var(--gradient-glass);
  backdrop-filter: blur(10px);
  color: var(--text-primary);
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 44px;
  font-family: var(--font-sans);
  font-weight: 500;
}

.filter-select:hover {
  border-color: var(--primary-color);
  background: rgba(102, 126, 234, 0.1);
}

.filter-select:focus {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
  border-color: var(--primary-color);
  box-shadow: var(--shadow-glow);
}

.filter-select:focus:not(:focus-visible) {
  outline: none;
}

.filter-select:focus-visible {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}

.filter-select:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  border-color: var(--text-light);
}

.compact .filter-select {
  padding: 0.5rem 0.75rem;
  font-size: 0.8125rem;
  min-height: 36px;
}

/* Поиск */
.search-container {
  position: relative;
  display: flex;
  align-items: center;
}

.search-input {
  flex: 1;
  padding: 0.75rem 3rem 0.75rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  background: var(--gradient-glass);
  backdrop-filter: blur(10px);
  color: var(--text-primary);
  font-size: 0.875rem;
  transition: all 0.2s ease;
  min-height: 44px;
  font-family: var(--font-sans);
  font-weight: 500;
}

.search-input:hover {
  border-color: var(--primary-color);
  background: rgba(102, 126, 234, 0.1);
}

.search-input:focus {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
  border-color: var(--primary-color);
  box-shadow: var(--shadow-glow);
}

.search-input:focus:not(:focus-visible) {
  outline: none;
}

.search-input:focus-visible {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}

.search-input::placeholder {
  color: var(--text-light);
  font-weight: 400;
}

.search-clear {
  position: absolute;
  right: 0.75rem;
  background: none;
  border: none;
  color: var(--text-light);
  cursor: pointer;
  padding: 0.25rem;
  border-radius: var(--radius-sm);
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 24px;
  min-height: 24px;
}

.search-clear:hover {
  color: var(--text-primary);
  background: rgba(102, 126, 234, 0.1);
}

.search-clear:focus {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}

.search-clear:focus:not(:focus-visible) {
  outline: none;
}

.search-clear:focus-visible {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}

/* Активные фильтры */
.active-filters {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(102, 126, 234, 0.05);
  border: 1px solid rgba(102, 126, 234, 0.1);
  border-radius: 8px;
  width: 100%;
}

.active-filters-label {
  font-weight: 600;
  color: #374151;
  font-size: 0.875rem;
  flex-shrink: 0;
}

.active-filter-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  flex: 1;
}

.active-filter-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.25rem 0.75rem;
  background: #667eea;
  color: white;
  border-radius: 16px;
  font-size: 0.8125rem;
  font-weight: 500;
}

.active-filter-chip button {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-weight: bold;
  padding: 0;
  margin-left: 0.25rem;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background 0.2s ease;
}

.active-filter-chip button:hover {
  background: rgba(255, 255, 255, 0.2);
}

.reset-filters-btn {
  padding: 0.5rem 1rem;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.reset-filters-btn:hover {
  background: #dc2626;
}

.reset-filters-btn:focus {
  outline: 2px solid #ef4444;
  outline-offset: 2px;
}

/* Адаптивность */
@media (max-width: 768px) {
  .filters-row {
    flex-direction: column;
    gap: 1rem;
  }
  
  .filter-group {
    min-width: unset;
    width: 100%;
  }
  
  .filter-chips {
    gap: 0.375rem;
  }
  
  .filter-chip {
    padding: 0.375rem 0.75rem;
    font-size: 0.8125rem;
    min-height: 40px;
  }
  
  .active-filters {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
  
  .active-filter-chips {
    width: 100%;
  }
}

/* Поддержка prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  .filter-chip,
  .filter-select,
  .search-input,
  .reset-filters-btn {
    transition: none;
  }
}

/* Высокий контраст */
@media (prefers-contrast: high) {
  .publication-filters {
    border-width: 2px;
    border-color: #000;
  }
  
  .filter-chip,
  .filter-select,
  .search-input {
    border-width: 2px;
  }
  
  .filter-label {
    font-weight: 700;
  }
}
</style>
