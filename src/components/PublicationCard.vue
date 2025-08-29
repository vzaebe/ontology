<template>
  <article class="publication-card" :class="{ 'compact': compact }">
    <!-- Метаданные одной строкой -->
    <div class="publication-meta">
      <div class="meta-main">
        <span class="meta-authors">
          <span v-for="(author, index) in publication.authors" :key="index">
            <router-link 
              v-if="author.personId" 
              :to="`/team/${getPersonSlug(author.personId)}`"
              class="author-link"
            >
              {{ author.name }}
            </router-link>
            <span v-else>{{ author.name }}</span><span v-if="index < publication.authors.length - 1">, </span>
          </span>
        </span>
        <span class="meta-separator">•</span>
        <span class="publication-year">{{ publication.year }}</span>
        <span class="meta-separator">•</span>
        <span class="publication-type" :class="`type-${publication.type}`">
          {{ getTypeLabel(publication.type) }}
        </span>
      </div>
      <div class="publication-badges" v-if="publication.badges && publication.badges.length">
        <span 
          v-for="badge in publication.badges" 
          :key="badge"
          class="publication-badge"
          :class="`badge-${badge}`"
        >
          {{ getBadgeLabel(badge) }}
        </span>
      </div>
    </div>

    <!-- Заголовок с быстрым просмотром -->
    <div class="publication-title-container">
                  <h3 class="publication-title" :title="publication.title" @click="openModal">
        {{ publication.title }}
      </h3>
      <button 
        class="quick-preview-btn"
        @click="toggleQuickPreview"
        :aria-label="`Быстрый просмотр: ${publication.title}`"
        ref="previewTrigger"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="3"/>
          <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/>
        </svg>
      </button>
      
      <!-- Быстрый просмотр (popover) -->
      <div 
        v-if="showQuickPreview" 
        class="quick-preview-popover"
        ref="previewPopover"
        @click.stop
      >
        <div class="quick-preview-header">
          <h4>{{ publication.title }}</h4>
          <button 
            class="close-btn"
            @click="closeQuickPreview"
            aria-label="Закрыть"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        <div class="quick-preview-content">
          <div class="preview-meta">
            <span class="preview-year">{{ publication.year }}</span>
            <span class="preview-type">{{ getTypeLabel(publication.type) }}</span>
            <span class="preview-venue">{{ publication.venue }}</span>
          </div>
          <p class="preview-abstract" v-if="publication.abstract">
            {{ publication.abstract }}
          </p>
          <div class="preview-authors" v-if="publication.authors && publication.authors.length">
            <strong>Авторы:</strong>
            <span v-for="(author, index) in publication.authors" :key="index">
              <router-link 
                v-if="author.personId" 
                :to="`/team/${getPersonSlug(author.personId)}`"
                class="author-link"
              >
                {{ author.name }}
              </router-link>
              <span v-else>{{ author.name }}</span><span v-if="index < publication.authors.length - 1">, </span>
            </span>
          </div>
          <div class="preview-actions">
            <router-link 
              :to="`/publications/${publication.slug}`" 
              class="btn btn-primary btn-sm"
            >
              Подробнее
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Площадка (короткая) -->
    <p class="publication-venue">{{ truncateVenue(publication.venue) }}</p>

    <!-- Теги -->
    <div class="publication-tags" v-if="publication.tags && publication.tags.length">
      <span 
        v-for="tag in visibleTags" 
        :key="tag.name"
        class="publication-tag"
        :class="{ 'tag-active': tag.isActive }"
        @click="$emit('tag-click', tag.name)"
      >
        {{ tag.name }}
      </span>
      
      <!-- Кнопка "показать ещё" -->
      <button
        v-if="hiddenTagsCount > 0"
        class="publication-tag tag-expand"
        @click="toggleTagsExpanded"
        :aria-label="`${tagsExpanded ? 'Скрыть' : 'Показать ещё'} ${hiddenTagsCount} тегов`"
      >
        {{ tagsExpanded ? '− Скрыть' : `+ ещё ${hiddenTagsCount}` }}
      </button>
    </div>

    <!-- Действия -->
    <div class="publication-actions">
      <a 
        v-if="publication.links?.pdf" 
        :href="publication.links.pdf" 
        target="_blank" 
        rel="noopener"
        class="publication-link pdf-link"
        :aria-label="`Скачать PDF: ${publication.title}`"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
        </svg>
        PDF
      </a>
      
      <a 
        v-if="publication.links?.doi" 
        :href="publication.links.doi" 
        target="_blank" 
        rel="noopener"
        class="publication-link doi-link"
        :aria-label="`Открыть DOI: ${publication.title}`"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
          <polyline points="15 3 21 3 21 9"/>
          <line x1="10" y1="14" x2="21" y2="3"/>
        </svg>
        DOI
      </a>

      <a 
        v-if="publication.links?.url" 
        :href="publication.links.url" 
        target="_blank" 
        rel="noopener"
        class="publication-link website-link"
        :aria-label="`Открыть сайт: ${publication.title}`"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="2" y1="12" x2="22" y2="12"/>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        </svg>
        Сайт
      </a>
      
      <router-link 
        :to="`/publications/${publication.slug}`" 
        class="publication-link detail-link"
        :aria-label="`Подробнее о публикации: ${publication.title}`"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
        Подробнее
      </router-link>
    </div>
  </article>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { team } from '../data/team.js'

