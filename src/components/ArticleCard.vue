<template>
  <div class="article-card card">
    <!-- Заголовок статьи -->
    <h3 class="article-title">
      <router-link :to="`/pub/${article.id}`">
        {{ article.title }}
      </router-link>
    </h3>
    
    <!-- Авторы -->
    <div class="article-authors" v-if="article.authors && article.authors.length">
      <span class="authors-label">Авторы:</span>
      <span class="authors-list">{{ article.authors.join(', ') }}</span>
    </div>
    
    <!-- Журнал и год -->
    <div class="article-meta">
      <span class="journal-name">{{ article.journal }}</span>
      <span class="article-year">{{ article.year }}</span>
      <span v-if="article.doi" class="doi-link">
        <a :href="`https://doi.org/${article.doi}`" target="_blank" rel="noopener">
          DOI: {{ article.doi }}
        </a>
      </span>
    </div>
    
    <!-- Аннотация -->
    <p class="article-abstract" v-if="article.abstract">
      {{ article.abstract }}
    </p>
    
    <!-- Ключевые слова -->
    <div class="article-keywords" v-if="article.keywords && article.keywords.length">
      <span class="keywords-label">Ключевые слова:</span>
      <div class="keywords-list">
        <span 
          v-for="keyword in article.keywords" 
          :key="keyword"
          class="keyword-tag"
        >
          {{ keyword }}
        </span>
      </div>
    </div>
    
    <!-- Метрики -->
    <div class="article-metrics" v-if="article.metrics">
      <div class="metric-item" v-if="article.metrics.citations">
        <span class="metric-icon">📊</span>
        <span class="metric-value">{{ article.metrics.citations }}</span>
        <span class="metric-label">цитирований</span>
      </div>
      <div class="metric-item" v-if="article.metrics.impactFactor">
        <span class="metric-icon">⭐</span>
        <span class="metric-value">{{ article.metrics.impactFactor }}</span>
        <span class="metric-label">импакт-фактор</span>
      </div>
    </div>
    
    <!-- Действия -->
    <div class="article-actions">
      <router-link :to="`/pub/${article.id}`" class="btn btn-primary icon-btn">
        <svg class="icon" width="18" height="18" aria-hidden="true"><use href="#icon-file" /></svg>
        Открыть
      </router-link>
      <button 
        v-if="article.pdfUrl"
        @click="downloadPDF"
        class="btn btn-secondary icon-btn"
      >
        <svg class="icon" width="18" height="18" aria-hidden="true"><use href="#icon-download" /></svg>
        Скачать PDF
      </button>
      <button 
        @click="toggleFavorite"
        class="btn btn-secondary favorite-btn icon-btn"
        :class="{ 'favorited': isFavorited }"
      >
        <svg v-if="isFavorited" class="icon" width="18" height="18" aria-hidden="true"><use href="#icon-heart-solid" /></svg>
        <svg v-else class="icon" width="18" height="18" aria-hidden="true"><use href="#icon-heart" /></svg>
        В избранное
      </button>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  name: 'ArticleCard',
  props: {
    // Объект с данными статьи
    article: {
      type: Object,
      required: true,
      validator: (value) => {
        return value.title && value.url && value.journal && value.year
      }
    }
  },
  setup(props) {
    // Состояние избранного (в реальном приложении хранится в localStorage или Vuex)
    const isFavorited = ref(false)
    
    // Переключение избранного
    const toggleFavorite = () => {
      isFavorited.value = !isFavorited.value
      // Здесь можно добавить логику сохранения в localStorage
      localStorage.setItem(`favorite-${props.article.id}`, isFavorited.value)
    }
    
    // Скачивание PDF
    const downloadPDF = () => {
      if (props.article.pdfUrl) {
        const link = document.createElement('a')
        link.href = props.article.pdfUrl
        link.download = `${props.article.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }
    }
    
    // Проверяем, была ли статья в избранном при загрузке
    const checkFavoriteStatus = () => {
      const saved = localStorage.getItem(`favorite-${props.article.id}`)
      if (saved !== null) {
        isFavorited.value = JSON.parse(saved)
      }
    }
    
    // Вызываем проверку при создании компонента
    checkFavoriteStatus()
    
    return {
      isFavorited,
      toggleFavorite,
      downloadPDF
    }
  }
}
</script>

<style scoped>
.article-card {
  padding: 2rem;
  transition: all 0.3s ease;
}

.article-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.article-title {
  margin-bottom: 1rem;
}

.article-title a {
  color: var(--primary-color);
  text-decoration: none;
  font-size: 1.25rem;
  line-height: 1.4;
  transition: color 0.2s ease;
}

.article-title a:hover {
  color: var(--secondary-color);
}

.article-authors {
  margin-bottom: 0.75rem;
  font-size: 0.875rem;
}

.authors-label {
  color: var(--text-secondary);
  font-weight: 500;
  margin-right: 0.5rem;
}

.authors-list {
  color: var(--text-primary);
}

.article-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.875rem;
}

.journal-name {
  color: var(--primary-color);
  font-weight: 600;
}

.article-year {
  color: var(--text-secondary);
  background: var(--bg-tertiary);
  padding: 0.25rem 0.5rem;
  border-radius: var(--radius-sm);
}

.doi-link a {
  color: var(--accent-color);
  text-decoration: none;
}

.doi-link a:hover {
  text-decoration: underline;
}

.article-abstract {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1rem;
  font-size: 0.875rem;
}

.article-keywords {
  margin-bottom: 1.5rem;
}

.keywords-label {
  display: block;
  color: var(--text-secondary);
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.keywords-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.keyword-tag {
  background: var(--bg-tertiary);
  color: var(--text-primary);
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
  font-weight: 500;
}

.article-metrics {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
}

.metric-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.metric-icon {
  font-size: 1.25rem;
}

.metric-value {
  font-weight: 600;
  color: var(--primary-color);
}

.metric-label {
  color: var(--text-secondary);
  font-size: 0.875rem;
}

.article-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.favorite-btn {
  transition: all 0.2s ease;
}

.favorite-btn.favorited {
  background-color: var(--error-color);
  color: white;
}

.favorite-btn.favorited:hover {
  background-color: #dc2626;
}

/* Адаптивность */
@media (max-width: 768px) {
  .article-card {
    padding: 1.5rem;
  }
  
  .article-meta {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .article-metrics {
    flex-direction: column;
    gap: 1rem;
  }
  
  .article-actions {
    flex-direction: column;
  }
  
  .article-actions .btn {
    width: 100%;
    justify-content: center;
  }
}

.icon-btn .icon {
  margin-right: 0.5rem;
  vertical-align: -3px;
}
</style> 