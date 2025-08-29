<template>
  <div class="publication-page">
    <!-- Заголовок публикации -->
    <div class="publication-header">
      <div class="container">
        <!-- Хлебные крошки -->
        <nav class="breadcrumb" aria-label="breadcrumb">
          <ol class="breadcrumb-list">
            <li class="breadcrumb-item">
              <router-link to="/">Главная</router-link>
            </li>
            <li class="breadcrumb-item">
              <router-link to="/publications">Публикации</router-link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              {{ publication?.title || 'Публикация' }}
            </li>
          </ol>
        </nav>

        <!-- Заголовок и метаданные -->
        <div class="publication-meta-header" v-if="publication">
          <div class="publication-type-badge" :class="`type-${publication.type}`">
            {{ getTypeLabel(publication.type) }}
          </div>
          
          <h1 class="publication-title">{{ publication.title }}</h1>
          
          <div class="publication-meta">
            <div class="meta-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="3"/>
                <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/>
              </svg>
              <span>{{ publication.year }}</span>
            </div>
            
            <div class="meta-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
              </svg>
              <span>{{ publication.venue }}</span>
            </div>
            
            <div class="meta-item" v-if="publication.issue">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <line x1="9" y1="9" x2="15" y2="9"/>
                <line x1="9" y1="15" x2="15" y2="15"/>
              </svg>
              <span>{{ publication.issue }}</span>
            </div>
            
            <div class="meta-item" v-if="publication.pages">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
              </svg>
              <span>стр. {{ publication.pages }}</span>
            </div>
          </div>

          <!-- Значки -->
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
      </div>
    </div>

    <!-- Основной контент -->
    <div class="container" v-if="publication">
      <div class="publication-layout">
        <!-- Основная колонка -->
        <main class="publication-main">
          <!-- PDF Viewer -->
          <div class="publication-viewer" v-if="publication.links?.pdf && showPDFViewer">
            <div class="viewer-header">
              <h3>Просмотр документа</h3>
              <div class="viewer-controls">
                <button 
                  class="viewer-control-btn" 
                  @click="togglePDFViewer"
                  aria-label="Скрыть PDF"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                  Скрыть
                </button>
                <a 
                  :href="publication.links.pdf" 
                  target="_blank" 
                  rel="noopener"
                  class="viewer-control-btn external"
                  aria-label="Открыть PDF в новой вкладке"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    <polyline points="15 3 21 3 21 9"/>
                    <line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                  Открыть
                </a>
              </div>
            </div>
            
            <div class="pdf-container">
              <iframe 
                :src="publication.links.pdf" 
                class="pdf-iframe"
                title="PDF документ публикации"
                loading="lazy"
              ></iframe>
            </div>
          </div>

          <!-- Кнопка показать PDF -->
          <div class="show-pdf-section" v-else-if="publication.links?.pdf">
            <button 
              class="show-pdf-btn"
              @click="togglePDFViewer"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
              </svg>
              Показать PDF
            </button>
          </div>

          <!-- Авторы -->
          <section class="publication-section" v-if="publication.authors && publication.authors.length">
            <h3>Авторы</h3>
            <div class="authors-list">
              <div v-for="(author, index) in publication.authors" :key="index" class="author-item">
                <router-link
                  v-if="author.personId"
                  :to="`/team/${getPersonSlug(author.personId)}`"
                  class="author-link"
                >
                  <div class="author-avatar">
                    {{ getAuthorInitials(author.name) }}
                  </div>
                  <span class="author-name">{{ author.name }}</span>
                </router-link>
                <div v-else class="author-item-static">
                  <div class="author-avatar">
                    {{ getAuthorInitials(author.name) }}
                  </div>
                  <span class="author-name">{{ author.name }}</span>
                </div>
              </div>
            </div>
          </section>

          <!-- Аннотация -->
          <section class="publication-section" v-if="publication.abstract">
            <h3>Аннотация</h3>
            <div class="abstract-content">
              <p>{{ publication.abstract }}</p>
            </div>
          </section>

          <!-- Ключевые слова -->
          <section class="publication-section" v-if="publication.keywords && publication.keywords.length">
            <h3>Ключевые слова</h3>
            <div class="keywords-list">
              <span v-for="keyword in publication.keywords" :key="keyword" class="keyword-tag">
                {{ keyword }}
              </span>
            </div>
          </section>

          <!-- Теги -->
          <section class="publication-section" v-if="publication.tags && publication.tags.length">
            <h3>Теги</h3>
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
          </section>

          <!-- Организации -->
          <section class="publication-section" v-if="publication.orgs && publication.orgs.length">
            <h3>Организации</h3>
            <div class="orgs-list">
              <div v-for="org in publication.orgs" :key="org.id" class="org-item">
                <h4>{{ org.name }}</h4>
                <p class="org-role">{{ org.role }}</p>
              </div>
          </div>
          </section>

          <!-- Стандарты (если есть) -->
          <section class="publication-section" v-if="publication.standards && publication.standards.length">
            <h3>Связанные стандарты</h3>
            <div class="standards-list">
              <span v-for="standard in publication.standards" :key="standard" class="standard-tag">
                {{ standard }}
              </span>
            </div>
          </section>
        </main>

        <!-- Боковая панель -->
        <aside class="publication-sidebar">
          <!-- Действия -->
          <div class="sidebar-section">
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

              <a
                v-if="publication.links?.url"
                :href="publication.links.url"
                target="_blank"
                rel="noopener"
                class="action-btn website-btn"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="2" y1="12" x2="22" y2="12"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
                Веб-сайт
              </a>
            </div>
          </div>

          <!-- Поделиться -->
          <div class="sidebar-section">
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

          <!-- Цитирование -->
          <div class="sidebar-section">
            <h4>Цитирование</h4>
            <div class="citation-section">
              <div class="citation-format">
                <h5>APA</h5>
                <div class="citation-text">
                  {{ formatCitationAPA(publication) }}
                </div>
                <button class="copy-citation-btn" @click="copyCitation('apa')">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                  </svg>
                  Копировать
                </button>
              </div>
            </div>
          </div>

          <!-- Связанные публикации -->
          <div class="sidebar-section" v-if="relatedPublications.length">
            <h4>Похожие публикации</h4>
            <div class="related-publications">
              <router-link
                v-for="related in relatedPublications"
                :key="related.id"
                :to="`/publications/${related.slug}`"
                class="related-publication-link"
              >
                <h5>{{ related.title }}</h5>
                <p>{{ related.venue }}, {{ related.year }}</p>
              </router-link>
            </div>
          </div>
        </aside>
      </div>
    </div>

    <!-- Состояние загрузки -->
    <div class="loading-state" v-else-if="loading">
      <div class="container">
        <div class="loading-content">
          <div class="loading-spinner"></div>
          <p>Загрузка публикации...</p>
        </div>
      </div>
    </div>

    <!-- Состояние ошибки -->
    <div class="error-state" v-else>
      <div class="container">
        <div class="error-content">
          <h2>Публикация не найдена</h2>
          <p>Публикация с указанным идентификатором не существует или была удалена.</p>
          <router-link to="/publications" class="btn btn-primary">
            Вернуться к списку публикаций
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { publications } from '../data/publications.js'
import { team } from '../data/team.js'

