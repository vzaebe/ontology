<template>
  <div class="resource-card card">
    <!-- Иконка ресурса -->
    <div class="resource-icon">
      <span class="icon">{{ getResourceIcon(resource.type) }}</span>
    </div>
    
    <!-- Заголовок ресурса -->
    <h3 class="resource-title">
      <a :href="resource.url" target="_blank" rel="noopener">
        {{ resource.title }}
      </a>
    </h3>
    
    <!-- Описание -->
    <p class="resource-description">{{ resource.description }}</p>
    
    <!-- Метаданные -->
    <div class="resource-meta">
      <div class="meta-item">
        <span class="meta-icon">🏷️</span>
        <span class="meta-label">Тип:</span>
        <span class="meta-value">{{ getResourceTypeText(resource.type) }}</span>
      </div>
      
      <div class="meta-item" v-if="resource.author">
        <span class="meta-icon">👤</span>
        <span class="meta-label">Автор:</span>
        <span class="meta-value">{{ resource.author }}</span>
      </div>
      
      <div class="meta-item" v-if="resource.year">
        <span class="meta-icon">📅</span>
        <span class="meta-label">Год:</span>
        <span class="meta-value">{{ resource.year }}</span>
      </div>
      
      <div class="meta-item" v-if="resource.language">
        <span class="meta-icon">🌐</span>
        <span class="meta-label">Язык:</span>
        <span class="meta-value">{{ resource.language }}</span>
      </div>
    </div>
    
    <!-- Теги -->
    <div class="resource-tags" v-if="resource.tags && resource.tags.length">
      <div class="tags-list">
        <span 
          v-for="tag in resource.tags" 
          :key="tag"
          class="tag"
        >
          {{ tag }}
        </span>
      </div>
    </div>
    
    <!-- Рейтинг -->
    <div class="resource-rating" v-if="resource.rating">
      <div class="rating-stars" aria-hidden="true">
        <svg 
          v-for="star in 5" 
          :key="star"
          class="icon star-icon"
          width="16" height="16"
          :class="{ 'filled': star <= resource.rating }"
        >
          <use href="#icon-star" />
        </svg>
      </div>
      <span class="rating-text">{{ resource.rating }}/5</span>
    </div>
    
    <!-- Дополнительная информация -->
    <div class="resource-extra" v-if="resource.extra">
      <div class="extra-item" v-if="resource.extra.fileSize">
        <span class="extra-icon">📁</span>
        <span class="extra-text">{{ resource.extra.fileSize }}</span>
      </div>
      <div class="extra-item" v-if="resource.extra.pages">
        <span class="extra-icon">📄</span>
        <span class="extra-text">{{ resource.extra.pages }} страниц</span>
      </div>
      <div class="extra-item" v-if="resource.extra.duration">
        <span class="extra-icon">⏱️</span>
        <span class="extra-text">{{ resource.extra.duration }}</span>
      </div>
    </div>
    
    <!-- Действия -->
    <div class="resource-actions">
      <a 
        :href="resource.url" 
        target="_blank" 
        rel="noopener"
        class="btn btn-primary icon-btn"
      >
        <svg class="icon" width="18" height="18" aria-hidden="true"><use href="#icon-external" /></svg>
        Открыть ресурс
      </a>
      
      <button 
        v-if="resource.downloadUrl"
        @click="downloadResource"
        class="btn btn-secondary icon-btn"
      >
        <svg class="icon" width="18" height="18" aria-hidden="true"><use href="#icon-download" /></svg>
        Скачать
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
      
      <button 
        @click="shareResource"
        class="btn btn-secondary icon-btn"
      >
        <svg class="icon" width="18" height="18" aria-hidden="true"><use href="#icon-share" /></svg>
        Поделиться
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'ResourceCard',
  props: {
    // Объект с данными ресурса
    resource: {
      type: Object,
      required: true,
      validator: (value) => {
        return value.title && value.url && value.description && value.type
      }
    }
  },
  setup(props) {
    // Состояние избранного
    const isFavorited = ref(false)
    
    // Получение иконки по типу ресурса
    const getResourceIcon = (type) => {
      const iconMap = {
        'software': '💻',
        'manual': '📖',
        'article': '📄',
        'video': '🎥',
        'course': '🎓',
        'book': '📚',
        'dataset': '📊',
        'tool': '🔧',
        'framework': '⚙️',
        'library': '📦'
      }
      return iconMap[type] || '🔗'
    }
    
    // Получение текста типа ресурса
    const getResourceTypeText = (type) => {
      const typeMap = {
        'software': 'Программное обеспечение',
        'manual': 'Методичка',
        'article': 'Статья',
        'video': 'Видео',
        'course': 'Курс',
        'book': 'Книга',
        'dataset': 'Набор данных',
        'tool': 'Инструмент',
        'framework': 'Фреймворк',
        'library': 'Библиотека'
      }
      return typeMap[type] || type
    }
    
    // Скачивание ресурса
    const downloadResource = () => {
      if (props.resource.downloadUrl) {
        const link = document.createElement('a')
        link.href = props.resource.downloadUrl
        link.download = props.resource.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }
    }
    
    // Переключение избранного
    const toggleFavorite = () => {
      isFavorited.value = !isFavorited.value
      localStorage.setItem(`resource-favorite-${props.resource.id}`, isFavorited.value)
    }
    
    // Поделиться ресурсом
    const shareResource = async () => {
      if (navigator.share) {
        try {
          await navigator.share({
            title: props.resource.title,
            text: props.resource.description,
            url: props.resource.url
          })
        } catch (error) {
          console.log('Ошибка при попытке поделиться:', error)
        }
      } else {
        // Fallback для браузеров без поддержки Web Share API
        navigator.clipboard.writeText(props.resource.url)
        alert('Ссылка скопирована в буфер обмена!')
      }
    }
    
    // Проверяем статус избранного при загрузке
    const checkFavoriteStatus = () => {
      const saved = localStorage.getItem(`resource-favorite-${props.resource.id}`)
      if (saved !== null) {
        isFavorited.value = JSON.parse(saved)
      }
    }
    
    checkFavoriteStatus()
    
    return {
      isFavorited,
      getResourceIcon,
      getResourceTypeText,
      downloadResource,
      toggleFavorite,
      shareResource
    }
  }
}
</script>