export default {
  name: 'PublicationCard',
  props: {
    publication: {
      type: Object,
      required: true
    },
    compact: {
      type: Boolean,
      default: false
    },
    activeTags: {
      type: Array,
      default: () => []
    },
    maxVisibleTags: {
      type: Number,
      default: 6
    }
  },
  emits: ['tag-click', 'article-click'],
  setup(props, { emit }) {
    const router = useRouter()
    const showQuickPreview = ref(false)
    const previewTrigger = ref(null)
    const previewPopover = ref(null)
    const tagsExpanded = ref(false)

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

    const getBadgeLabel = (badge) => {
      const labels = {
        'best-paper': 'Best Paper',
        'indexed': 'Indexed',
        'scopus': 'Scopus',
        'wos': 'Web of Science',
        'rinc': 'РИНЦ',
        'peer-reviewed': 'Рецензируемая'
      }
      return labels[badge] || badge
    }

    const getPersonSlug = (personId) => {
      const person = team.find(p => p.id === personId)
      return person?.slug || personId
    }

    const truncateVenue = (venue) => {
      if (!venue) return ''
      // Сокращаем длинные названия площадок
      if (venue.length > 50) {
        return venue.substring(0, 47) + '...'
      }
      return venue
    }

    const openArticle = () => {
      emit('article-click', props.publication)
    }

    const openModal = () => {
      router.replace({
        query: { ...router.currentRoute.value.query, pub: props.publication.slug }
      })
    }

    const toggleQuickPreview = () => {
      showQuickPreview.value = !showQuickPreview.value
    }

    const closeQuickPreview = () => {
      showQuickPreview.value = false
    }

    // Обработка тегов
    const toggleTagsExpanded = () => {
      tagsExpanded.value = !tagsExpanded.value
    }

    // Вычисляемые свойства для тегов
    const processedTags = computed(() => {
      if (!props.publication.tags || !props.publication.tags.length) return []
      
      return props.publication.tags.map(tag => ({
        name: tag,
        isActive: props.activeTags.includes(tag)
      }))
    })

    const visibleTags = computed(() => {
      if (!processedTags.value.length) return []
      
      if (tagsExpanded.value) {
        return processedTags.value
      }
      
      // Разделяем активные и неактивные теги
      const activeTags = processedTags.value.filter(tag => tag.isActive)
      const inactiveTags = processedTags.value.filter(tag => !tag.isActive)
      
      // Определяем, сколько неактивных тегов можем показать
      const remainingSlots = Math.max(0, props.maxVisibleTags - activeTags.length)
      const visibleInactiveTags = inactiveTags.slice(0, remainingSlots)
      
      // Возвращаем все активные теги + видимые неактивные
      return [...activeTags, ...visibleInactiveTags]
    })

    const hiddenTagsCount = computed(() => {
      if (tagsExpanded.value || !processedTags.value.length) return 0
      return processedTags.value.length - visibleTags.value.length
    })

    // Закрытие по клику вне
    const handleClickOutside = (event) => {
      if (previewPopover.value && !previewPopover.value.contains(event.target) && 
          previewTrigger.value && !previewTrigger.value.contains(event.target)) {
        closeQuickPreview()
      }
    }

    // Закрытие по Escape
    const handleKeydown = (event) => {
      if (event.key === 'Escape' && showQuickPreview.value) {
        closeQuickPreview()
      }
    }

    onMounted(() => {
      document.addEventListener('click', handleClickOutside)
      document.addEventListener('keydown', handleKeydown)
    })

    onUnmounted(() => {
      document.removeEventListener('click', handleClickOutside)
      document.removeEventListener('keydown', handleKeydown)
    })

    return {
      showQuickPreview,
      previewTrigger,
      previewPopover,
      tagsExpanded,
      getTypeLabel,
      getBadgeLabel,
      getPersonSlug,
      truncateVenue,
      openArticle,
      openModal,
      toggleQuickPreview,
      closeQuickPreview,
      toggleTagsExpanded,
      visibleTags,
      hiddenTagsCount
    }
  }
}
</script>