export default {
  name: 'PublicationPage',
  setup() {
    const route = useRoute()
    const router = useRouter()

    const publication = ref(null)
    const loading = ref(true)
    const showPDFViewer = ref(false)

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

    // Значки
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

    // Получение slug пользователя
    const getPersonSlug = (personId) => {
      const person = team.find(p => p.id === personId)
      return person?.slug || personId
    }

    // Получение инициалов автора
    const getAuthorInitials = (name) => {
      return name.split(' ')
        .map(part => part.charAt(0))
        .join('')
        .toUpperCase()
        .slice(0, 2)
    }

    // Форматирование цитирования APA
    const formatCitationAPA = (pub) => {
      if (!pub) return ''
      
      const authors = pub.authors?.map(a => a.name).join(', ') || 'Автор неизвестен'
      const year = pub.year
      const title = pub.title
      const venue = pub.venue
      
      return `${authors} (${year}). ${title}. ${venue}.`
    }

    // Похожие публикации
    const relatedPublications = computed(() => {
      if (!publication.value) return []
      
      return publications
        .filter(p => 
          p.id !== publication.value.id &&
          (p.tags?.some(tag => publication.value.tags?.includes(tag)) ||
           p.type === publication.value.type ||
           p.venue === publication.value.venue)
        )
        .slice(0, 5)
    })

    // Загрузка публикации
    const loadPublication = async (slug) => {
      loading.value = true
      
      try {
        // Симуляция загрузки
        await new Promise(resolve => setTimeout(resolve, 300))
        
        const found = publications.find(p => p.slug === slug)
        publication.value = found || null
        
        // Установка заголовка страницы
        if (found) {
          document.title = `${found.title} - Ontology.ru`
        }
        
      } catch (error) {
        console.error('Ошибка загрузки публикации:', error)
        publication.value = null
      } finally {
        loading.value = false
      }
    }

    // Переключение PDF viewer
    const togglePDFViewer = () => {
      showPDFViewer.value = !showPDFViewer.value
    }

    // Обработчик клика по тегу
    const handleTagClick = (tag) => {
      router.push({
        path: '/publications',
        query: { tags: tag }
      })
    }

    // Копирование ссылки
    const copyLink = async () => {
      try {
        await navigator.clipboard.writeText(window.location.href)
        // В реальном приложении здесь должно быть toast-уведомление
        alert('Ссылка скопирована!')
      } catch (error) {
        console.error('Не удалось скопировать ссылку:', error)
      }
    }

    // Копирование цитирования
    const copyCitation = async (format) => {
      try {
        const citation = formatCitationAPA(publication.value)
        await navigator.clipboard.writeText(citation)
        alert('Цитирование скопировано!')
      } catch (error) {
        console.error('Не удалось скопировать цитирование:', error)
      }
    }

    // Слежение за изменениями маршрута
    watch(() => route.params.slug, (newSlug) => {
      if (newSlug) {
        loadPublication(newSlug)
      }
    }, { immediate: true })

    onMounted(() => {
      // Загружаем публикацию при монтировании
      if (route.params.slug) {
        loadPublication(route.params.slug)
      }
    })

    return {
      publication,
      loading,
      showPDFViewer,
      relatedPublications,
      getTypeLabel,
      getBadgeLabel,
      getPersonSlug,
      getAuthorInitials,
      formatCitationAPA,
      togglePDFViewer,
      handleTagClick,
      copyLink,
      copyCitation
    }
  }
}
</script>

