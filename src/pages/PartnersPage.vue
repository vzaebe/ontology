<template>
  <div class="partners-page">
    <!-- Hero секция -->
    <section class="hero-section">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">Наши партнеры</h1>
          <p class="hero-subtitle">
            Университеты, исследовательские центры и ИТ-компании, с которыми мы развиваем экосистему онтологий и семантических технологий
          </p>
        </div>
      </div>
    </section>

    <!-- Академические партнеры -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <h2>Академические партнеры</h2>
          <p class="section-subtitle">
            Ведущие университеты и исследовательские институты
          </p>
        </div>
        
        <div class="partners-grid">
          <div class="partner-card" v-for="partner in academicPartners" :key="partner.id">
            <div class="partner-logo">
              <img :src="partner.logo" :alt="partner.name" />
            </div>
            <div class="partner-content">
              <h3>{{ partner.name }}</h3>
              <p class="partner-description">{{ partner.description }}</p>
              <div class="partner-details">
                <div class="detail-item" v-if="partner.location">
                  <span class="detail-icon">📍</span>
                  <span>{{ partner.location }}</span>
                </div>
                <div class="detail-item" v-if="partner.founded">
                  <span class="detail-icon">📅</span>
                  <span>Основан в {{ partner.founded }}</span>
                </div>
                <div class="detail-item" v-if="partner.specialization">
                  <span class="detail-icon">🎓</span>
                  <span>{{ partner.specialization }}</span>
                </div>
              </div>
              <div class="partner-projects" v-if="partner.projects">
                <h4>Совместные проекты:</h4>
                <ul>
                  <li v-for="project in partner.projects" :key="project">{{ project }}</li>
                </ul>
              </div>
              <div class="partner-links" v-if="partner.website">
                <a :href="partner.website" target="_blank" class="btn btn-secondary">
                  Перейти на сайт
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ИТ-компании -->
    <section class="section bg-secondary">
      <div class="container">
        <div class="section-header">
          <h2>Технологические партнеры</h2>
          <p class="section-subtitle">
            ИТ-компании и поставщики технологических решений
          </p>
        </div>
        
        <div class="partners-grid">
          <div class="partner-card" v-for="partner in techPartners" :key="partner.id">
            <div class="partner-logo">
              <img :src="partner.logo" :alt="partner.name" />
            </div>
            <div class="partner-content">
              <h3>{{ partner.name }}</h3>
              <p class="partner-description">{{ partner.description }}</p>
              <div class="partner-details">
                <div class="detail-item" v-if="partner.location">
                  <span class="detail-icon">📍</span>
                  <span>{{ partner.location }}</span>
                </div>
                <div class="detail-item" v-if="partner.specialization">
                  <span class="detail-icon">💼</span>
                  <span>{{ partner.specialization }}</span>
                </div>
                <div class="detail-item" v-if="partner.products">
                  <span class="detail-icon">🛠️</span>
                  <span>{{ partner.products.join(', ') }}</span>
                </div>
              </div>
              <div class="partner-collaboration" v-if="partner.collaboration">
                <h4>Сотрудничество:</h4>
                <ul>
                  <li v-for="item in partner.collaboration" :key="item">{{ item }}</li>
                </ul>
              </div>
              <div class="partner-links" v-if="partner.website">
                <a :href="partner.website" target="_blank" class="btn btn-secondary">
                  Перейти на сайт
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Отраслевые организации -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <h2>Отраслевые организации</h2>
          <p class="section-subtitle">
            Профессиональные ассоциации и стандартизационные организации
          </p>
        </div>
        
        <div class="organizations-grid">
          <div class="organization-card" v-for="org in industryOrganizations" :key="org.id">
            <div class="org-header">
              <div class="org-logo">
                <img :src="org.logo" :alt="org.name" />
              </div>
              <div class="org-info">
                <h3>{{ org.name }}</h3>
                <p class="org-type">{{ org.type }}</p>
              </div>
            </div>
            <div class="org-content">
              <p class="org-description">{{ org.description }}</p>
              <div class="org-focus" v-if="org.focus">
                <h4>Направления работы:</h4>
                <div class="focus-tags">
                  <span class="focus-tag" v-for="focus in org.focus" :key="focus">{{ focus }}</span>
                </div>
              </div>
              <div class="org-participation" v-if="org.participation">
                <h4>Наше участие:</h4>
                <ul>
                  <li v-for="item in org.participation" :key="item">{{ item }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Возможности партнерства -->
    <section class="section bg-secondary">
      <div class="container">
        <div class="section-header">
          <h2>Возможности для партнерства</h2>
          <p class="section-subtitle">
            Как мы можем сотрудничать для развития семантических технологий
          </p>
        </div>
        
        <div class="opportunities-grid">
          <div class="opportunity-card">
            <div class="opportunity-icon">🎓</div>
            <h3>Академическое сотрудничество</h3>
            <ul>
              <li>Совместные исследовательские проекты</li>
              <li>Публикации в международных журналах</li>
              <li>Обмен студентами и аспирантами</li>
              <li>Участие в конференциях и воркшопах</li>
            </ul>
            <router-link to="/contact" class="opportunity-cta">Предложить сотрудничество</router-link>
          </div>

          <div class="opportunity-card">
            <div class="opportunity-icon">🚀</div>
            <h3>Коммерческое партнерство</h3>
            <ul>
              <li>Разработка отраслевых решений</li>
              <li>Интеграция продуктов</li>
              <li>Совместные продажи</li>
              <li>Техническая поддержка проектов</li>
            </ul>
            <router-link to="/contact" class="opportunity-cta">Обсудить партнерство</router-link>
          </div>

          <div class="opportunity-card">
            <div class="opportunity-icon">📊</div>
            <h3>Отраслевые инициативы</h3>
            <ul>
              <li>Создание отраслевых стандартов</li>
              <li>Развитие экосистемы инструментов</li>
              <li>Образовательные программы</li>
              <li>Open source проекты</li>
            </ul>
            <router-link to="/contact" class="opportunity-cta">Присоединиться</router-link>
          </div>

          <div class="opportunity-card">
            <div class="opportunity-icon">🌐</div>
            <h3>Международная кооперация</h3>
            <ul>
              <li>Участие в международных консорциумах</li>
              <li>Грантовые программы ЕС</li>
              <li>Обмен экспертизой</li>
              <li>Стандартизация W3C</li>
            </ul>
            <router-link to="/contact" class="opportunity-cta">Узнать подробности</router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Процесс партнерства -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <h2>Как стать партнером</h2>
          <p class="section-subtitle">
            Простой процесс установления партнерских отношений
          </p>
        </div>
        
        <div class="process-steps">
          <div class="process-step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h3>Первый контакт</h3>
              <p>Отправьте нам предложение о сотрудничестве через форму обратной связи или напишите на email</p>
            </div>
          </div>

          <div class="process-step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h3>Обсуждение возможностей</h3>
              <p>Проводим встречу для обсуждения взаимных интересов и возможных форм сотрудничества</p>
            </div>
          </div>

          <div class="process-step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h3>Планирование проекта</h3>
              <p>Разрабатываем план совместной работы с определением ролей, ресурсов и временных рамок</p>
            </div>
          </div>

          <div class="process-step">
            <div class="step-number">4</div>
            <div class="step-content">
              <h3>Формализация партнерства</h3>
              <p>Подписываем соглашение о сотрудничестве и начинаем реализацию совместных инициатив</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section cta-section">
      <div class="container">
        <div class="cta-content">
          <h2>Готовы к сотрудничеству?</h2>
          <p>
            Расскажите о ваших идеях и возможностях для партнерства
          </p>
          <div class="cta-actions">
            <router-link to="/contact" class="btn btn-primary">
              Предложить сотрудничество
            </router-link>
            <a href="mailto:partners@ontology.ru" class="btn btn-secondary">
              partners@ontology.ru
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'PartnersPage',
  setup() {
    const academicPartners = [
      {
        id: 'msu',
        name: 'МГУ им. М.В. Ломоносова',
        description: 'Ведущий классический университет России с мощной школой математики и кибернетики',
        logo: '/partners/msu-logo.png',
        location: 'Москва, Россия',
        founded: '1755',
        specialization: 'Фундаментальная математика, информатика',
        projects: [
          'Онтологии для научных публикаций',
          'Семантический поиск в академических базах'
        ],
        website: 'https://www.msu.ru'
      },
      {
        id: 'mit',
        name: 'Massachusetts Institute of Technology',
        description: 'Лидер в области компьютерных наук и искусственного интеллекта',
        logo: '/partners/mit-logo.png',
        location: 'Кембридж, США',
        founded: '1861',
        specialization: 'ИИ, семантический веб',
        projects: [
          'Исследования в области Linked Data',
          'Автоматическое извлечение знаний'
        ],
        website: 'https://www.mit.edu'
      },
      {
        id: 'oxford',
        name: 'University of Oxford',
        description: 'Один из старейших университетов мира с сильной школой логики и философии',
        logo: '/partners/oxford-logo.png',
        location: 'Оксфорд, Великобритания',
        founded: '1096',
        specialization: 'Логика, формальные методы',
        projects: [
          'Теоретические основы онтологий',
          'Верификация онтологических моделей'
        ],
        website: 'https://www.ox.ac.uk'
      }
    ]

    const techPartners = [
      {
        id: 'ontotext',
        name: 'Ontotext',
        description: 'Ведущий поставщик решений для семантических технологий и графов знаний',
        logo: '/partners/ontotext-logo.png',
        location: 'София, Болгария',
        specialization: 'GraphDB, семантические платформы',
        products: ['GraphDB', 'GraphDB Cloud', 'Ontotext Platform'],
        collaboration: [
          'Использование GraphDB в проектах',
          'Совместная разработка коннекторов',
          'Техническая поддержка'
        ],
        website: 'https://www.ontotext.com'
      },
      {
        id: 'stardog',
        name: 'Stardog',
        description: 'Платформа для корпоративных графов знаний и виртуализации данных',
        logo: '/partners/stardog-logo.png',
        location: 'Вашингтон, США',
        specialization: 'Enterprise Knowledge Graph',
        products: ['Stardog Cloud', 'Stardog Studio', 'Stardog Designer'],
        collaboration: [
          'Интеграция с корпоративными системами',
          'Обучение и сертификация',
          'Совместные вебинары'
        ],
        website: 'https://www.stardog.com'
      },
      {
        id: 'cambridge-semantics',
        name: 'Cambridge Semantics',
        description: 'Поставщик корпоративных решений для аналитики данных на основе семантических технологий',
        logo: '/partners/cambridge-logo.png',
        location: 'Бостон, США',
        specialization: 'AnzoGraph, аналитика данных',
        products: ['AnzoGraph DB', 'Anzo Platform'],
        collaboration: [
          'Пилотные проекты в финансовом секторе',
          'Обмен экспертизой',
          'Совместные исследования'
        ],
        website: 'https://cambridgesemantics.com'
      }
    ]

    const industryOrganizations = [
      {
        id: 'w3c',
        name: 'World Wide Web Consortium',
        type: 'Международный консорциум',
        description: 'Основная организация по стандартизации технологий семантического веба',
        logo: '/partners/w3c-logo.png',
        focus: ['RDF', 'OWL', 'SPARQL', 'JSON-LD', 'SHACL'],
        participation: [
          'Участие в рабочих группах по семантическому вебу',
          'Рецензирование спецификаций',
          'Представление российского сообщества'
        ]
      },
      {
        id: 'iosb',
        name: 'Industrial Ontologies Summit',
        type: 'Отраслевое сообщество',
        description: 'Ведущее сообщество по разработке и применению онтологий в промышленности',
        logo: '/partners/iosb-logo.png',
        focus: ['Промышленные онтологии', 'IoT', 'Цифровые двойники'],
        participation: [
          'Ежегодное участие в саммите',
          'Презентации кейсов внедрения',
          'Организация российских мероприятий'
        ]
      },
      {
        id: 'fair',
        name: 'GO FAIR International',
        type: 'Глобальная инициатива',
        description: 'Движение за открытые и совместимые научные данные',
        logo: '/partners/fair-logo.png',
        focus: ['FAIR данные', 'Метаданные', 'Интероперабельность'],
        participation: [
          'Разработка FAIR-совместимых онтологий',
          'Участие в образовательных программах',
          'Локализация стандартов'
        ]
      }
    ]

    return {
      academicPartners,
      techPartners,
      industryOrganizations
    }
  }
}
</script>