<style scoped>
/* Используем CSS переменные из основной темы сайта */
.publication-card {
  background: var(--gradient-glass);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
  box-shadow: var(--shadow-md);
}

.publication-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-xl);
  border-color: rgba(102, 126, 234, 0.3);
}

.publication-card.compact {
  padding: 1.25rem;
  gap: 0.75rem;
}

/* Метаданные */
.publication-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}

.meta-main {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
  min-width: 0;
}

.meta-authors {
  color: var(--text-primary);
  font-weight: 500;
  font-size: 0.875rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
}

.meta-separator {
  color: var(--text-light);
  font-weight: 400;
  margin: 0 0.125rem;
}

.publication-type {
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.025em;
}

.type-article {
  background: rgba(16, 185, 129, 0.15);
  color: #059669;
}

.type-conference {
  background: rgba(59, 130, 246, 0.15);
  color: #2563eb;
}

.type-thesis {
  background: rgba(245, 158, 11, 0.15);
  color: #d97706;
}

.type-preprint {
  background: rgba(139, 92, 246, 0.15);
  color: #7c3aed;
}

.type-report {
  background: rgba(236, 72, 153, 0.15);
  color: #be185d;
}

.type-book, .type-chapter {
  background: rgba(107, 114, 128, 0.15);
  color: #374151;
}

.publication-year {
  color: #6b7280;
  font-size: 0.875rem;
  font-weight: 500;
}

.publication-badges {
  display: flex;
  gap: 0.375rem;
  flex-wrap: wrap;
  align-items: center;
  flex-shrink: 0;
}

.publication-badge {
  padding: 0.125rem 0.5rem;
  border-radius: 4px;
  font-size: 0.625rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.025em;
}

.badge-best-paper {
  background: rgba(239, 68, 68, 0.15);
  color: #dc2626;
}

.badge-indexed, .badge-scopus, .badge-wos {
  background: rgba(16, 185, 129, 0.15);
  color: #059669;
}

.badge-rinc {
  background: rgba(59, 130, 246, 0.15);
  color: #2563eb;
}

.badge-peer-reviewed {
  background: rgba(107, 114, 128, 0.15);
  color: #374151;
}

/* Заголовок с быстрым просмотром */
.publication-title-container {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
}