<style scoped>
.publication-page {
  min-height: 100vh;
  color: var(--text-primary);
}

/* Заголовок публикации */
.publication-header {
  background: var(--gradient-glass);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2rem 0;
  margin-bottom: 2rem;
}

/* Хлебные крошки */
.breadcrumb {
  margin-bottom: 1.5rem;
}

.breadcrumb-list {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: 0.875rem;
}

.breadcrumb-item {
  display: flex;
  align-items: center;
}

.breadcrumb-item:not(:last-child)::after {
  content: '/';
  margin-left: 0.5rem;
  color: var(--text-secondary);
}

.breadcrumb-item a {
  color: var(--primary-color);
  text-decoration: none;
  transition: color 0.2s ease;
}

.breadcrumb-item a:hover {
  color: var(--secondary-color);
}

.breadcrumb-item.active {
  color: var(--text-secondary);
}

/* Метаданные заголовка */
.publication-meta-header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.publication-type-badge {
  align-self: flex-start;
  padding: 0.5rem 1rem;
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

.publication-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0;
  line-height: 1.2;
  background: var(--gradient-text);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.publication-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
  font-size: 0.875rem;
}

.meta-item svg {
  color: var(--primary-color);
}

.publication-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
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

/* Основная разметка */
.publication-layout {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 2rem;
  align-items: start;
}

.publication-main {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* PDF Viewer */
.publication-viewer,
.show-pdf-section {
  background: var(--gradient-glass);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.viewer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.viewer-header h3 {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
}

.viewer-controls {
  display: flex;
  gap: 0.5rem;
}

.viewer-control-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--text-primary);
  border-radius: var(--radius-md);
  text-decoration: none;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  cursor: pointer;
}

.viewer-control-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
}

.pdf-container {
  width: 100%;
  height: 600px;
  position: relative;
}

.pdf-iframe {
  width: 100%;
  height: 100%;
  border: none;
}

.show-pdf-section {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem;
}

.show-pdf-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: var(--radius-lg);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.show-pdf-btn:hover {
  background: var(--secondary-color);
  transform: translateY(-2px);
}

/* Секции контента */
.publication-section {
  background: var(--gradient-glass);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
}

.publication-section h3 {
  margin: 0 0 1rem 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
}

/* Авторы */
.authors-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.author-item,
.author-item-static {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.author-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-md);
  text-decoration: none;
  color: var(--text-primary);
  transition: all 0.2s ease;
}

