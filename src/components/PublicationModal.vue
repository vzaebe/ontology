<template>
  <!-- Backdrop -->
  <Teleport to="body">
    <div 
      v-if="isVisible" 
      class="publication-modal-backdrop"
      @click="handleBackdropClick"
      :aria-hidden="!isVisible"
    >
      <!-- Modal Content -->
      <div 
        class="publication-modal-content"
        role="dialog"
        :aria-labelledby="modalId + '-title'"
        :aria-describedby="modalId + '-description'"
        @click.stop
        ref="modalContent"
        :class="{ 'is-closing': isClosing }"
      >
        <!-- Header -->
        <header class="modal-header">
          <h2 :id="modalId + '-title'" class="modal-title">
            {{ publication?.title || 'Публикация' }}
          </h2>
          <button 
            class="modal-close-btn"
            @click="closeModal"
            aria-label="Закрыть модальное окно"
            type="button"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </header>

        <!-- Loading State -->
        <div v-if="loading" class="modal-loading">
          <div class="loading-spinner"></div>
          <p>Загрузка публикации...</p>
        </div>

        <!-- Publication Content -->
        <div v-else-if="publication" class="modal-body">
          <div class="publication-modal-layout">
            <!-- Main Content -->
            <main class="modal-main-content">
              <!-- Meta Information -->
              <div class="publication-meta">
                <span class="publication-type" :class="`type-${publication.type}`">
                  {{ getTypeLabel(publication.type) }}
                </span>
                <span class="publication-year">{{ publication.year }}</span>
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

              <!-- Venue -->
              <div class="publication-venue">
                <h3>{{ publication.venue }}</h3>
                <div class="venue-details" v-if="publication.issue || publication.pages">
                  <span v-if="publication.issue">{{ publication.issue }}</span>
                  <span v-if="publication.pages && publication.issue">, </span>
                  <span v-if="publication.pages">стр. {{ publication.pages }}</span>
                </div>
              </div>

              <!-- Authors -->
              <div class="publication-authors" v-if="publication.authors && publication.authors.length">
                <h4>Авторы</h4>
                <div class="authors-list">
                  <span v-for="(author, index) in publication.authors" :key="index" class="author-item">
                    <router-link 
                      v-if="author.personId" 
                      :to="`/team/${getPersonSlug(author.personId)}`"
                      class="author-link"
                      @click="closeModal"
                    >
                      {{ author.name }}
                    </router-link>
                    <span v-else>{{ author.name }}</span><span v-if="index < publication.authors.length - 1">, </span>
                  </span>
                </div>
              </div>

              <!-- Abstract -->
              <div class="publication-abstract" v-if="publication.abstract" :id="modalId + '-description'">
                <h4>Аннотация</h4>
                <p>{{ publication.abstract }}</p>
              </div>

              <!-- Tags -->
              <div class="publication-tags" v-if="publication.tags && publication.tags.length">
                <h4>Теги</h4>
                <div class="tags-list">
                  <button 
                    v-for="tag in publication.tags" 
                    :key="tag"
                    class="tag-button"
                    @click="handleTagClick(tag)"
                  >
                    {{ tag }}
                  </button>
                </div>
              </div>

              <!-- Keywords -->
              <div class="publication-keywords" v-if="publication.keywords && publication.keywords.length">
                <h4>Ключевые слова</h4>
                <div class="keywords-list">
                  <span v-for="keyword in publication.keywords" :key="keyword" class="keyword-tag">
                    {{ keyword }}
                  </span>
                </div>
              </div>
            </main>

            <!-- Sidebar Actions -->
            <aside class="modal-sidebar">
              <div class="actions-section">
                <h4>Доступ к публикации</h4>
                <div class="action-buttons">
                  <a 
                    v-if="publication.links?.pdf" 
                    :href="publication.links.pdf" 
                    target="_blank" 
                    rel="noopener"
                    class="action-btn pdf-btn"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                      <polyline points="14 2 14 8 20 8"/>
                    </svg>
                    Скачать PDF
                  </a>
                  
                  <a 
                    v-if="publication.links?.doi" 
                    :href="publication.links.doi" 
                    target="_blank" 
                    rel="noopener"
                    class="action-btn doi-btn"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                      <polyline points="15 3 21 3 21 9"/>
                      <line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                    Открыть DOI
                  </a>

                  <router-link 
                    :to="`/publications/${publication.slug}`" 
                    class="action-btn detail-btn"
                    @click="closeModal"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                    Подробнее
                  </router-link>
                </div>
              </div>

              <!-- Share Section -->
              <div class="share-section">
                <h4>Поделиться</h4>
                <div class="share-buttons">
                  <button class="share-btn" @click="copyLink" title="Скопировать ссылку">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                    </svg>
                    Ссылка
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </div>

        <!-- Error State -->
        <div v-else class="modal-error">
          <h3>Публикация не найдена</h3>
          <p>Публикация с указанным идентификатором не существует или была удалена.</p>
          <button class="btn btn-primary" @click="closeModal">
            Закрыть
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script>
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { publications } from '../data/publications.js'
import { team } from '../data/team.js'