.publication-title {
  color: var(--text-primary);
  font-size: 1.125rem;
  font-weight: 700;
  line-height: 1.4;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  cursor: pointer;
  transition: color 0.2s ease;
  flex: 1;
}

.publication-title:hover {
  color: var(--primary-color);
}

.compact .publication-title {
  font-size: 1rem;
  -webkit-line-clamp: 2;
}

.quick-preview-btn {
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 28px;
  min-height: 28px;
  flex-shrink: 0;
}

.quick-preview-btn:hover {
  color: var(--primary-color);
  background: rgba(102, 126, 234, 0.1);
}

.quick-preview-btn:focus {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}

/* Быстрый просмотр */
.quick-preview-popover {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 1000;
  background: var(--gradient-glass);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-lg);
  backdrop-filter: blur(20px);
  box-shadow: var(--shadow-xl);
  margin-top: 0.5rem;
  max-width: 400px;
  width: max-content;
  min-width: 300px;
}

.quick-preview-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  gap: 1rem;
}

.quick-preview-header h4 {
  color: var(--text-primary);
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
  line-height: 1.3;
}

.close-btn {
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 24px;
  min-height: 24px;
  flex-shrink: 0;
}

.close-btn:hover {
  color: var(--text-primary);
  background: rgba(255, 255, 255, 0.1);
}

.close-btn:focus {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}

.quick-preview-content {
  padding: 1rem;
}

.preview-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1rem;
  font-size: 0.875rem;
}

.preview-year {
  color: var(--primary-color);
  font-weight: 600;
}

.preview-type {
  color: var(--text-secondary);
  padding: 0.25rem 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  font-size: 0.75rem;
  text-transform: uppercase;
  font-weight: 600;
}

.preview-venue {
  color: var(--text-secondary);
  font-style: italic;
}

.preview-abstract {
  color: var(--text-secondary);
  font-size: 0.875rem;
  line-height: 1.5;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.preview-authors {
  color: var(--text-secondary);
  font-size: 0.875rem;
  margin-bottom: 1rem;
  line-height: 1.4;
}

.preview-authors strong {
  color: var(--text-primary);
}

.preview-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
}

.btn-sm {
  padding: 0.375rem 0.75rem;
  font-size: 0.8125rem;
  border-radius: 6px;
}

/* Ссылки на авторов в метаданных */
.meta-authors .author-link {
  color: var(--primary-color);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: all 0.2s ease;
}

.meta-authors .author-link:hover {
  border-bottom-color: var(--primary-color);
}

.meta-authors .author-link:focus {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}

/* Площадка */
.publication-venue {
  color: var(--text-secondary);
  font-size: 0.875rem;
  font-style: italic;
  margin: 0;
  line-height: 1.4;
}

.compact .publication-venue {
  font-size: 0.8125rem;
}

/* Теги */
.publication-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.publication-tag {
  padding: 0.25rem 0.75rem;
  background: rgba(102, 126, 234, 0.1);
  color: #4f46e5;
  border: 1px solid rgba(102, 126, 234, 0.2);
  border-radius: 16px;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.publication-tag:hover {
  background: rgba(102, 126, 234, 0.2);
  border-color: rgba(102, 126, 234, 0.4);
  transform: scale(1.05);
}

.publication-tag:focus {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}

.publication-tag:focus:not(:focus-visible) {
  outline: none;
}

.publication-tag:focus-visible {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}

.publication-tag.tag-active {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
  font-weight: 600;
}

.publication-tag.tag-active:hover {
  background: var(--secondary-color);
  border-color: var(--secondary-color);
  transform: scale(1.05);
}

.publication-tag.tag-expand {
  background: rgba(255, 255, 255, 0.1);
  color: var(--text-secondary);
  border: 1px solid rgba(255, 255, 255, 0.2);
  font-weight: 500;
  cursor: pointer;
}

.publication-tag.tag-expand:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.3);
  color: var(--text-primary);
  transform: scale(1.05);
}

