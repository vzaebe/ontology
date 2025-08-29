<template>
  <div class="ontologies-page">
    <!-- Hero секция -->
    <section class="hero-section">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">Онтологии</h1>
          <p class="hero-subtitle">
            Формальные представления знаний в виде концептуальных схем, 
            которые описывают понятия и их взаимосвязи в определенной предметной области
          </p>
        </div>
      </div>
    </section>

    <!-- Что такое онтологии подробно -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <h2>Что такое онтологии?</h2>
          <p class="section-subtitle">
            Онтология — это формализованное представление знаний о предметной области, включающее концепты, их атрибуты и взаимосвязи
          </p>
        </div>
        
        <div class="definition-grid">
          <div class="definition-card">
            <div class="definition-icon">
              <svg class="icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"></path>
              </svg>
            </div>
            <h3>Концепты (Классы)</h3>
            <p>Основные понятия предметной области: Person, Organization, Product и т.д.</p>
          </div>
          
          <div class="definition-card">
            <div class="definition-icon">
              <svg class="icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
              </svg>
            </div>
            <h3>Свойства (Properties)</h3>
            <p>Атрибуты и отношения между концептами: hasName, worksFor, isPartOf</p>
          </div>
          
          <div class="definition-card">
            <div class="definition-icon">
              <svg class="icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 11H1l6-6 6 6zm-3 8c0-6 4-10 10-10"></path>
                <circle cx="20" cy="20" r="3"></circle>
              </svg>
            </div>
            <h3>Экземпляры (Individuals)</h3>
            <p>Конкретные объекты: "Иван Петров", "ООО Рога и копыта", "Товар №123"</p>
          </div>
          
          <div class="definition-card">
            <div class="definition-icon">
              <svg class="icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"></polyline>
              </svg>
            </div>
            <h3>Ограничения (Axioms)</h3>
            <p>Правила и логические связи: "Каждая персона имеет имя", "Организация может иметь сотрудников"</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Стандарты и технологии -->
    <section class="section bg-secondary">
      <div class="container">
        <div class="section-header">
          <h2>Стандарты семантического веба</h2>
          <p class="section-subtitle">
            Современные технологии W3C для создания и использования онтологий
          </p>
        </div>
        
        <div class="standards-grid">
          <div class="standard-card">
            <div class="standard-header">
              <span class="tech-tag">RDF</span>
              <h3>Resource Description Framework</h3>
            </div>
            <p>Базовая модель данных для представления информации в виде троек: субъект-предикат-объект</p>
            <ul>
              <li>Универсальная модель данных</li>
              <li>Поддержка графовой структуры</li>
              <li>Возможность связывания данных</li>
            </ul>
          </div>
          
          <div class="standard-card">
            <div class="standard-header">
              <span class="tech-tag">RDFS</span>
              <h3>RDF Schema</h3>
            </div>
            <p>Расширение RDF для определения классов, свойств и их иерархий</p>
            <ul>
              <li>Определение классов и подклассов</li>
              <li>Типизация свойств</li>
              <li>Базовая система типов</li>
            </ul>
          </div>
          
          <div class="standard-card">
            <div class="standard-header">
              <span class="tech-tag">OWL</span>
              <h3>Web Ontology Language</h3>
            </div>
            <p>Мощный язык для создания сложных онтологий с логическими выводами</p>
            <ul>
              <li>Сложные ограничения и правила</li>
              <li>Автоматические выводы</li>
              <li>Проверка согласованности</li>
            </ul>
          </div>
          
          <div class="standard-card">
            <div class="standard-header">
              <span class="tech-tag">SPARQL</span>
              <h3>SPARQL Query Language</h3>
            </div>
            <p>Язык запросов для поиска и извлечения данных из RDF графов</p>
            <ul>
              <li>Мощные возможности запросов</li>
              <li>Федеративные запросы</li>
              <li>Обновление данных</li>
            </ul>
          </div>
          
          <div class="standard-card">
            <div class="standard-header">
              <span class="tech-tag">SHACL</span>
              <h3>Shapes Constraint Language</h3>
            </div>
            <p>Язык для валидации RDF графов и определения ограничений на данные</p>
            <ul>
              <li>Валидация структуры данных</li>
              <li>Определение бизнес-правил</li>
              <li>Контроль качества данных</li>
            </ul>
          </div>
          
          <div class="standard-card">
            <div class="standard-header">
              <span class="tech-tag">JSON-LD</span>
              <h3>JSON for Linking Data</h3>
            </div>
            <p>Формат для представления связанных данных в JSON с семантической разметкой</p>
            <ul>
              <li>Простота интеграции</li>
              <li>Веб-совместимость</li>
              <li>Структурированные данные</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Артефакты и результаты -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <h2>Артефакты онтологического моделирования</h2>
          <p class="section-subtitle">
            Что получается в результате разработки онтологий
          </p>
        </div>
        
        <div class="artifacts-grid">
          <div class="artifact-card">
            <div class="artifact-icon">📋</div>
            <h3>Глоссарий терминов</h3>
            <p>Единый словарь понятий предметной области с четкими определениями</p>
          </div>
          
          <div class="artifact-card">
            <div class="artifact-icon">🗂️</div>
            <h3>Схемы данных</h3>
            <p>Структурированные модели для баз данных и API на основе онтологий</p>
          </div>
          
          <div class="artifact-card">
            <div class="artifact-icon">📊</div>
            <h3>Граф знаний</h3>
            <p>Связанные данные для поиска, аналитики и рекомендательных систем</p>
          </div>
          
          <div class="artifact-card">
            <div class="artifact-icon">🔗</div>
            <h3>API интеграций</h3>
            <p>Семантические интерфейсы для обмена данными между системами</p>
          </div>
          
          <div class="artifact-card">
            <div class="artifact-icon">📖</div>
            <h3>Документация</h3>
            <p>Машиночитаемая документация архитектуры и бизнес-процессов</p>
          </div>
          
          <div class="artifact-card">
            <div class="artifact-icon">✅</div>
            <h3>Правила валидации</h3>
            <p>Автоматические проверки качества и согласованности данных</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Где применимо -->
    <section class="section bg-secondary">
      <div class="container">
        <div class="section-header">
          <h2>Области применения</h2>
          <p class="section-subtitle">
            Онтологии находят применение в самых разных сферах деятельности
          </p>
        </div>
        
        <div class="domains-grid">
          <div class="domain-card">
            <h3>🏭 Промышленность</h3>
            <ul>
              <li>Управление активами и оборудованием</li>
              <li>Планирование производства</li>
              <li>Контроль качества продукции</li>
              <li>Соблюдение регулятивных требований</li>
            </ul>
          </div>
          
          <div class="domain-card">
            <h3>🏥 Здравоохранение</h3>
            <ul>
              <li>Медицинские терминологии (SNOMED CT)</li>
              <li>Электронные медицинские карты</li>
              <li>Поддержка принятия решений</li>
              <li>Исследования и фармакология</li>
            </ul>
          </div>
          
          <div class="domain-card">
            <h3>🏛️ Государственный сектор</h3>
            <ul>
              <li>Электронное правительство</li>
              <li>Открытые данные</li>
              <li>Межведомственное взаимодействие</li>
              <li>Цифровые сервисы</li>
            </ul>
          </div>
          
          <div class="domain-card">
            <h3>🏦 Финансы</h3>
            <ul>
              <li>Управление рисками</li>
              <li>Регулятивная отчетность</li>
              <li>KYC и AML процедуры</li>
              <li>Анализ рыночных данных</li>
            </ul>
          </div>
          
          <div class="domain-card">
            <h3>🛒 Электронная коммерция</h3>
            <ul>
              <li>Каталоги товаров</li>
              <li>Рекомендательные системы</li>
              <li>Поиск и фильтрация</li>
              <li>Ценообразование</li>
            </ul>
          </div>
          
          <div class="domain-card">
            <h3>🎓 Образование</h3>
            <ul>
              <li>Управление учебным контентом</li>
              <li>Персонализация обучения</li>
              <li>Научные исследования</li>
              <li>Библиотечные системы</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section cta-section">
      <div class="container">
        <div class="cta-content">
          <h2>Готовы начать работу с онтологиями?</h2>
          <p>
            Узнайте, как онтологии могут улучшить ваши бизнес-процессы и ИТ-системы
          </p>
          <div class="cta-actions">
            <router-link to="/how-it-works" class="btn btn-primary">
              Как это работает
            </router-link>
            <router-link to="/why-business" class="btn btn-secondary">
              Зачем бизнесу
            </router-link>
            <router-link to="/contact" class="btn btn-secondary">
              Получить консультацию
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'OntologiesPage'
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

