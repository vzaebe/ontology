<template>
  <div class="author-card card">
    <!-- Аватар автора -->
    <div class="author-avatar">
      <img 
        :src="author.avatar || '/default-avatar.svg'" 
        :alt="author.name"
        @error="handleImageError"
      />
    </div>
    
    <!-- Информация об авторе -->
    <div class="author-info">
      <h3 class="author-name">{{ author.name }}</h3>
      <p class="author-title">{{ author.title }}</p>
      <p class="author-organization">{{ author.organization }}</p>
      
      <!-- Специализации -->
      <div class="author-specializations" v-if="author.specializations">
        <span 
          v-for="spec in author.specializations" 
          :key="spec"
          class="specialization-tag"
        >
          {{ spec }}
        </span>
      </div>
      
      <!-- Описание -->
      <p class="author-description" v-if="author.description">
        {{ author.description }}
      </p>
      
      <!-- Контакты -->
      <div class="author-contacts" v-if="author.contacts">
        <a 
          v-if="author.contacts.email"
          :href="`mailto:${author.contacts.email}`"
          class="contact-link icon-link"
          title="Email"
        >
          <svg class="icon" width="16" height="16" aria-hidden="true"><use href="#icon-mail"/></svg>
          {{ author.contacts.email }}
        </a>
        <a 
          v-if="author.contacts.phone"
          :href="`tel:${author.contacts.phone}`"
          class="contact-link icon-link"
          title="Телефон"
        >
          <svg class="icon" width="16" height="16" aria-hidden="true"><use href="#icon-phone"/></svg>
          {{ author.contacts.phone }}
        </a>
        <a 
          v-if="author.contacts.linkedin"
          :href="author.contacts.linkedin"
          class="contact-link icon-link"
          target="_blank"
          rel="noopener"
          title="LinkedIn"
        >
          <svg class="icon" width="16" height="16" aria-hidden="true"><use href="#icon-link"/></svg>
          LinkedIn
        </a>
      </div>
      
      <!-- Публикации -->
      <div class="author-publications" v-if="author.publications && author.publications.length">
        <h4>Ключевые публикации:</h4>
        <ul class="publications-list">
          <li 
            v-for="pub in author.publications.slice(0, 3)" 
            :key="pub.id"
            class="publication-item"
          >
            <a :href="pub.url" target="_blank" rel="noopener">
              {{ pub.title }}
            </a>
            <span class="publication-year">{{ pub.year }}</span>
          </li>
        </ul>
        <p v-if="author.publications.length > 3" class="more-publications">
          И ещё {{ author.publications.length - 3 }} публикаций...
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'AuthorCard',
  props: {
    // Объект с данными автора
    author: {
      type: Object,
      required: true,
      validator: (value) => {
        return value.name && value.title && value.organization
      }
    }
  },
  setup() {
    // Обработка ошибки загрузки изображения
    const handleImageError = (event) => {
      event.target.src = '/default-avatar.svg'
    }
    
    return {
      handleImageError
    }
  }
}
</script>

<style scoped>
.author-card {
  display: flex;
  gap: 1.5rem;
  padding: 2rem;
  transition: all 0.3s ease;
}

.author-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.author-avatar {
  flex-shrink: 0;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid var(--primary-color);
}

.author-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.author-info {
  flex: 1;
  min-width: 0; /* Для корректного переноса текста */
}

.author-name {
  color: var(--primary-color);
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
}

.author-title {
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
}

.author-organization {
  color: var(--text-secondary);
  margin-bottom: 1rem;
  font-style: italic;
}

.author-specializations {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.specialization-tag {
  background: var(--accent-color);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
  font-weight: 500;
}

.author-description {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1rem;
}

.author-contacts {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.contact-link {
  color: var(--primary-color);
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.2s ease;
}

.contact-link:hover {
  color: var(--secondary-color);
}

.icon-link .icon {
  margin-right: 0.5rem;
  vertical-align: -2px;
}

.author-publications h4 {
  color: var(--text-primary);
  margin-bottom: 0.75rem;
  font-size: 1rem;
}

.publications-list {
  list-style: none;
  padding: 0;
  margin-bottom: 0.5rem;
}

.publication-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  background: var(--bg-secondary);
  border-radius: var(--radius-sm);
}

.publication-item a {
  color: var(--primary-color);
  text-decoration: none;
  flex: 1;
  margin-right: 1rem;
  font-size: 0.875rem;
}

.publication-item a:hover {
  color: var(--secondary-color);
}

.publication-year {
  color: var(--text-light);
  font-size: 0.75rem;
  font-weight: 500;
  background: var(--bg-tertiary);
  padding: 0.25rem 0.5rem;
  border-radius: var(--radius-sm);
}

.more-publications {
  color: var(--text-light);
  font-size: 0.875rem;
  font-style: italic;
}

/* Адаптивность */
@media (max-width: 768px) {
  .author-card {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
  
  .author-avatar {
    width: 100px;
    height: 100px;
    margin: 0 auto;
  }
  
  .author-contacts {
    align-items: center;
  }
  
  .publication-item {
    flex-direction: column;
    gap: 0.5rem;
    text-align: left;
  }
  
  .publication-item a {
    margin-right: 0;
  }
}
</style> 