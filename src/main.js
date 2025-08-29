import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import './style.css'

// Импорт компонентов страниц
import HomePage from './pages/HomePage.vue'
import OntologiesPage from './pages/OntologiesPage.vue'
import HowItWorksPage from './pages/HowItWorksPage.vue'
import WhyBusinessPage from './pages/WhyBusinessPage.vue'
import ProjectsPage from './pages/ProjectsPage.vue'
import ResourcesPage from './pages/ResourcesPage.vue'
import ResourceDetailPage from './pages/ResourceDetailPage.vue'
import SciencePage from './pages/SciencePage.vue'
import TeamPage from './pages/TeamPage.vue'
import MemberProfilePage from './pages/MemberProfilePage.vue'
import PartnersPage from './pages/PartnersPage.vue'
import ContactPage from './pages/ContactPage.vue'
import ContactsPage from './pages/ContactsPage.vue'
import PublicationPage from './pages/PublicationPage.vue'
import PublicationsPage from './pages/PublicationsPage.vue'
import FAQPage from './pages/FAQPage.vue'
import OntologyDemoPage from './pages/OntologyDemoPage.vue'

// Конфигурация роутера
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
      meta: { title: 'Главная - Ontology.ru' }
    },
    {
      path: '/ontologies',
      name: 'ontologies',
      component: OntologiesPage,
      meta: { title: 'Онтологии - Ontology.ru' }
    },
    {
      path: '/how-it-works',
      name: 'how-it-works',
      component: HowItWorksPage,
      meta: { title: 'Как это работает - Ontology.ru' }
    },
    {
      path: '/why-business',
      name: 'why-business',
      component: WhyBusinessPage,
      meta: { title: 'Зачем бизнесу и IT - Ontology.ru' }
    },
    {
      path: '/science',
      name: 'science',
      component: SciencePage,
      meta: { title: 'Наука - Ontology.ru' }
    },
    {
      path: '/publications',
      name: 'publications',
      component: PublicationsPage,
      meta: { title: 'Публикации - Ontology.ru' }
    },
    {
      path: '/publications/:slug',
      name: 'publication',
      component: PublicationPage,
      meta: { title: 'Публикация - Ontology.ru' }
    },
    {
      path: '/projects',
      name: 'projects',
      component: ProjectsPage,
      meta: { title: 'Кейсы и результаты - Ontology.ru' }
    },
    {
      path: '/resources',
      name: 'resources',
      component: ResourcesPage,
      meta: { title: 'Полезные ссылки - Ontology.ru' }
    },
    {
      path: '/resources/:id',
      name: 'resource-detail',
      component: ResourceDetailPage,
      meta: { title: 'Ресурс - Ontology.ru' }
    },
    {
      path: '/team',
      name: 'team',
      component: TeamPage,
      meta: { title: 'Команда и авторы - Ontology.ru' }
    },
    {
      path: '/team/:slug',
      name: 'member',
      component: MemberProfilePage,
      meta: { title: 'Профиль участника - Ontology.ru' }
    },
    {
      path: '/partners',
      name: 'partners',
      component: PartnersPage,
      meta: { title: 'Партнеры - Ontology.ru' }
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactPage,
      meta: { title: 'Контакты - Ontology.ru' }
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: ContactsPage,
      meta: { title: 'Контакты - Ontology.ru' }
    },
    {
      path: '/faq',
      name: 'faq',
      component: FAQPage,
      meta: { title: 'FAQ - Ontology.ru' }
    },
    {
      path: '/demo/ontology-editor',
      name: 'ontology-demo',
      component: OntologyDemoPage,
      meta: { title: 'Демо редактор онтологий - Ontology.ru' }
    }
  ]
})

// Обновление заголовка страницы при навигации
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

const app = createApp(App)
app.use(router)
app.mount('#app') 