<template>
  <div class="resource-detail-page" v-if="resource">
    <!-- Навигационные крошки -->
    <section class="breadcrumbs">
      <div class="container">
        <nav class="breadcrumb-nav">
          <router-link to="/" class="breadcrumb-item">Главная</router-link>
          <span class="breadcrumb-separator">→</span>
          <router-link to="/resources" class="breadcrumb-item">Ресурсы</router-link>
          <span class="breadcrumb-separator">→</span>
          <span class="breadcrumb-current">{{ resource.title }}</span>
        </nav>
      </div>
    </section>

    <!-- Hero секция -->
    <section class="hero-section">
      <div class="container">
        <div class="hero-content">
          <div class="resource-header">
            <div class="resource-icon" v-if="resource.icon">
              {{ resource.icon }}
            </div>
            <div class="resource-meta">
              <span class="resource-type" :class="`type-${resource.type}`">{{ getTypeLabel(resource.type) }}</span>
              <h1 class="resource-title">{{ resource.title }}</h1>
              <p class="resource-short" v-if="resource.short">{{ resource.short }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Основная информация -->
    <section class="section">
      <div class="container">
        <div class="resource-layout">
          <!-- Основной контент -->
          <div class="resource-content">
            <div class="description-section" v-if="resource.full">
              <h2>Описание</h2>
              <div class="description-content" v-html="resource.full"></div>
            </div>

            <div class="usage-section" v-if="resource.when_to_use">
              <h2>Когда использовать</h2>
              <div class="usage-content" v-html="resource.when_to_use"></div>
            </div>

            <div class="features-section" v-if="resource.features">
              <h2>Основные возможности</h2>
              <ul class="features-list">
                <li v-for="feature in resource.features" :key="feature">{{ feature }}</li>
              </ul>
            </div>

            <div class="examples-section" v-if="resource.examples">
              <h2>Примеры использования</h2>
              <div class="examples-grid">
                <div class="example-card" v-for="example in resource.examples" :key="example.title">
                  <h4>{{ example.title }}</h4>
                  <p>{{ example.description }}</p>
                  <pre v-if="example.code"><code>{{ example.code }}</code></pre>
                </div>
              </div>
            </div>

            <div class="alternatives-section" v-if="resource.alternatives">
              <h2>Альтернативы</h2>
              <div class="alternatives-grid">
                <div class="alternative-card" v-for="alt in resource.alternatives" :key="alt.name">
                  <h4>{{ alt.name }}</h4>
                  <p>{{ alt.description }}</p>
                  <div class="comparison-points" v-if="alt.vs">
                    <h5>Сравнение:</h5>
                    <ul>
                      <li v-for="point in alt.vs" :key="point">{{ point }}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Боковая панель -->
          <div class="resource-sidebar">
            <!-- Ссылки -->
            <div class="sidebar-section" v-if="resource.links && resource.links.length">
              <h3>Полезные ссылки</h3>
              <div class="links-list">
                <a 
                  v-for="link in resource.links" 
                  :key="link.url" 
                  :href="link.url" 
                  target="_blank" 
                  class="resource-link"
                >
                  <span class="link-icon">🔗</span>
                  <span class="link-text">{{ link.label }}</span>
                  <span class="link-external">↗</span>
                </a>
              </div>
            </div>

            <!-- Технические детали -->
            <div class="sidebar-section" v-if="resource.tech_details">
              <h3>Технические детали</h3>
              <div class="tech-details">
                <div class="tech-item" v-if="resource.tech_details.license">
                  <span class="tech-label">Лицензия:</span>
                  <span class="tech-value">{{ resource.tech_details.license }}</span>
                </div>
                <div class="tech-item" v-if="resource.tech_details.language">
                  <span class="tech-label">Язык:</span>
                  <span class="tech-value">{{ resource.tech_details.language }}</span>
                </div>
                <div class="tech-item" v-if="resource.tech_details.platforms">
                  <span class="tech-label">Платформы:</span>
                  <span class="tech-value">{{ resource.tech_details.platforms.join(', ') }}</span>
                </div>
                <div class="tech-item" v-if="resource.tech_details.latest_version">
                  <span class="tech-label">Версия:</span>
                  <span class="tech-value">{{ resource.tech_details.latest_version }}</span>
                </div>
              </div>
            </div>

            <!-- Связанные ресурсы -->
            <div class="sidebar-section" v-if="resource.related && resource.related.length">
              <h3>Связанные ресурсы</h3>
              <div class="related-list">
                <router-link 
                  v-for="relatedId in resource.related" 
                  :key="relatedId"
                  :to="`/resources/${relatedId}`"
                  class="related-link"
                >
                  {{ getResourceTitle(relatedId) }}
                </router-link>
              </div>
            </div>

            <!-- Теги -->
            <div class="sidebar-section" v-if="resource.tags && resource.tags.length">
              <h3>Теги</h3>
              <div class="tags-list">
                <span v-for="tag in resource.tags" :key="tag" class="tag">{{ tag }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Навигация по ресурсам -->
    <section class="section navigation-section">
      <div class="container">
        <div class="resource-navigation">
          <router-link 
            v-if="previousResource" 
            :to="`/resources/${previousResource.id}`" 
            class="nav-link nav-prev"
          >
            <span class="nav-direction">← Предыдущий</span>
            <span class="nav-title">{{ previousResource.title }}</span>
          </router-link>
          
          <router-link to="/resources" class="nav-link nav-back">
            <span class="nav-direction">Все ресурсы</span>
          </router-link>
          
          <router-link 
            v-if="nextResource" 
            :to="`/resources/${nextResource.id}`" 
            class="nav-link nav-next"
          >
            <span class="nav-direction">Следующий →</span>
            <span class="nav-title">{{ nextResource.title }}</span>
          </router-link>
        </div>
      </div>
    </section>
  </div>

  <!-- Ресурс не найден -->
  <div v-else class="not-found">
    <div class="container">
      <div class="not-found-content">
        <h1>Ресурс не найден</h1>
        <p>Запрашиваемый ресурс не существует или был удален.</p>
        <router-link to="/resources" class="btn btn-primary">
          Вернуться к списку ресурсов
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'ResourceDetailPage',
  setup() {
    const route = useRoute()
    
    // Мок данных ресурсов - в реальном приложении эти данные должны быть в отдельном файле
    const allResources = [
      {
        id: 'protege',
        title: 'Protégé',
        type: 'editor',
        icon: '🛠️',
        short: 'Бесплатный open source редактор онтологий от Стэнфордского университета',
        full: `
          <p>Protégé — это самый популярный бесплатный редактор онтологий с графическим интерфейсом. Разрабатывается Стэнфордским университетом и поддерживается активным сообществом.</p>
          <p>Это настольное приложение на Java, которое предоставляет полный набор инструментов для создания, редактирования и валидации OWL онтологий.</p>
        `,
        when_to_use: `
          <p>Используйте Protégé когда:</p>
          <ul>
            <li>Начинаете изучать онтологии — низкий порог входа</li>
            <li>Нужен визуальный редактор с графическим интерфейсом</li>
            <li>Создаете образовательные проекты</li>
            <li>Прототипируете онтологии перед переносом в production</li>
          </ul>
        `,
        features: [
          'Визуальное создание классов, свойств и экземпляров',
          'Встроенные reasoner\'ы (HermiT, Pellet, FaCT++)',
          'Импорт/экспорт в различных форматах (OWL, RDF, TTL)',
          'Плагины для расширения функциональности',
          'Валидация онтологий',
          'Поддержка SPARQL запросов'
        ],
        examples: [
          {
            title: 'Создание простого класса',
            description: 'Пример создания класса Person с базовыми свойствами',
            code: `# В Protégé создается графически, но эквивалентная OWL запись:
:Person rdf:type owl:Class ;
        rdfs:label "Person" ;
        rdfs:comment "Represents a human person" .`
          }
        ],
        links: [
          { label: 'Официальный сайт', url: 'https://protege.stanford.edu/' },
          { label: 'Документация', url: 'https://protege.stanford.edu/products.php' },
          { label: 'Туториалы', url: 'https://protege.stanford.edu/products.php#desktop-protege' }
        ],
        tech_details: {
          license: 'BSD 2-Clause',
          language: 'Java',
          platforms: ['Windows', 'macOS', 'Linux'],
          latest_version: '5.6.0'
        },
        tags: ['OWL', 'редактор', 'desktop', 'бесплатный'],
        related: ['owl-api', 'graphdb'],
        alternatives: [
          {
            name: 'TopBraid Composer',
            description: 'Коммерческая IDE для семантических технологий',
            vs: [
              'Более профессиональные возможности',
              'Лучшая интеграция с enterprise системами',
              'Платная лицензия'
            ]
          }
        ]
      },
      {
        id: 'graphdb',
        title: 'GraphDB',
        type: 'database',
        icon: '🗄️',
        short: 'Высокопроизводительная RDF база данных с поддержкой SPARQL и рассуждений',
        full: `
          <p>GraphDB — это enterprise-класса RDF триплстор от компании Ontotext. Это одна из самых производительных баз данных для семантических данных.</p>
          <p>Поддерживает полный стек семантических технологий: RDF, RDFS, OWL, SPARQL, и предоставляет встроенные возможности для рассуждений.</p>
        `,
        when_to_use: `
          <p>Выбирайте GraphDB для:</p>
          <ul>
            <li>Production приложений с большими объемами данных</li>
            <li>Когда нужны высокая производительность и масштабируемость</li>
            <li>Проектов требующих встроенные reasoner'ы</li>
            <li>Enterprise интеграций</li>
          </ul>
        `,
        features: [
          'Высокая производительность SPARQL запросов',
          'Встроенные OWL reasoner\'ы',
          'Поддержка кластеризации',
          'GraphQL интерфейс',
          'REST API',
          'Веб-интерфейс для администрирования',
          'Поддержка GeoSPARQL'
        ],
        links: [
          { label: 'Официальный сайт', url: 'https://www.ontotext.com/products/graphdb/' },
          { label: 'Документация', url: 'https://graphdb.ontotext.com/' },
          { label: 'Free версия', url: 'https://www.ontotext.com/products/graphdb/graphdb-free/' }
        ],
        tech_details: {
          license: 'Proprietary (есть free версия)',
          language: 'Java',
          platforms: ['Docker', 'Linux', 'Windows'],
          latest_version: '10.0'
        },
        tags: ['RDF', 'SPARQL', 'production', 'enterprise'],
        related: ['sparql', 'rdf4j']
      },
      {
        id: 'owl-api',
        title: 'OWL API',
        type: 'library',
        icon: '📚',
        short: 'Java библиотека для программной работы с OWL онтологиями',
        full: `
          <p>OWL API — это де-факто стандартная Java библиотека для работы с OWL онтологиями. Используется в большинстве Java-приложений, работающих с онтологиями.</p>
          <p>Предоставляет полный набор классов и методов для создания, загрузки, модификации и сохранения OWL онтологий.</p>
        `,
        when_to_use: `
          <p>Используйте OWL API когда:</p>
          <ul>
            <li>Разрабатываете Java приложения с онтологиями</li>
            <li>Нужно программно создавать или модифицировать онтологии</li>
            <li>Интегрируете reasoner'ы в приложение</li>
            <li>Создаете инструменты для работы с OWL</li>
          </ul>
        `,
        features: [
          'Полная поддержка OWL 2',
          'Интеграция с популярными reasoner\'ами',
          'Различные форматы сериализации',
          'Валидация онтологий',
          'Утилиты для работы с аксиомами',
          'Поддержка imports и модульности'
        ],
        examples: [
          {
            title: 'Создание онтологии',
            description: 'Пример создания простой онтологии программно',
            code: `OWLOntologyManager manager = OWLManager.createOWLOntologyManager();
OWLOntology ontology = manager.createOntology(IRI.create("http://example.org/ontology"));

OWLDataFactory factory = manager.getOWLDataFactory();
OWLClass personClass = factory.getOWLClass("http://example.org/Person");

OWLDeclarationAxiom declaration = factory.getOWLDeclarationAxiom(personClass);
manager.addAxiom(ontology, declaration);`
          }
        ],
        links: [
          { label: 'GitHub репозиторий', url: 'https://github.com/owlcs/owlapi' },
          { label: 'Документация', url: 'https://github.com/owlcs/owlapi/wiki' },
          { label: 'Maven Central', url: 'https://search.maven.org/artifact/net.sourceforge.owlapi/owlapi-distribution' }
        ],
        tech_details: {
          license: 'Apache 2.0',
          language: 'Java',
          platforms: ['JVM'],
          latest_version: '5.1.20'
        },
        tags: ['Java', 'OWL', 'библиотека', 'программирование'],
        related: ['protege', 'jena']
      },
      {
        id: 'sparql',
        title: 'SPARQL',
        type: 'standard',
        icon: '🔍',
        short: 'Стандартный язык запросов для RDF данных',
        full: `
          <p>SPARQL (SPARQL Protocol and RDF Query Language) — это стандарт W3C для запросов к RDF данным. Это SQL для семантического веба.</p>
          <p>SPARQL позволяет извлекать, добавлять, изменять и удалять RDF данные, а также выполнять федеративные запросы к нескольким источникам данных.</p>
        `,
        when_to_use: `
          <p>SPARQL необходим для:</p>
          <ul>
            <li>Поиска и извлечения данных из RDF графов</li>
            <li>Аналитики над семантическими данными</li>
            <li>Интеграции данных из разных источников</li>
            <li>Создания семантических веб-сервисов</li>
          </ul>
        `,
        features: [
          'SELECT запросы для извлечения данных',
          'CONSTRUCT для создания новых RDF графов',
          'ASK для проверки существования паттернов',
          'UPDATE операции (INSERT, DELETE)',
          'Федеративные запросы (SERVICE)',
          'Агрегатные функции (COUNT, SUM, AVG)',
          'Фильтрация и сортировка результатов'
        ],
        examples: [
          {
            title: 'Простой SELECT запрос',
            description: 'Получение всех людей и их имен из графа',
            code: `PREFIX foaf: <http://xmlns.com/foaf/0.1/>

SELECT ?person ?name
WHERE {
    ?person a foaf:Person ;
            foaf:name ?name .
}
ORDER BY ?name`
          },
          {
            title: 'Федеративный запрос',
            description: 'Запрос к удаленному SPARQL endpoint',
            code: `PREFIX dbr: <http://dbpedia.org/resource/>
PREFIX dbo: <http://dbpedia.org/ontology/>

SELECT ?city ?population
WHERE {
    SERVICE <https://dbpedia.org/sparql> {
        ?city a dbo:City ;
              dbo:populationTotal ?population .
        FILTER(?population > 1000000)
    }
}
LIMIT 10`
          }
        ],
        links: [
          { label: 'W3C SPARQL 1.1 Spec', url: 'https://www.w3.org/TR/sparql11-query/' },
          { label: 'SPARQL Tutorial', url: 'https://jena.apache.org/tutorials/sparql.html' },
          { label: 'SPARQL by Example', url: 'https://www.cambridgesemantics.com/blog/semantic-university/learn-sparql/' }
        ],
        tech_details: {
          license: 'W3C Standard',
          language: 'Query Language',
          platforms: ['Все SPARQL-совместимые системы']
        },
        tags: ['W3C', 'запросы', 'RDF', 'стандарт'],
        related: ['graphdb', 'jena']
      }
    ]

    const resourceId = computed(() => route.params.id)
    const resource = computed(() => 
      allResources.find(r => r.id === resourceId.value)
    )
    
    const resourceIndex = computed(() => 
      allResources.findIndex(r => r.id === resourceId.value)
    )
    
    const previousResource = computed(() => {
      const index = resourceIndex.value
      return index > 0 ? allResources[index - 1] : null
    })
    
    const nextResource = computed(() => {
      const index = resourceIndex.value
      return index >= 0 && index < allResources.length - 1 ? allResources[index + 1] : null
    })

    const getTypeLabel = (type) => {
      const labels = {
        'editor': 'Редактор',
        'database': 'База данных',
        'library': 'Библиотека',
        'standard': 'Стандарт',
        'tool': 'Инструмент',
        'framework': 'Фреймворк'
      }
      return labels[type] || type
    }

    const getResourceTitle = (id) => {
      const res = allResources.find(r => r.id === id)
      return res ? res.title : id
    }

    return {
      resource,
      previousResource,
      nextResource,
      getTypeLabel,
      getResourceTitle
    }
  }
}
</script>

<style scoped>
/* Навигационные крошки */
.breadcrumbs {
  background: var(--bg-secondary);
  padding: 1rem 0;
}

.breadcrumb-nav {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
}

.breadcrumb-item {
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.2s ease;
}

.breadcrumb-item:hover {
  color: var(--primary-color);
}

.breadcrumb-separator {
  color: var(--text-light);
}

.breadcrumb-current {
  color: var(--text-primary);
  font-weight: 500;
}

/* Hero секция */
.hero-section {
  position: relative;
  color: white;
  padding: 4rem 0 3rem;
  background: var(--bg-primary);
}

.resource-header {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
}

.resource-icon {
  font-size: 4rem;
  flex-shrink: 0;
}

.resource-meta {
  flex: 1;
}

.resource-type {
  display: inline-block;
  padding: 0.375rem 0.75rem;
  border-radius: var(--radius-sm);
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.type-editor { background: #4caf50; color: white; }
.type-database { background: #2196f3; color: white; }
.type-library { background: #ff9800; color: white; }
.type-standard { background: #9c27b0; color: white; }
.type-tool { background: #607d8b; color: white; }
.type-framework { background: #795548; color: white; }

.resource-title {
  font-size: 3rem;
  font-weight: 900;
  margin-bottom: 1rem;
  line-height: 1.1;
}

.resource-short {
  font-size: 1.25rem;
  opacity: 0.9;
  margin: 0;
}

/* Основной контент */
.section {
  padding: 4rem 0;
}

.resource-layout {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 4rem;
}

.resource-content h2 {
  color: var(--primary-color);
  font-size: 1.75rem;
  margin: 3rem 0 1.5rem 0;
}

.resource-content h2:first-child {
  margin-top: 0;
}

.description-content,
.usage-content {
  color: var(--text-secondary);
  line-height: 1.7;
}

.description-content p,
.usage-content p {
  margin-bottom: 1rem;
}

.description-content ul,
.usage-content ul {
  margin: 1rem 0;
  padding-left: 1.5rem;
}

.description-content li,
.usage-content li {
  margin: 0.5rem 0;
}

.features-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.features-list li {
  padding: 0.75rem 0;
  color: var(--text-secondary);
  position: relative;
  padding-left: 2rem;
  border-bottom: 1px solid var(--bg-tertiary);
}

.features-list li::before {
  content: '✓';
  color: var(--success-color);
  position: absolute;
  left: 0;
  font-weight: bold;
  font-size: 1.2rem;
}

.examples-grid,
.alternatives-grid {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.example-card,
.alternative-card {
  background: var(--bg-primary);
  padding: 2rem;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
}

.example-card h4,
.alternative-card h4 {
  color: var(--primary-color);
  margin-bottom: 1rem;
}

.example-card p,
.alternative-card p {
  color: var(--text-secondary);
  margin-bottom: 1rem;
}

.example-card pre {
  background: var(--bg-tertiary);
  padding: 1rem;
  border-radius: var(--radius-md);
  overflow-x: auto;
  font-size: 0.9rem;
}

.comparison-points h5 {
  color: var(--text-primary);
  margin: 1rem 0 0.5rem 0;
  font-size: 1rem;
}

.comparison-points ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.comparison-points li {
  padding: 0.25rem 0;
  color: var(--text-secondary);
  position: relative;
  padding-left: 1.5rem;
  font-size: 0.9rem;
}

.comparison-points li::before {
  content: '•';
  color: var(--primary-color);
  position: absolute;
  left: 0;
}

/* Боковая панель */
.resource-sidebar {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.sidebar-section {
  background: var(--bg-primary);
  padding: 2rem;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
}

.sidebar-section h3 {
  color: var(--primary-color);
  margin-bottom: 1rem;
  font-size: 1.125rem;
}

.links-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.resource-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
  text-decoration: none;
  color: var(--text-primary);
  transition: all 0.2s ease;
}

.resource-link:hover {
  background: var(--bg-tertiary);
  color: var(--primary-color);
}

.link-icon {
  font-size: 1rem;
}

.link-text {
  flex: 1;
}

.link-external {
  opacity: 0.6;
}

.tech-details {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.tech-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--bg-tertiary);
}

.tech-item:last-child {
  border-bottom: none;
}

.tech-label {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.tech-value {
  color: var(--text-primary);
  font-weight: 500;
  font-size: 0.9rem;
}

.related-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.related-link {
  color: var(--primary-color);
  text-decoration: none;
  padding: 0.5rem 0;
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s ease;
}

.related-link:hover {
  border-bottom-color: var(--primary-color);
}

.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  background: var(--primary-color);
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: var(--radius-sm);
  font-size: 0.8rem;
}

/* Навигация */
.navigation-section {
  background: var(--bg-secondary);
  padding: 2rem 0;
}

.resource-navigation {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 2rem;
  align-items: center;
}

.nav-link {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  padding: 1rem;
  border-radius: var(--radius-md);
  background: var(--bg-primary);
  transition: all 0.2s ease;
  color: var(--text-primary);
}

.nav-link:hover {
  background: var(--bg-tertiary);
  color: var(--primary-color);
}

.nav-prev {
  text-align: left;
}

.nav-next {
  text-align: right;
}

.nav-back {
  text-align: center;
  background: var(--primary-color);
  color: white;
}

.nav-back:hover {
  background: var(--secondary-color);
}

.nav-direction {
  font-size: 0.875rem;
  opacity: 0.8;
  margin-bottom: 0.25rem;
}

.nav-title {
  font-weight: 600;
}

/* Страница не найдена */
.not-found {
  padding: 4rem 0;
  text-align: center;
}

.not-found-content h1 {
  color: var(--primary-color);
  margin-bottom: 1rem;
}

.not-found-content p {
  color: var(--text-secondary);
  margin-bottom: 2rem;
}

/* Адаптивность */
@media (max-width: 768px) {
  .resource-header {
    flex-direction: column;
    text-align: center;
  }

  .resource-title {
    font-size: 2rem;
  }

  .resource-layout {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .resource-navigation {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .nav-prev,
  .nav-next,
  .nav-back {
    text-align: center;
  }

  .tech-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }
}
</style>