/* Определения */
.definition-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.definition-card {
  background: var(--bg-primary);
  padding: 2rem;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  text-align: center;
  transition: transform 0.3s ease;
}

.definition-card:hover {
  transform: translateY(-5px);
}

.definition-icon {
  color: var(--primary-color);
  margin-bottom: 1rem;
}

.definition-card h3 {
  color: var(--primary-color);
  margin-bottom: 1rem;
}

.definition-card p {
  color: var(--text-secondary);
}

/* Стандарты */
.standards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.standard-card {
  background: var(--bg-primary);
  padding: 2rem;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  transition: transform 0.3s ease;
}

.standard-card:hover {
  transform: translateY(-5px);
}

.standard-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.tech-tag {
  background: var(--primary-color);
  color: white;
  padding: 0.375rem 0.75rem;
  border-radius: var(--radius-sm);
  font-size: 0.875rem;
  font-weight: 600;
  min-width: 70px;
  text-align: center;
}

.standard-card h3 {
  color: var(--primary-color);
  margin: 0;
  font-size: 1.25rem;
}

.standard-card p {
  color: var(--text-secondary);
  margin-bottom: 1rem;
}

.standard-card ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.standard-card li {
  padding: 0.375rem 0;
  color: var(--text-secondary);
  position: relative;
  padding-left: 1.5rem;
}

.standard-card li::before {
  content: '✓';
  color: var(--success-color);
  position: absolute;
  left: 0;
  font-weight: bold;
}

/* Артефакты */
.artifacts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.artifact-card {
  background: var(--bg-primary);
  padding: 2rem;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  text-align: center;
  transition: transform 0.3s ease;
}

.artifact-card:hover {
  transform: translateY(-5px);
}

.artifact-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.artifact-card h3 {
  color: var(--primary-color);
  margin-bottom: 1rem;
}

.artifact-card p {
  color: var(--text-secondary);
}

/* Домены */
.domains-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
}

.domain-card {
  background: var(--bg-primary);
  padding: 2rem;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  transition: transform 0.3s ease;
}

.domain-card:hover {
  transform: translateY(-5px);
}

.domain-card h3 {
  color: var(--primary-color);
  margin-bottom: 1rem;
  font-size: 1.25rem;
}

.domain-card ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.domain-card li {
  padding: 0.5rem 0;
  color: var(--text-secondary);
  position: relative;
  padding-left: 1.5rem;
}

.domain-card li::before {
  content: '•';
  color: var(--primary-color);
  position: absolute;
  left: 0;
  font-weight: bold;
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
  
  .definition-grid,
  .standards-grid,
  .artifacts-grid,
  .domains-grid {
    grid-template-columns: 1fr;
  }
  
  .cta-actions {
    flex-direction: column;
    align-items: center;
  }
}
</style>