<style scoped>
.resource-card {
  padding: 2rem;
  transition: all 0.3s ease;
  position: relative;
}

.resource-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.resource-icon {
  text-align: center;
  margin-bottom: 1rem;
}

.icon {
  font-size: 3rem;
  display: block;
}

.resource-title {
  margin-bottom: 1rem;
  text-align: center;
}

.resource-title a {
  color: var(--primary-color);
  text-decoration: none;
  font-size: 1.25rem;
  line-height: 1.4;
  transition: color 0.2s ease;
}

.resource-title a:hover {
  color: var(--secondary-color);
}

.resource-description {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1.5rem;
  text-align: center;
}

.resource-meta {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
}

.meta-icon {
  font-size: 1rem;
}

.meta-label {
  color: var(--text-secondary);
  font-weight: 500;
  min-width: 40px;
}

.meta-value {
  color: var(--text-primary);
  font-weight: 600;
}

.resource-tags {
  margin-bottom: 1.5rem;
}

.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
}

.tag {
  background: var(--accent-color);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
  font-weight: 500;
}

.resource-rating {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: var(--bg-tertiary);
  border-radius: var(--radius-md);
}

.rating-stars {
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

.resource-extra {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.extra-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.extra-icon {
  font-size: 1rem;
}

.resource-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
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

.icon-btn .icon {
  margin-right: 0.5rem;
  vertical-align: -3px;
}

/* Адаптивность */
@media (max-width: 768px) {
  .resource-card {
    padding: 1.5rem;
  }
  
  .resource-meta {
    grid-template-columns: 1fr;
  }
  
  .resource-extra {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .resource-actions {
    flex-direction: column;
  }
  
  .resource-actions .btn {
    width: 100%;
    justify-content: center;
  }
}
</style> 