.author-link:hover {
  background: rgba(102, 126, 234, 0.15);
  border-color: rgba(102, 126, 234, 0.3);
  color: #4f46e5;
}

.author-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--primary-color);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.875rem;
}

.author-name {
  font-weight: 500;
}

/* Аннотация */
.abstract-content p {
  line-height: 1.7;
  color: var(--text-secondary);
  margin: 0;
}

/* Теги и ключевые слова */
.tags-list,
.keywords-list,
.standards-list {
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

.keyword-tag,
.standard-tag {
  padding: 0.375rem 0.75rem;
  background: rgba(107, 114, 128, 0.1);
  color: var(--text-primary);
  border: 1px solid rgba(107, 114, 128, 0.2);
  border-radius: 16px;
  font-size: 0.875rem;
}

/* Организации */
.orgs-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.org-item h4 {
  margin: 0 0 0.25rem 0;
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
}

.org-role {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.875rem;
}

/* Боковая панель */
.publication-sidebar {
  position: sticky;
  top: 100px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.sidebar-section {
  background: var(--gradient-glass);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
}

.sidebar-section h4,
.sidebar-section h5 {
  margin: 0 0 1rem 0;
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
}

.sidebar-section h5 {
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
}

/* Кнопки действий */
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
  border: none;
  cursor: pointer;
  justify-content: center;
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

.website-btn {
  background: rgba(59, 130, 246, 0.1);
  color: #2563eb;
  border: 1px solid rgba(59, 130, 246, 0.2);
}

.website-btn:hover {
  background: rgba(59, 130, 246, 0.2);
  border-color: rgba(59, 130, 246, 0.3);
}

.share-btn {
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-primary);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.share-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
}

/* Цитирование */
.citation-format {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.citation-text {
  padding: 1rem;
  background: rgba(0, 0, 0, 0.2);
  border-radius: var(--radius-md);
  font-family: 'Courier New', monospace;
  font-size: 0.8125rem;
  line-height: 1.5;
  color: var(--text-secondary);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.copy-citation-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(102, 126, 234, 0.1);
  color: #4f46e5;
  border: 1px solid rgba(102, 126, 234, 0.2);
  border-radius: var(--radius-md);
  font-size: 0.8125rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.copy-citation-btn:hover {
  background: rgba(102, 126, 234, 0.2);
  border-color: rgba(102, 126, 234, 0.3);
}

/* Связанные публикации */
.related-publications {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.related-publication-link {
  display: block;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-md);
  text-decoration: none;
  color: var(--text-primary);
  transition: all 0.2s ease;
}

.related-publication-link:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
}

.related-publication-link h5 {
  margin: 0 0 0.5rem 0;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.3;
}

.related-publication-link p {
  margin: 0;
  font-size: 0.8125rem;
  color: var(--text-secondary);
}

/* Состояния загрузки и ошибки */
.loading-state,
.error-state {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: 2rem;
}

.loading-content,
.error-content {
  text-align: center;
  max-width: 400px;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(102, 126, 234, 0.1);
  border-top: 3px solid var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-content h2 {
  margin: 0 0 0.75rem 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
}

.error-content p {
  margin: 0 0 1.5rem 0;
  color: var(--text-secondary);
  line-height: 1.5;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 2rem;
  border-radius: var(--radius-lg);
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

/* Адаптивность */
@media (max-width: 1024px) {
  .publication-layout {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .publication-sidebar {
    position: static;
    order: -1;
  }

  .pdf-container {
    height: 500px;
  }
}

@media (max-width: 768px) {
  .publication-header {
    padding: 1.5rem 0;
  }

  .publication-title {
    font-size: 2rem;
  }

  .publication-meta {
    gap: 1rem;
  }

  .authors-list {
    flex-direction: column;
    gap: 0.75rem;
  }

  .action-buttons {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .action-btn {
    flex: 1;
    min-width: 120px;
  }

  .pdf-container {
    height: 400px;
  }
}

/* Улучшения доступности */
@media (prefers-reduced-motion: reduce) {
  .show-pdf-btn,
  .action-btn,
  .tag-button,
  .author-link,
  .related-publication-link {
    transition: none;
  }

  .loading-spinner {
    animation: none;
  }
}

@media (prefers-contrast: high) {
  .publication-section,
  .sidebar-section {
    border-width: 2px;
    border-color: var(--text-primary);
  }

  .action-btn,
  .tag-button {
    border-width: 2px;
  }
}
</style>