<template>
  <div id="app">
    <!-- Навигационная панель -->
    <nav class="navbar">
      <div class="container">
        <div class="nav-content">
          <!-- Логотип -->
          <router-link to="/" class="nav-logo">
            <span class="logo-text">Ontology.ru</span>
            <span class="logo-subtitle">Онтологии и графы знаний</span>
          </router-link>
          
          <!-- Навигационные ссылки -->
          <div class="nav-links" :class="{ 'nav-open': isMobileMenuOpen }">
            <a href="#unified-ontology" class="nav-link" @click="closeMobileMenu">
              О проекте
            </a>
            <router-link to="/how-it-works" class="nav-link" @click="closeMobileMenu">
              Как это работает
            </router-link>
            <a href="#business-benefits" class="nav-link" @click="closeMobileMenu">
              Выгоды
            </a>
            <a href="#useful" class="nav-link" @click="closeMobileMenu">
              Полезное
            </a>
            <router-link to="/publications" class="nav-link" @click="closeMobileMenu">
              Публикации
            </router-link>
            <router-link to="/team" class="nav-link" @click="closeMobileMenu">
              Команда
            </router-link>
            <router-link to="/demo/ontology-editor" class="nav-link" @click="closeMobileMenu">
              Демо
            </router-link>
            <a href="#contacts" class="nav-link" @click="closeMobileMenu">
              Контакты
            </a>
          </div>
          
          <!-- Мобильное меню -->
          <button 
            class="mobile-menu-btn" 
            @click="toggleMobileMenu"
            :aria-label="isMobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>

    <!-- Основной контент -->
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <!-- Подвал -->
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <h4>Ontology.ru</h4>
            <p>Онтологии и графы знаний для бизнеса, науки и ИТ</p>
            <p>Открытое сообщество исследователей, инженеров и аналитиков</p>
          </div>
          
          <div class="footer-section">
            <h4>Контакты</h4>
            <div class="footer-contacts">
              <a href="mailto:hello@example.org" class="footer-contact">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                hello@example.org
              </a>
              <a href="tel:+70000000000" class="footer-contact">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                +7 000 000-00-00
              </a>
              <a href="https://t.me/example" target="_blank" class="footer-contact">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M9 12l2 2 4-4"/>
                  <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"/>
                </svg>
                @example
              </a>
            </div>
            <p class="footer-address">Москва, ул. Примерная, 1</p>
            <p class="footer-hours">Пн–Пт, 10:00–19:00 (Мск)</p>
          </div>
          
          <div class="footer-section">
            <h4>Разделы</h4>
            <div class="footer-links">
              <a href="/#business-benefits" class="footer-link">Выгоды</a>
              <a href="/#useful" class="footer-link">Полезное</a>
              <router-link to="/publications" class="footer-link">Публикации</router-link>
              <router-link to="/team" class="footer-link">Команда</router-link>
              <a href="/#contacts" class="footer-link">Контакты</a>
            </div>
          </div>
        </div>
        
        <div class="footer-bottom">
          <p>&copy; 2024 Ontology.ru. Все права защищены.</p>
        </div>
      </div>
    </footer>

    <!-- Модальное окно публикации -->
    <PublicationModal @tag-click="handleModalTagClick" />
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import PublicationModal from './components/PublicationModal.vue'

export default {
  name: 'App',
  components: {
    PublicationModal
  },
  setup() {
    const router = useRouter()

    // Состояние мобильного меню
    const isMobileMenuOpen = ref(false)
    
    // Переключение мобильного меню
    const toggleMobileMenu = () => {
      isMobileMenuOpen.value = !isMobileMenuOpen.value
    }
    
    // Закрытие мобильного меню
    const closeMobileMenu = () => {
      isMobileMenuOpen.value = false
    }

    // Обработчик клика по тегу из модального окна
    const handleModalTagClick = (tag) => {
      router.push({
        path: '/publications',
        query: { tags: tag }
      })
    }
    
    return {
      isMobileMenuOpen,
      toggleMobileMenu,
      closeMobileMenu,
      handleModalTagClick
    }
  }
}
</script>

<style scoped>
/* Навигационная панель */
.navbar {
  background: rgba(10, 13, 31, 0.7);
  box-shadow: var(--shadow-sm);
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid var(--bg-tertiary);
  backdrop-filter: saturate(140%) blur(10px);
}

.nav-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
}

.nav-logo {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: var(--text-primary);
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-color);
}

.logo-subtitle {
  font-size: 0.75rem;
  color: var(--text-secondary);
  font-weight: 400;
}

.nav-links {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-link {
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 0;
  border-bottom: 2px solid transparent;
  transition: all 0.2s ease;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: var(--primary-color);
  border-bottom-color: var(--primary-color);
}

.mobile-menu-btn {
  display: none;
  flex-direction: column;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  gap: 4px;
}

.mobile-menu-btn span {
  width: 25px;
  height: 3px;
  background-color: var(--text-primary);
  transition: all 0.3s ease;
}

/* Основной контент */
.main-content {
  min-height: calc(100vh - 200px);
}

/* Подвал */
.footer {
  background: rgba(16, 19, 42, 0.9);
  border-top: 1px solid var(--bg-tertiary);
  padding: 3rem 0 1rem;
  margin-top: 4rem;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-section h4 {
  color: var(--primary-color);
  margin-bottom: 1rem;
}

.footer-section p {
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
}

.footer-bottom {
  border-top: 1px solid var(--bg-tertiary);
  padding-top: 1rem;
  text-align: center;
  color: var(--text-secondary);
  font-size: 0.875rem;
}

.footer-contacts {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.footer-contact {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.2s ease;
}

.footer-contact:hover {
  color: var(--primary-color);
}

.footer-contact svg {
  flex-shrink: 0;
  color: var(--primary-color);
}

.footer-address,
.footer-hours {
  color: var(--text-light);
  font-size: 0.8125rem;
  margin: 0.25rem 0;
}

.footer-links {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer-link {
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.2s ease;
}

.footer-link:hover {
  color: var(--primary-color);
}

/* Анимации переходов */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.page-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

/* Адаптивность */
@media (max-width: 768px) {
  .nav-links {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    background: var(--bg-primary);
    flex-direction: column;
    padding: 2rem;
    box-shadow: var(--shadow-lg);
    transform: translateY(-100%);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    gap: 1rem;
  }
  
  .nav-links.nav-open {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
  }
  
  .mobile-menu-btn {
    display: flex;
  }
  
  .nav-link {
    border-bottom: none;
    padding: 1rem 0;
    width: 100%;
    text-align: center;
  }
  
  .footer-content {
    grid-template-columns: 1fr;
    text-align: center;
  }
}
</style> 