export default {
  name: 'PublicationModal',
  emits: ['close', 'tag-click'],
  setup(props, { emit }) {
    const route = useRoute()
    const router = useRouter()
    
    const isVisible = ref(false)
    const loading = ref(false)
    const publication = ref(null)
    const isClosing = ref(false)
    const modalContent = ref(null)
    const modalId = `publication-modal-${Math.random().toString(36).substr(2, 9)}`

    // URL Management
    const publicationSlug = computed(() => route.query.pub)

    // Labels
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

    // Modal Management
    const openModal = async (slug) => {
      loading.value = true
      publication.value = null
      isVisible.value = true
      
      // Добавляем в URL параметр pub
      if (route.query.pub !== slug) {
        await router.replace({ 
          ...route, 
          query: { ...route.query, pub: slug } 
        })
      }

      try {
        // Симуляция загрузки
        await new Promise(resolve => setTimeout(resolve, 300))
        
        const found = publications.find(pub => pub.slug === slug)
        publication.value = found || null
        
        if (found) {
          // Фокус на модальном окне для доступности
          await nextTick()
          if (modalContent.value) {
            modalContent.value.focus()
          }
          
          // Блокируем скролл body
          document.body.style.overflow = 'hidden'
        }
      } catch (error) {
        console.error('Ошибка загрузки публикации:', error)
        publication.value = null
      } finally {
        loading.value = false
      }
    }

    const closeModal = async () => {
      isClosing.value = true
      
      // Убираем параметр pub из URL
      const newQuery = { ...route.query }
      delete newQuery.pub
      
      await router.replace({ 
        ...route, 
        query: Object.keys(newQuery).length ? newQuery : undefined 
      })
      
      // Анимация закрытия
      setTimeout(() => {
        isVisible.value = false
        isClosing.value = false
        publication.value = null
        
        // Восстанавливаем скролл
        document.body.style.overflow = ''
        
        emit('close')
      }, 150)
    }

    const handleBackdropClick = () => {
      closeModal()
    }

    // Keyboard Navigation
    const handleKeydown = (event) => {
      if (!isVisible.value) return
      
      if (event.key === 'Escape') {
        closeModal()
      }
      
      // Trap focus within modal
      if (event.key === 'Tab') {
        const focusableElements = modalContent.value?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        
        if (focusableElements && focusableElements.length > 0) {
          const firstElement = focusableElements[0]
          const lastElement = focusableElements[focusableElements.length - 1]
          
          if (event.shiftKey && document.activeElement === firstElement) {
            event.preventDefault()
            lastElement.focus()
          } else if (!event.shiftKey && document.activeElement === lastElement) {
            event.preventDefault()
            firstElement.focus()
          }
        }
      }
    }

    // Event Handlers
    const handleTagClick = (tag) => {
      emit('tag-click', tag)
      closeModal()
    }

    const copyLink = async () => {
      const url = `${window.location.origin}${window.location.pathname}${window.location.search}`
      try {
        await navigator.clipboard.writeText(url)
        // В реальном приложении здесь должно быть toast-уведомление
        alert('Ссылка скопирована!')
      } catch (error) {
        console.error('Не удалось скопировать ссылку:', error)
      }
    }

    // Watch for URL changes
    watch(publicationSlug, (newSlug, oldSlug) => {
      if (newSlug && newSlug !== oldSlug) {
        openModal(newSlug)
      } else if (!newSlug && isVisible.value) {
        isVisible.value = false
        publication.value = null
        document.body.style.overflow = ''
      }
    }, { immediate: true })

    // Lifecycle
    onMounted(() => {
      document.addEventListener('keydown', handleKeydown)
      
      // Если в URL уже есть параметр pub, открываем модал
      if (publicationSlug.value) {
        openModal(publicationSlug.value)
      }
    })

    onUnmounted(() => {
      document.removeEventListener('keydown', handleKeydown)
      document.body.style.overflow = ''
    })

    return {
      isVisible,
      loading,
      publication,
      isClosing,
      modalContent,
      modalId,
      getTypeLabel,
      getBadgeLabel,
      getPersonSlug,
      closeModal,
      handleBackdropClick,
      handleTagClick,
      copyLink
    }
  }
}
</script>