.compact .publication-tag {
  padding: 0.1875rem 0.625rem;
  font-size: 0.6875rem;
}

/* Действия */
.publication-actions {
  display: flex;
  gap: 0.75rem;
  margin-top: auto;
  flex-wrap: wrap;
}

.publication-link {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem 1rem;
  background: rgba(102, 126, 234, 0.1);
  color: #4f46e5;
  text-decoration: none;
  border: 1px solid rgba(102, 126, 234, 0.2);
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;
  min-height: 44px;
  min-width: 44px;
  justify-content: center;
}

.publication-link:hover {
  background: rgba(102, 126, 234, 0.2);
  border-color: rgba(102, 126, 234, 0.4);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(102, 126, 234, 0.2);
}

.publication-link:focus {
  outline: 2px solid #4f46e5;
  outline-offset: 2px;
}

.compact .publication-link {
  padding: 0.375rem 0.75rem;
  font-size: 0.8125rem;
  gap: 0.25rem;
}

.compact .publication-actions {
  gap: 0.5rem;
}

.pdf-link {
  background: rgba(239, 68, 68, 0.1);
  color: #dc2626;
  border-color: rgba(239, 68, 68, 0.2);
}

.pdf-link:hover {
  background: rgba(239, 68, 68, 0.2);
  border-color: rgba(239, 68, 68, 0.4);
  box-shadow: 0 4px 8px rgba(239, 68, 68, 0.2);
}

.doi-link {
  background: rgba(16, 185, 129, 0.1);
  color: #059669;
  border-color: rgba(16, 185, 129, 0.2);
}

.doi-link:hover {
  background: rgba(16, 185, 129, 0.2);
  border-color: rgba(16, 185, 129, 0.4);
  box-shadow: 0 4px 8px rgba(16, 185, 129, 0.2);
}

.website-link {
  background: rgba(107, 114, 128, 0.1);
  color: #374151;
  border-color: rgba(107, 114, 128, 0.2);
}

.website-link:hover {
  background: rgba(107, 114, 128, 0.2);
  border-color: rgba(107, 114, 128, 0.4);
  box-shadow: 0 4px 8px rgba(107, 114, 128, 0.2);
}

.detail-link {
  background: rgba(102, 126, 234, 0.1);
  color: #4f46e5;
  border-color: rgba(102, 126, 234, 0.2);
}

.detail-link:hover {
  background: rgba(102, 126, 234, 0.2);
  border-color: rgba(102, 126, 234, 0.4);
  box-shadow: 0 4px 8px rgba(102, 126, 234, 0.2);
}

/* Адаптивность */
@media (max-width: 768px) {
  .publication-card {
    padding: 1.25rem;
  }
  
  .publication-title {
    font-size: 1rem;
  }
  
  .publication-authors,
  .publication-venue {
    font-size: 0.8125rem;
  }
  
  .publication-actions {
    gap: 0.5rem;
  }
  
  .publication-link {
    padding: 0.375rem 0.75rem;
    font-size: 0.8125rem;
    flex: 1;
    min-width: auto;
  }
  
  .quick-preview-popover {
    left: -1rem;
    right: -1rem;
    max-width: none;
    min-width: auto;
  }
  
  .quick-preview-header h4 {
    font-size: 0.9rem;
  }
  
  .preview-meta {
    flex-direction: column;
    gap: 0.5rem;
  }
}

/* Поддержка prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  .publication-card,
  .publication-tag,
  .publication-link,
  .quick-preview-btn,
  .close-btn,
  .author-link {
    transition: none;
  }
  
  .publication-card:hover,
  .publication-tag:hover,
  .publication-link:hover {
    transform: none;
  }
}

/* Высокий контраст */
@media (prefers-contrast: high) {
  .publication-card {
    border-width: 2px;
    border-color: #000;
  }
  
  .publication-title {
    font-weight: 800;
  }
  
  .publication-link {
    border-width: 2px;
  }
}
</style>
