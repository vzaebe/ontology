<template>
  <div class="contacts-page">
    <!-- Заголовок страницы -->
    <CurveDivider />
    <section class="page-header">
      <div class="container">
        <h1>Контакты</h1>
        <p class="page-subtitle">
          Свяжитесь с нами любым удобным способом — ответим быстро и по существу
        </p>
      </div>
    </section>

    <!-- Основная секция контактов -->
    <ContactsSection 
      :preselected-direction="$route.query.direction || ''"
      :preselected-person="$route.query.person || ''"
      @person-contact="handlePersonContact"
      @form-submitted="handleContactFormSubmit"
    />
  </div>
</template>

<script>
import CurveDivider from '../components/CurveDivider.vue'
import ContactsSection from '../components/ContactsSection.vue'

export default {
  name: 'ContactsPage',
  components: {
    CurveDivider,
    ContactsSection
  },
  setup() {
    // Обработчики событий
    const handlePersonContact = (data) => {
      console.log('Person contact:', data)
    }

    const handleContactFormSubmit = (formData) => {
      console.log('Contact form submitted:', formData)
    }

    return {
      handlePersonContact,
      handleContactFormSubmit
    }
  },
  mounted() {
    document.title = 'Контакты — Ontology.ru'
    
    // Аналитика
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: 'Контакты',
        page_location: window.location.href
      })
    }
  }
}
</script>

<style scoped>
.contacts-page {
  min-height: 100vh;
}

.page-header {
  background: var(--gradient-hero);
  color: white;
  text-align: center;
  padding: 4rem 0 3rem;
  position: relative;
  overflow: hidden;
}

.page-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 30% 20%, rgba(102, 126, 234, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.3) 0%, transparent 50%);
  animation: float 8s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.page-header h1 {
  font-size: 3rem;
  font-weight: 900;
  margin: 0 0 1rem 0;
  position: relative;
  z-index: 2;
}

.page-subtitle {
  font-size: 1.25rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  line-height: 1.5;
}

/* Адаптивность */
@media (max-width: 768px) {
  .page-header {
    padding: 3rem 0 2rem;
  }

  .page-header h1 {
    font-size: 2.5rem;
  }

  .page-subtitle {
    font-size: 1.125rem;
  }
}

/* Отключение анимаций для пользователей с пониженным восприятием движения */
@media (prefers-reduced-motion: reduce) {
  .page-header::before {
    animation: none;
  }
}
</style>
