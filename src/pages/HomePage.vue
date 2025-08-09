<template>
  <div class="home-page">
    <CurveDivider />
    <!-- Hero секция -->
    <section class="hero-section">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">
            Онтологии и графы знаний: практики и кейсы
          </h1>
          <p class="hero-subtitle">
            Управление знаниями, семантическая интеграция и интеллектуальные приложения
          </p>
          <div class="hero-actions">
            <router-link to="/projects" class="btn btn-primary icon-btn">
              <svg class="icon" width="18" height="18" aria-hidden="true"><use href="#icon-rocket" /></svg>
              Начать проект
            </router-link>
            <router-link to="/science" class="btn btn-secondary icon-btn">
              <svg class="icon" width="18" height="18" aria-hidden="true"><use href="#icon-book" /></svg>
              Изучить науку
            </router-link>
          </div>
        </div>
        
        <!-- Герой: общий инфо-фокус -->
        <div class="hero-stats" aria-describedby="hero-subline">
          <div class="stat-item">
            <div class="stat-number">
              <svg class="icon" width="18" height="18" aria-hidden="true"><use href="#icon-rocket" /></svg>
              Графы знаний
            </div>
            <div class="stat-label">применение в поиске, аналитике, автоматизации</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Что такое онтологии -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <h2 id="what-is-ontology">Что такое онтологии?</h2>
          <p class="section-subtitle">
            Онтологии — это формальные представления знаний в виде концептуальных схем, 
            которые описывают понятия и их взаимосвязи в определенной предметной области
          </p>
        </div>
        
        <div class="ontology-features">
          <div class="feature-card">
            <div class="feature-icon" aria-hidden="true">
              <svg class="icon" width="32" height="32"><use href="#icon-brain" /></svg>
            </div>
            <h3>Представление знаний</h3>
            <p>Структурированное описание понятий, объектов и их взаимосвязей в предметной области</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon" aria-hidden="true">
              <svg class="icon" width="32" height="32"><use href="#icon-link" /></svg>
            </div>
            <h3>Семантические связи</h3>
            <p>Явное определение отношений между концептами для понимания контекста</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon" aria-hidden="true">
              <svg class="icon" width="32" height="32"><use href="#icon-cpu" /></svg>
            </div>
            <h3>Автоматизация</h3>
            <p>Возможность автоматической обработки и анализа данных на основе онтологий</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon" aria-hidden="true">
              <svg class="icon" width="32" height="32"><use href="#icon-globe" /></svg>
            </div>
            <h3>Интероперабельность</h3>
            <p>Обеспечение совместимости между различными системами и источниками данных</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Зачем (кратко) и Применение -->
    <section class="section bg-secondary">
      <div class="container">
        <div class="section-header">
          <h2 id="why-ontology">Зачем бизнесу и ИТ
            <CitationBadge :to="'/resources#demo'" title="Демо и материалы" />
          </h2>
          <p class="section-subtitle">
            Онтологии делают данные взаимопонимаемыми для людей и машин: ускоряют интеграцию, повышают качество и открывают путь к умным сервисам.
          </p>
        </div>
        
        <div class="applications-grid">
          <div class="application-item">
            <h3><svg class="icon" width="18" height="18" aria-hidden="true"><use href="#icon-clipboard" /></svg> Управление знаниями</h3>
            <ul>
              <li>Единый словарь и модели предметной области</li>
              <li>Повышение качества и согласованности данных</li>
              <li>Онбординг и обмен знаниями</li>
            </ul>
          </div>
          
          <div class="application-item">
            <h3><svg class="icon" width="18" height="18" aria-hidden="true"><use href="#icon-search" /></svg> Семантический поиск</h3>
            <ul>
              <li>Семантическая индексация контента</li>
              <li>Контекстные рекомендации</li>
              <li>Ответы на вопросы</li>
            </ul>
          </div>
          
          <div class="application-item">
            <h3><svg class="icon" width="18" height="18" aria-hidden="true"><use href="#icon-database" /></svg> Управление данными</h3>
            <ul>
              <li>Интеграция разрозненных источников</li>
              <li>Семантический каталог данных</li>
              <li>Качество и согласованность данных</li>
            </ul>
          </div>
          
          <div class="application-item">
            <h3><svg class="icon" width="18" height="18" aria-hidden="true"><use href="#icon-trending-up" /></svg> Оптимизация процессов</h3>
            <ul>
              <li>Анализ эффективности операций</li>
              <li>Планирование ресурсов</li>
              <li>Снижение затрат и времени</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Пайплайн: данные → онтология → граф знаний → сервисы -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <h2 id="pipeline">Как это работает</h2>
          <p class="section-subtitle">Источники данных → онтология → граф знаний → поиск, аналитика, интеграции.
            <CitationBadge :to="'/science#publications'" title="Публикации" />
          </p>
        </div>
        <div class="applications-grid">
          <div class="application-item">
            <h3>Сбор и нормализация</h3>
            <ul>
              <li>Каталогизация источников</li>
              <li>Выделение сущностей и связей</li>
            </ul>
          </div>
          <div class="application-item">
            <h3>Формализация</h3>
            <ul>
              <li>Онтология предметной области</li>
              <li>Выравнивание терминов</li>
            </ul>
          </div>
          <div class="application-item">
            <h3>Граф знаний</h3>
            <ul>
              <li>Запросы и аналитика</li>
              <li>Витрины данных</li>
            </ul>
          </div>
          <div class="application-item">
            <h3>Приложения</h3>
            <ul>
              <li>Поиск и рекомендации</li>
              <li>Автоматизация рабочих процессов</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Преимущества -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <h2>Преимущества использования онтологий</h2>
        </div>
        
        <div class="benefits-grid">
          <div class="benefit-item">
            <div class="benefit-number">01</div>
            <h3>Стандартизация</h3>
            <p>Единый язык для описания предметной области, что обеспечивает понимание между специалистами</p>
          </div>
          
          <div class="benefit-item">
            <div class="benefit-number">02</div>
            <h3>Переиспользование</h3>
            <p>Возможность использования созданных онтологий в различных проектах и системах</p>
          </div>
          
          <div class="benefit-item">
            <div class="benefit-number">03</div>
            <h3>Масштабируемость</h3>
            <p>Легкое расширение и модификация онтологий при изменении требований</p>
          </div>
          
          <div class="benefit-item">
            <div class="benefit-number">04</div>
            <h3>Интеллектуальность</h3>
            <p>Возможность автоматического вывода новых знаний на основе существующих</p>
          </div>
          
          <div class="benefit-item">
            <div class="benefit-number">05</div>
            <h3>Интеграция</h3>
            <p>Объединение данных из различных источников в единую семантическую модель</p>
          </div>
          
          <div class="benefit-item">
            <div class="benefit-number">06</div>
            <h3>Качество</h3>
            <p>Повышение качества данных и снижение ошибок в процессах</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Кейсы/результат и отрасли -->
    <section class="section bg-secondary">
      <div class="container">
        <div class="section-header">
          <h2 id="cases">Кейсы и результаты</h2>
          <p class="section-subtitle">Примеры внедрений из разных отраслей: ИТ, финансы, промышленность, образование.
            <CitationBadge :to="'/science#publications'" title="Публикации" />
          </p>
        </div>
        <div class="applications-grid">
          <div class="application-item">
            <h3>Каталог данных</h3>
            <ul>
              <li>Семантическая инвентаризация</li>
              <li>Поиск по понятиям</li>
            </ul>
          </div>
          <div class="application-item">
            <h3>Персонализация</h3>
            <ul>
              <li>Рекомендательные механизмы</li>
              <li>Контент по интересам</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Технологии -->
    <section class="section bg-secondary">
      <div class="container">
        <div class="section-header">
          <h2>Технологии и инструменты</h2>
          <p class="section-subtitle">
            Современный стек для моделирования знаний и построения графов
          </p>
        </div>
        
        <div class="technologies-grid">
          <div class="tech-category">
            <h3>Языки описания</h3>
            <div class="tech-list">
              <span class="tech-tag">RDF</span>
              <span class="tech-tag">OWL</span>
              <span class="tech-tag">SPARQL</span>
              <span class="tech-tag">RDFS</span>
            </div>
          </div>
          
          <div class="tech-category">
            <h3>Редакторы</h3>
            <div class="tech-list">
              <span class="tech-tag">Protégé</span>
              <span class="tech-tag">TopBraid</span>
              <span class="tech-tag">NeOn</span>
              <span class="tech-tag">WebODE</span>
            </div>
          </div>
          
           <div class="tech-category">
            <h3>Хранилища графов</h3>
            <div class="tech-list">
              <span class="tech-tag">GraphDB</span>
              <span class="tech-tag">Virtuoso</span>
              <span class="tech-tag">AllegroGraph</span>
              <span class="tech-tag">Neo4j</span>
            </div>
          </div>
          
          <div class="tech-category">
            <h3>Фреймворки</h3>
            <div class="tech-list">
              <span class="tech-tag">Jena</span>
              <span class="tech-tag">OWL API</span>
              <span class="tech-tag">RDF4J</span>
              <span class="tech-tag">Apache Jena</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Публикации и CTA -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <h2 id="publications">Публикации</h2>
          <p id="publications" class="section-subtitle">Подборка ключевых публикаций доступна в разделе «Наука».</p>
        </div>
        <div class="applications-grid">
          <div class="application-item">
            <h3>Графы знаний в индустрии</h3>
            <ul>
              <li>Практики построения и применения</li>
              <li>Интеграция и аналитика</li>
            </ul>
          </div>
          <div class="application-item">
            <h3>Семантический веб и онтологии</h3>
            <ul>
              <li>Методологии моделирования</li>
              <li>Сценарии в ИИ и поиске</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Призыв к действию -->
    <section class="section cta-section">
      <div class="container">
        <div class="cta-content">
          <h2>Готовы начать?</h2>
          <p>
            Посмотрите проекты, инструменты и публикации — и соберите свой граф знаний.
          </p>
          <div class="cta-actions">
            <router-link to="/projects" class="btn btn-primary">
              Перейти к проектам
            </router-link>
            <router-link to="/resources" class="btn btn-secondary">
              Инструменты и ресурсы
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import CurveDivider from '../components/CurveDivider.vue'
import CitationBadge from '../components/CitationBadge.vue'