<style scoped>
/* Modal Backdrop */
.publication-modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(4px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Modal Content */
.publication-modal-content {
  background: var(--gradient-glass);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-lg);
  backdrop-filter: blur(20px);
  box-shadow: var(--shadow-xl);
  width: 100%;
  max-width: 900px;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  animation: slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  outline: none;
}

.publication-modal-content.is-closing {
  animation: slideOut 0.15s ease-in;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(-20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes slideOut {
  from {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
  to {
    opacity: 0;
    transform: scale(0.95) translateY(-20px);
  }
}

/* Modal Header */
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  gap: 1rem;
}

.modal-title {
  color: var(--text-primary);
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0;
  line-height: 1.4;
  flex: 1;
}

.modal-close-btn {
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: var(--radius-md);
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 44px;
  min-height: 44px;
  flex-shrink: 0;
}

.modal-close-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: var(--text-primary);
}

.modal-close-btn:focus {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}

/* Modal Body */
.modal-body {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
}

.publication-modal-layout {
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: 2rem;
  align-items: start;
}

/* Main Content */
.modal-main-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.publication-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.publication-type {
  padding: 0.375rem 1rem;
  border-radius: 8px;
  font-size: 0.875rem;
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

.publication-year {
  color: var(--primary-color);
  font-weight: 600;
}

.publication-badges {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.publication-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.025em;
}

.badge-best-paper {
  background: rgba(239, 68, 68, 0.15);
  color: #dc2626;
}

.badge-peer-reviewed {
  background: rgba(107, 114, 128, 0.15);
  color: #374151;
}

.badge-scopus, .badge-wos, .badge-rinc {
  background: rgba(16, 185, 129, 0.15);
  color: #059669;
}

.publication-venue h3 {
  color: var(--primary-color);
  font-size: 1.125rem;
  margin: 0 0 0.5rem 0;
}

.venue-details {
  color: var(--text-secondary);
  font-size: 0.875rem;
  font-style: italic;
}

.publication-authors h4,
.publication-abstract h4,
.publication-tags h4,
.publication-keywords h4 {
  color: var(--text-primary);
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.75rem 0;
}

.authors-list {
  color: var(--text-secondary);
  line-height: 1.5;
}

.author-link {
  color: var(--primary-color);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s ease;
}

.author-link:hover {
  border-bottom-color: var(--primary-color);
}

.publication-abstract p {
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0;
}

.tags-list,
.keywords-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag-button {
  padding: 0.375rem 0.75rem;
  background: rgba(102, 126, 234, 0.1);
  color: #4f46e5;
  border: 1px solid rgba(102, 126, 234, 0.2);
  border-radius: 16px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.tag-button:hover {
  background: rgba(102, 126, 234, 0.2);
  border-color: rgba(102, 126, 234, 0.4);
}

.keyword-tag {
  padding: 0.375rem 0.75rem;
  background: rgba(107, 114, 128, 0.1);
  color: var(--text-primary);
  border: 1px solid rgba(107, 114, 128, 0.2);
  border-radius: 16px;
  font-size: 0.875rem;
}

/* Sidebar */
.modal-sidebar {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.actions-section,
.share-section {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
}

.actions-section h4,
.share-section h4 {
  color: var(--text-primary);
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
}

.action-buttons,
.share-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.action-btn,
.share-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: var(--radius-md);
  text-decoration: none;
  transition: all 0.2s ease;
  font-size: 0.875rem;
  font-weight: 500;
  min-height: 44px;
  border: none;
  cursor: pointer;
}

.pdf-btn {
  background: rgba(239, 68, 68, 0.1);
  color: #dc2626;
  border: 1px solid rgba(239, 68, 68, 0.2);
}

.pdf-btn:hover {
  background: rgba(239, 68, 68, 0.2);
  border-color: rgba(239, 68, 68, 0.3);
}

.doi-btn {
  background: rgba(16, 185, 129, 0.1);
  color: #059669;
  border: 1px solid rgba(16, 185, 129, 0.2);
}

.doi-btn:hover {
  background: rgba(16, 185, 129, 0.2);
  border-color: rgba(16, 185, 129, 0.3);
}

.detail-btn {
  background: rgba(102, 126, 234, 0.1);
  color: #4f46e5;
  border: 1px solid rgba(102, 126, 234, 0.2);
}

.detail-btn:hover {
  background: rgba(102, 126, 234, 0.2);
  border-color: rgba(102, 126, 234, 0.3);
}

.share-btn {
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-primary);
  border: 1px solid rgba(255, 255, 255, 0.1);
  justify-content: center;
}

.share-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
}

/* Loading and Error States */
.modal-loading,
.modal-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 2rem;
  text-align: center;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(102, 126, 234, 0.1);
  border-top: 3px solid var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.modal-loading p,
.modal-error p {
  color: var(--text-secondary);
  margin: 0.5rem 0 1rem;
}

.modal-error h3 {
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

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
}

.btn-primary {
  background: var(--primary-color);
  color: white;
}

.btn-primary:hover {
  background: var(--secondary-color);
}

/* Responsive Design */
@media (max-width: 768px) {
  .publication-modal-backdrop {
    padding: 0.5rem;
  }
  
  .publication-modal-content {
    max-height: 95vh;
    border-radius: var(--radius-md);
  }
  
  .publication-modal-layout {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .modal-sidebar {
    order: -1;
  }
  
  .modal-header {
    padding: 1rem;
  }
  
  .modal-body {
    padding: 1rem;
  }
  
  .modal-title {
    font-size: 1.125rem;
  }
  
  .action-buttons {
    flex-direction: row;
    flex-wrap: wrap;
  }
  
  .action-btn {
    flex: 1;
    min-width: 120px;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .publication-modal-content,
  .action-btn,
  .tag-button,
  .loading-spinner {
    animation: none;
    transition: none;
  }
}

/* High Contrast */
@media (prefers-contrast: high) {
  .publication-modal-content {
    border-width: 2px;
    border-color: var(--text-primary);
  }
  
  .modal-title {
    font-weight: 800;
  }
  
  .action-btn,
  .tag-button {
    border-width: 2px;
  }
}
</style>
