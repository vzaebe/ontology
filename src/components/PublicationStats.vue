<template>
  <div class="publication-stats" :class="{ 'compact': compact }">
    <!-- Левая часть: счетчик -->
    <div class="stats-left">
      <div class="stats-count">
        <span class="count-text">Найдено: </span>
        <span class="count-number">{{ totalCount }}</span>
        <span class="count-label">{{ getCountLabel(totalCount) }}</span>
      </div>
    </div>

    <!-- Правая часть: графики и площадки -->
    <div class="stats-right">
      <!-- Мини-график по годам -->
      <div class="stats-mini-chart" v-if="showChart">
        <div class="mini-chart-container">
          <div class="mini-chart-bars">
            <div 
              v-for="item in chartData" 
              :key="item.year"
              class="mini-chart-bar"
              :style="{ height: `${item.height}%` }"
              :title="`${item.year}: ${item.count} публикаций`"
              @click="$emit('year-click', item.year)"
            >
              <span class="mini-bar-value">{{ item.count }}</span>
            </div>
          </div>
          <div class="mini-chart-labels">
            <span 
              v-for="item in chartData" 
              :key="`label-${item.year}`"
              class="mini-bar-label"
            >
              {{ item.year }}
            </span>
          </div>
        </div>
      </div>

      <!-- Топ-3 площадки (только в полном режиме) -->
      <div class="stats-venues-chips" v-if="!compact && showTopVenues && topVenues.length">
        <button
          v-for="venue in topVenues.slice(0, 3)"
          :key="venue.name"
          class="venue-chip"
          @click="$emit('venue-click', venue.name)"
          :title="`${venue.name}: ${venue.count} публикаций`"
        >
          <span class="venue-chip-name">{{ truncateVenueName(venue.name) }}</span>
          <span class="venue-chip-count">{{ venue.count }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'PublicationStats',
  props: {
    publications: {
      type: Array,
      default: () => []
    },
    compact: {
      type: Boolean,
      default: false
    },
    showChart: {
      type: Boolean,
      default: true
    },
    showTopVenues: {
      type: Boolean,
      default: true
    },
    showTrends: {
      type: Boolean,
      default: true
    }
  },
  emits: ['year-click', 'venue-click', 'tag-click'],
  setup(props) {
    const totalCount = computed(() => props.publications.length)

    const getCountLabel = (count) => {
      const forms = ['публикация', 'публикации', 'публикаций']
      const cases = [2, 0, 1, 1, 1, 2]
      return forms[
        count % 100 > 4 && count % 100 < 20
          ? 2
          : cases[count % 10 < 5 ? count % 10 : 5]
      ]
    }

    // Данные для графика по годам
    const chartData = computed(() => {
      if (!props.publications.length) return []

      const yearCounts = {}
      props.publications.forEach(pub => {
        yearCounts[pub.year] = (yearCounts[pub.year] || 0) + 1
      })

      const years = Object.keys(yearCounts)
        .map(Number)
        .sort((a, b) => a - b)
        .slice(-7) // Последние 7 лет

      const maxCount = Math.max(...years.map(year => yearCounts[year]))

      return years.map(year => ({
        year,
        count: yearCounts[year],
        height: maxCount > 0 ? (yearCounts[year] / maxCount) * 100 : 0
      }))
    })

    // Топ площадки
    const topVenues = computed(() => {
      if (!props.publications.length) return []

      const venueCounts = {}
      props.publications.forEach(pub => {
        if (pub.venue) {
          venueCounts[pub.venue] = (venueCounts[pub.venue] || 0) + 1
        }
      })

      return Object.entries(venueCounts)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 3)
    })

    // Данные трендов (по тегам)
    const trendsData = computed(() => {
      if (!props.publications.length) return []

      const tagCounts = {}
      props.publications.forEach(pub => {
        if (pub.tags) {
          pub.tags.forEach(tag => {
            tagCounts[tag] = (tagCounts[tag] || 0) + 1
          })
        }
      })

      const maxCount = Math.max(...Object.values(tagCounts))
      
      return Object.entries(tagCounts)
        .map(([tag, count]) => ({
          tag,
          count,
          percentage: maxCount > 0 ? (count / maxCount) * 100 : 0
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5)
    })

    const truncateVenueName = (venueName) => {
      if (!venueName) return ''
      if (venueName.length > 25) {
        return venueName.substring(0, 22) + '...'
      }
      return venueName
    }

    return {
      totalCount,
      getCountLabel,
      chartData,
      topVenues,
      trendsData,
      truncateVenueName
    }
  }
}
</script>

<style scoped>
.publication-stats {
  background: var(--gradient-glass);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: var(--radius-lg);
  padding: 1rem 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: var(--shadow-md);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
}

.publication-stats.compact {
  padding: 0.75rem 1.25rem;
  gap: 1rem;
}

.stats-left {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.stats-right {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex: 1;
  justify-content: flex-end;
}

.compact .stats-right {
  gap: 1rem;
}

/* Счетчик */
.stats-count {
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
  font-size: 0.875rem;
  color: var(--text-primary);
}

.count-text {
  font-weight: 500;
  color: var(--text-secondary);
}

.count-number {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-color);
  line-height: 1;
}

.compact .count-number {
  font-size: 1.25rem;
}

.count-label {
  font-size: 0.875rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.compact .count-label {
  font-size: 0.8125rem;
}

/* Мини-график */
.stats-mini-chart {
  display: flex;
  align-items: center;
}

.mini-chart-container {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 140px;
}

.compact .mini-chart-container {
  min-width: 120px;
}

.mini-chart-bars {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  height: 32px;
  gap: 2px;
  padding: 0 2px;
}

.compact .mini-chart-bars {
  height: 24px;
}

.mini-chart-bar {
  flex: 1;
  background: linear-gradient(to top, var(--primary-color), var(--secondary-color));
  border-radius: 2px 2px 0 0;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  min-height: 4px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 2px;
  min-width: 12px;
}

.mini-chart-bar:hover {
  opacity: 0.8;
  transform: scaleY(1.1);
}

.mini-bar-value {
  font-size: 0.625rem;
  color: white;
  font-weight: 600;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  line-height: 1;
}

.compact .mini-bar-value {
  font-size: 0.5rem;
}

.mini-chart-labels {
  display: flex;
  justify-content: space-between;
  padding: 0 2px;
}

.mini-bar-label {
  font-size: 0.625rem;
  color: var(--text-light);
  font-weight: 500;
  flex: 1;
  text-align: center;
}

.compact .mini-bar-label {
  font-size: 0.5625rem;
}

/* Чипы площадок */
.stats-venues-chips {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.venue-chip {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.25rem 0.75rem;
  background: rgba(102, 126, 234, 0.1);
  border: 1px solid rgba(102, 126, 234, 0.2);
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
  min-height: 32px;
  max-width: 140px;
}

.venue-chip:hover {
  background: rgba(102, 126, 234, 0.2);
  border-color: rgba(102, 126, 234, 0.4);
  transform: translateY(-1px);
}

.venue-chip:focus {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}

.venue-chip:focus:not(:focus-visible) {
  outline: none;
}

.venue-chip:focus-visible {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}

.venue-chip-name {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--text-primary);
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
}

.venue-chip-count {
  font-size: 0.6875rem;
  font-weight: 600;
  color: var(--primary-color);
  background: rgba(102, 126, 234, 0.2);
  padding: 0.125rem 0.375rem;
  border-radius: 8px;
  flex-shrink: 0;
}

/* Тренды */
.stats-trends {
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 1rem;
}

.trends-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 1rem;
  text-align: center;
}

.trends-grid {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.trend-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  min-height: 44px;
}

.trend-item:hover {
  background: rgba(102, 126, 234, 0.05);
}

.trend-tag {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-primary);
  min-width: 80px;
  text-align: left;
}

.trend-bar {
  flex: 1;
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
}

.trend-fill {
  height: 100%;
  background: linear-gradient(90deg, #667eea, #764ba2);
  border-radius: 4px;
  transition: width 0.3s ease;
}

.trend-count {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--primary-color);
  min-width: 24px;
  text-align: right;
}

/* Адаптивность */
@media (max-width: 768px) {
  .publication-stats {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .stats-left,
  .stats-right {
    width: 100%;
  }
  
  .stats-right {
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  
  .mini-chart-container {
    min-width: 100px;
  }
  
  .venue-chip {
    max-width: 120px;
  }
  
  .venue-chip-name {
    font-size: 0.6875rem;
  }
  
  .venue-chip-count {
    font-size: 0.625rem;
  }
}

/* Поддержка prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  .mini-chart-bar,
  .venue-chip {
    transition: none;
  }
  
  .mini-chart-bar:hover,
  .venue-chip:hover {
    transform: none;
  }
}

/* Высокий контраст */
@media (prefers-contrast: high) {
  .publication-stats {
    border-width: 2px;
    border-color: var(--text-primary);
  }
  
  .venue-chip {
    border-width: 2px;
  }
  
  .count-number {
    font-weight: 800;
  }
}
</style>