export default {
  name: 'HomePage',
  components: { CurveDivider, CitationBadge },
  setup() {
    return {}
  }
}
</script>

<style scoped>
/* Hero секция */
.hero-section {
  position: relative;
  color: white;
  padding: 7rem 0 4.5rem;
  text-align: left;
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
  max-width: 720px;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-start;
  margin-bottom: 4rem;
}

.hero-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 2rem;
  max-width: 600px;
  margin: 0 auto;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.875rem;
  opacity: 0.8;
  text-transform: uppercase;
  letter-spacing: 0.5px;
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
  max-width: 600px;
  margin: 0 auto;
}

/* Особенности онтологий */
.ontology-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.feature-card {
  text-align: center;
  padding: 2rem;
  background: var(--bg-primary);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-card h3 {
  color: var(--primary-color);
  margin-bottom: 1rem;
}

.feature-card p {
  color: var(--text-secondary);
}

/* Применения */
.applications-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.application-item {
  background: var(--bg-primary);
  padding: 2rem;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
}

.application-item h3 {
  color: var(--primary-color);
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.application-item ul {
  list-style: none;
  padding: 0;
}

.application-item li {
  padding: 0.5rem 0;
  color: var(--text-secondary);
  position: relative;
  padding-left: 1.5rem;
}

.application-item li::before {
  content: '✓';
  color: var(--success-color);
  position: absolute;
  left: 0;
  font-weight: bold;
}

/* Преимущества */
.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.benefit-item {
  background: var(--bg-primary);
  padding: 2rem;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  position: relative;
}

.benefit-number {
  position: absolute;
  top: -1rem;
  left: 2rem;
  background: var(--primary-color);
  color: white;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.25rem;
}

.benefit-item h3 {
  color: var(--primary-color);
  margin: 1rem 0 1rem 0;
}

.benefit-item p {
  color: var(--text-secondary);
}

/* Технологии */
.technologies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.tech-category {
  background: var(--bg-primary);
  padding: 2rem;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
}

.tech-category h3 {
  color: var(--primary-color);
  margin-bottom: 1rem;
  text-align: center;
}

.tech-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
}

.tech-tag {
  background: var(--accent-color);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: var(--radius-sm);
  font-size: 0.875rem;
  font-weight: 500;
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
    font-size: 2.25rem;
  }
  
  .hero-subtitle {
    font-size: 1rem;
  }
  
  .hero-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .hero-stats {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
  
  .stat-number {
    font-size: 2rem;
  }
  
  .section-header h2 {
    font-size: 2rem;
  }
  
  .ontology-features {
    grid-template-columns: 1fr;
  }
  
  .applications-grid {
    grid-template-columns: 1fr;
  }
  
  .benefits-grid {
    grid-template-columns: 1fr;
  }
  
  .technologies-grid {
    grid-template-columns: 1fr;
  }
  
  .cta-actions {
    flex-direction: column;
    align-items: center;
  }
}
</style> 