<style scoped>
/* Hero секция */
.hero-section {
  position: relative;
  color: white;
  padding: 7rem 0 4.5rem;
  text-align: center;
  overflow: hidden;
}

.hero-title {
  font-size: 3.75rem;
  font-weight: 900;
  margin-bottom: 1.25rem;
  line-height: 1.1;
}

.hero-subtitle {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.95;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

/* Секции */
.section {
  padding: 5rem 0;
}

.bg-secondary {
  background: var(--bg-secondary);
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-header h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: var(--primary-color);
}

.section-subtitle {
  font-size: 1.125rem;
  color: var(--text-secondary);
  max-width: 700px;
  margin: 0 auto;
}

/* Партнеры */
.partners-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
}

.partner-card {
  background: var(--bg-primary);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  overflow: hidden;
  transition: transform 0.3s ease;
}

.partner-card:hover {
  transform: translateY(-5px);
}

.partner-logo {
  padding: 2rem;
  text-align: center;
  background: var(--bg-tertiary);
}

.partner-logo img {
  max-width: 150px;
  max-height: 80px;
  object-fit: contain;
}

.partner-content {
  padding: 2rem;
}

.partner-content h3 {
  color: var(--primary-color);
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.partner-description {
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.partner-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.detail-icon {
  font-size: 1rem;
}

.partner-projects,
.partner-collaboration {
  margin-bottom: 1.5rem;
}

.partner-projects h4,
.partner-collaboration h4 {
  color: var(--text-primary);
  margin-bottom: 0.75rem;
  font-size: 1rem;
}

.partner-projects ul,
.partner-collaboration ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.partner-projects li,
.partner-collaboration li {
  padding: 0.25rem 0;
  color: var(--text-secondary);
  position: relative;
  padding-left: 1.5rem;
  font-size: 0.9rem;
}

.partner-projects li::before,
.partner-collaboration li::before {
  content: '•';
  color: var(--primary-color);
  position: absolute;
  left: 0;
  font-weight: bold;
}

.partner-links {
  text-align: center;
}

/* Организации */
.organizations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.organization-card {
  background: var(--bg-primary);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  overflow: hidden;
  transition: transform 0.3s ease;
}

.organization-card:hover {
  transform: translateY(-5px);
}

.org-header {
  background: var(--bg-tertiary);
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.org-logo img {
  width: 60px;
  height: 60px;
  object-fit: contain;
}

.org-info h3 {
  color: var(--primary-color);
  margin: 0 0 0.25rem 0;
  font-size: 1.25rem;
}

.org-type {
  color: var(--text-secondary);
  margin: 0;
  font-size: 0.9rem;
}

.org-content {
  padding: 2rem;
}

.org-description {
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.org-focus,
.org-participation {
  margin-bottom: 1.5rem;
}

.org-focus h4,
.org-participation h4 {
  color: var(--text-primary);
  margin-bottom: 0.75rem;
  font-size: 1rem;
}

.focus-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.focus-tag {
  background: var(--primary-color);
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: var(--radius-sm);
  font-size: 0.8rem;
}

.org-participation ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.org-participation li {
  padding: 0.25rem 0;
  color: var(--text-secondary);
  position: relative;
  padding-left: 1.5rem;
  font-size: 0.9rem;
}

.org-participation li::before {
  content: '✓';
  color: var(--success-color);
  position: absolute;
  left: 0;
  font-weight: bold;
}

/* Возможности */
.opportunities-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.opportunity-card {
  background: var(--bg-primary);
  padding: 2rem;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  text-align: center;
  transition: transform 0.3s ease;
}

.opportunity-card:hover {
  transform: translateY(-5px);
}

.opportunity-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.opportunity-card h3 {
  color: var(--primary-color);
  margin-bottom: 1.5rem;
  font-size: 1.25rem;
}

.opportunity-card ul {
  list-style: none;
  padding: 0;
  margin: 0 0 2rem 0;
  text-align: left;
}

.opportunity-card li {
  padding: 0.5rem 0;
  color: var(--text-secondary);
  position: relative;
  padding-left: 1.5rem;
}

.opportunity-card li::before {
  content: '•';
  color: var(--primary-color);
  position: absolute;
  left: 0;
  font-weight: bold;
}

.opportunity-cta {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 600;
  border-bottom: 2px solid transparent;
  transition: border-color 0.2s ease;
}

.opportunity-cta:hover {
  border-bottom-color: var(--primary-color);
}

/* Процесс */
.process-steps {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.process-step {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
  background: var(--bg-primary);
  padding: 2rem;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
}

.step-number {
  width: 60px;
  height: 60px;
  background: var(--primary-color);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  flex-shrink: 0;
}

.step-content h3 {
  color: var(--primary-color);
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
}

.step-content p {
  color: var(--text-secondary);
  margin: 0;
}

/* CTA секция */
.cta-section {
  background: radial-gradient(600px 400px at 12% 20%, rgba(255,47,109,0.35), transparent 60%),
              linear-gradient(135deg, #2a0b3b, #0a0d1f 70%);
  color: white;
  text-align: center;
}

.cta-content h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.cta-content p {
  font-size: 1.125rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.cta-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

/* Адаптивность */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1rem;
  }
  
  .section-header h2 {
    font-size: 2rem;
  }
  
  .partners-grid,
  .organizations-grid,
  .opportunities-grid {
    grid-template-columns: 1fr;
  }
  
  .org-header {
    flex-direction: column;
    text-align: center;
  }
  
  .process-step {
    flex-direction: column;
    text-align: center;
  }
  
  .cta-actions {
    flex-direction: column;
    align-items: center;
  }
}
</style>
