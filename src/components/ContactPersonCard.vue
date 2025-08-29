<template>
  <div class="contact-person-card">
    <div class="person-header">
      <div class="person-avatar">
        <img 
          v-if="person.avatar" 
          :src="person.avatar" 
          :alt="person.name"
          class="avatar-image"
        />
        <div v-else class="avatar-placeholder">
          {{ getInitials(person.name) }}
        </div>
      </div>
      
      <div class="person-info">
        <h4 class="person-name">{{ person.name }}</h4>
        <div class="person-role">{{ person.role }}</div>
        <div class="person-direction">{{ person.direction }}</div>
      </div>
    </div>

    <div class="person-bio" v-if="person.bio">
      <p>{{ person.bio }}</p>
    </div>

    <div class="person-contacts">
      <div class="contact-item">
        <svg class="contact-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
        <a :href="`mailto:${person.email}`" class="contact-link">{{ person.email }}</a>
      </div>

      <div v-if="person.telegram" class="contact-item">
        <svg class="contact-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 12l2 2 4-4"/>
          <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"/>
        </svg>
        <a :href="getTelegramLink(person.telegram)" target="_blank" class="contact-link">{{ person.telegram }}</a>
      </div>

      <div v-if="person.phone" class="contact-item">
        <svg class="contact-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
        <a :href="`tel:${person.phone}`" class="contact-link">{{ formatPhone(person.phone) }}</a>
      </div>

      <div v-if="person.workingHours" class="contact-item working-hours">
        <svg class="contact-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12,6 12,12 16,14"/>
        </svg>
        <span class="contact-text">{{ person.workingHours }}</span>
      </div>
    </div>

    <div class="person-actions">
      <button 
        @click="writeMessage"
        class="btn btn-primary person-write-btn"
        :aria-label="`Написать ${person.name}`"
      >
        Написать
      </button>
      
      <button 
        v-if="person.telegram"
        @click="openTelegram"
        class="btn btn-secondary person-telegram-btn"
        :aria-label="`Telegram ${person.name}`"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 12l2 2 4-4"/>
          <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"/>
        </svg>
        Telegram
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactPersonCard',
  props: {
    person: {
      type: Object,
      required: true
    }
  },
  emits: ['write-message'],
  setup(props, { emit }) {
    const getInitials = (name) => {
      return name
        .split(' ')
        .map(part => part.charAt(0).toUpperCase())
        .slice(0, 2)
        .join('')
    }

    const formatPhone = (phone) => {
      return phone.replace(/(\+7)(\d{3})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3-$4-$5')
    }

    const getTelegramLink = (telegram) => {
      const username = telegram.replace('@', '')
      return `https://t.me/${username}`
    }

    const writeMessage = () => {
      emit('write-message', {
        direction: props.person.directionKey,
        person: props.person.id
      })

      // Аналитика
      if (window.gtag) {
        window.gtag('event', 'contact_person_click', {
          person_id: props.person.id,
          direction: props.person.directionKey
        })
      }
    }

    const openTelegram = () => {
      if (props.person.telegram) {
        window.open(getTelegramLink(props.person.telegram), '_blank')
        
        // Аналитика
        if (window.gtag) {
          window.gtag('event', 'contact_telegram_click', {
            person_id: props.person.id
          })
        }
      }
    }

    return {
      getInitials,
      formatPhone,
      getTelegramLink,
      writeMessage,
      openTelegram
    }
  }
}
</script>

<style scoped>
.contact-person-card {
  background: var(--gradient-glass);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.contact-person-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-xl);
  border-color: rgba(102, 126, 234, 0.3);
}

.person-header {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.person-avatar {
  flex-shrink: 0;
}

.avatar-image,
.avatar-placeholder {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
}

.avatar-placeholder {
  background: var(--primary-color);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1.25rem;
}

.person-info {
  flex: 1;
  min-width: 0;
}

.person-name {
  color: var(--primary-color);
  margin: 0 0 0.25rem 0;
  font-size: 1.125rem;
  font-weight: 700;
  line-height: 1.3;
}

.person-role {
  color: var(--text-primary);
  font-weight: 600;
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
}

.person-direction {
  color: var(--text-secondary);
  font-size: 0.8125rem;
}

.person-bio {
  margin-bottom: 1.25rem;
  flex-grow: 1;
}

.person-bio p {
  color: var(--text-secondary);
  font-size: 0.875rem;
  line-height: 1.4;
  margin: 0;
}

.person-contacts {
  margin-bottom: 1.5rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 0.8125rem;
}

.contact-item:last-child {
  margin-bottom: 0;
}

.contact-icon {
  color: var(--primary-color);
  flex-shrink: 0;
}

.contact-link {
  color: var(--text-primary);
  text-decoration: none;
  transition: color 0.2s ease;
  word-break: break-all;
}

.contact-link:hover {
  color: var(--primary-color);
  text-decoration: underline;
}

.contact-text {
  color: var(--text-secondary);
}

.working-hours .contact-text {
  font-size: 0.75rem;
}

.person-actions {
  display: flex;
  gap: 0.75rem;
  margin-top: auto;
}

.person-write-btn {
  flex: 1;
  min-height: 44px;
  font-size: 0.875rem;
}

.person-telegram-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 44px;
  font-size: 0.875rem;
  white-space: nowrap;
}

.person-telegram-btn svg {
  flex-shrink: 0;
}

/* Адаптивность */
@media (max-width: 768px) {
  .contact-person-card {
    padding: 1.25rem;
  }

  .person-header {
    gap: 0.75rem;
  }

  .avatar-image,
  .avatar-placeholder {
    width: 50px;
    height: 50px;
  }

  .avatar-placeholder {
    font-size: 1rem;
  }

  .person-name {
    font-size: 1rem;
  }

  .person-actions {
    flex-direction: column;
    gap: 0.5rem;
  }

  .person-telegram-btn {
    justify-content: center;
  }
}

/* Анимации появления */
.contact-person-card {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), 
              transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.contact-person-card.animate-in {
  opacity: 1;
  transform: translateY(0);
}

/* Состояния доступности */
.person-write-btn:focus,
.person-telegram-btn:focus {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}

.person-write-btn:focus:not(:focus-visible),
.person-telegram-btn:focus:not(:focus-visible) {
  outline: none;
}

.person-write-btn:focus-visible,
.person-telegram-btn:focus-visible {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}

/* Отключение анимаций для пользователей с пониженным восприятием движения */
@media (prefers-reduced-motion: reduce) {
  .contact-person-card {
    opacity: 1;
    transform: none;
    transition: none;
  }
  
  .contact-person-card:hover {
    transform: none;
  }
}
</style>
