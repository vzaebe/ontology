import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import './style.css'

// Импорт компонентов страниц
import HomePage from './pages/HomePage.vue'
import ProjectsPage from './pages/ProjectsPage.vue'
import ResourcesPage from './pages/ResourcesPage.vue'
import SciencePage from './pages/SciencePage.vue'
import AuthorsPage from './pages/AuthorsPage.vue'

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
      path: '/projects',
      name: 'projects',
      component: ProjectsPage,
      meta: { title: 'Проекты - Ontology.ru' }
    },
    {
      path: '/resources',
      name: 'resources',
      component: ResourcesPage,
      meta: { title: 'Полезные ссылки - Ontology.ru' }
    },
    {
      path: '/science',
      name: 'science',
      component: SciencePage,
      meta: { title: 'Наука - Ontology.ru' }
    },
    {
      path: '/authors',
      name: 'authors',
      component: AuthorsPage,
      meta: { title: 'Авторы - Ontology.ru' }
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