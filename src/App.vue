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
            <router-link to="/" class="nav-link" @click="closeMobileMenu">
              Главная
            </router-link>
            <router-link to="/projects" class="nav-link" @click="closeMobileMenu">
              Проекты
            </router-link>
            <router-link to="/resources" class="nav-link" @click="closeMobileMenu">
              Полезные ссылки
            </router-link>
            <router-link to="/science" class="nav-link" @click="closeMobileMenu">
              Наука
            </router-link>
            <router-link to="/authors" class="nav-link" @click="closeMobileMenu">
              Авторы
            </router-link>
            <router-link to="/team" class="nav-link" @click="closeMobileMenu">
              Команда
            </router-link>
            <router-link to="/impact" class="nav-link" @click="closeMobileMenu">
              Impact
            </router-link>
            <router-link to="/contact" class="nav-link" @click="closeMobileMenu">
              Контакты
            </router-link>
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
            <p>Email: contact@ontology.ru</p>
            <p>Телефон: +7 (495) 000-00-00</p>
          </div>
          
          <div class="footer-section">
            <h4>Партнеры</h4>
            <p>Университеты</p>
            <p>ИТ-компании</p>
          </div>
        </div>
        
        <div class="footer-bottom">
          <p>&copy; 2024 Ontology.ru. Все права защищены.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'App',
  setup() {
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
    
    return {
      isMobileMenuOpen,
      toggleMobileMenu,
      closeMobileMenu
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