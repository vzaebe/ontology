<template>
  <div class="faq-page">
    <!-- Hero секция -->
    <section class="hero-section">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">Часто задаваемые вопросы</h1>
          <p class="hero-subtitle">
            Ответы на основные вопросы об онтологиях, их применении и внедрении
          </p>
        </div>
      </div>
    </section>

    <!-- FAQ разделы -->
    <section class="section">
      <div class="container">
        <!-- Быстрая навигация -->
        <div class="quick-nav">
          <h3>Быстрая навигация</h3>
          <div class="nav-links">
            <a href="#basics" class="nav-link">Основы</a>
            <a href="#business" class="nav-link">Бизнес</a>
            <a href="#technical" class="nav-link">Техническое</a>
            <a href="#implementation" class="nav-link">Внедрение</a>
          </div>
        </div>

        <!-- Основы онтологий -->
        <div class="faq-section" id="basics">
          <h2>Основы онтологий</h2>
          <div class="faq-items">
            <div class="faq-item" v-for="(item, index) in basicsQuestions" :key="index">
              <button 
                class="faq-question" 
                @click="toggleFAQ('basics', index)"
                :class="{ active: openItems.basics[index] }"
              >
                <span>{{ item.question }}</span>
                <svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="6,9 12,15 18,9"></polyline>
                </svg>
              </button>
              <div class="faq-answer" v-show="openItems.basics[index]">
                <div v-html="item.answer"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Бизнес вопросы -->
        <div class="faq-section" id="business">
          <h2>Бизнес применение</h2>
          <div class="faq-items">
            <div class="faq-item" v-for="(item, index) in businessQuestions" :key="index">
              <button 
                class="faq-question" 
                @click="toggleFAQ('business', index)"
                :class="{ active: openItems.business[index] }"
              >
                <span>{{ item.question }}</span>
                <svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="6,9 12,15 18,9"></polyline>
                </svg>
              </button>
              <div class="faq-answer" v-show="openItems.business[index]">
                <div v-html="item.answer"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Технические вопросы -->
        <div class="faq-section" id="technical">
          <h2>Техническая реализация</h2>
          <div class="faq-items">
            <div class="faq-item" v-for="(item, index) in technicalQuestions" :key="index">
              <button 
                class="faq-question" 
                @click="toggleFAQ('technical', index)"
                :class="{ active: openItems.technical[index] }"
              >
                <span>{{ item.question }}</span>
                <svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="6,9 12,15 18,9"></polyline>
                </svg>
              </button>
              <div class="faq-answer" v-show="openItems.technical[index]">
                <div v-html="item.answer"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Внедрение -->
        <div class="faq-section" id="implementation">
          <h2>Внедрение и ROI</h2>
          <div class="faq-items">
            <div class="faq-item" v-for="(item, index) in implementationQuestions" :key="index">
              <button 
                class="faq-question" 
                @click="toggleFAQ('implementation', index)"
                :class="{ active: openItems.implementation[index] }"
              >
                <span>{{ item.question }}</span>
                <svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="6,9 12,15 18,9"></polyline>
                </svg>
              </button>
              <div class="faq-answer" v-show="openItems.implementation[index]">
                <div v-html="item.answer"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Глоссарий -->
    <section class="section bg-secondary">
      <div class="container">
        <div class="section-header">
          <h2>Глоссарий терминов</h2>
          <p class="section-subtitle">
            Краткие определения ключевых понятий
          </p>
        </div>
        
        <div class="glossary-grid">
          <div class="glossary-term" v-for="term in glossaryTerms" :key="term.term">
            <h4>{{ term.term }}</h4>
            <p>{{ term.definition }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section cta-section">
      <div class="container">
        <div class="cta-content">
          <h2>Не нашли ответ на свой вопрос?</h2>
          <p>
            Свяжитесь с нами для получения персональной консультации
          </p>
          <div class="cta-actions">
            <router-link to="/contact" class="btn btn-primary">
              Задать вопрос
            </router-link>
            <router-link to="/ontologies" class="btn btn-secondary">
              Узнать больше об онтологиях
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'

export default {
  name: 'FAQPage',
  setup() {
    const openItems = reactive({
      basics: {},
      business: {},
      technical: {},
      implementation: {}
    })

    const toggleFAQ = (section, index) => {
      openItems[section][index] = !openItems[section][index]
    }

    const basicsQuestions = [
      {
        question: "Что такое онтология и чем она отличается от обычной базы данных?",
        answer: `
          <p>Онтология — это формальное представление знаний о предметной области, которое включает:</p>
          <ul>
            <li><strong>Концепты (классы)</strong> — основные понятия</li>
            <li><strong>Отношения</strong> — связи между понятиями</li>
            <li><strong>Ограничения и правила</strong> — логические аксиомы</li>
          </ul>
          <p>В отличие от базы данных, онтология фокусируется на <em>семантике</em> — смысле данных, а не только на их структуре. Она позволяет машинам "понимать" данные и делать логические выводы.</p>
        `
      },
      {
        question: "В чем отличие от ER-модели или UML?",
        answer: `
          <p>Ключевые отличия:</p>
          <ul>
            <li><strong>Семантическая богатость:</strong> Онтологии используют формальную логику (OWL), что позволяет описывать сложные ограничения и правила</li>
            <li><strong>Автоматические выводы:</strong> Reasoner'ы могут выводить новые знания из существующих данных</li>
            <li><strong>Открытость:</strong> Стандарты W3C обеспечивают интероперабельность</li>
            <li><strong>Расширяемость:</strong> Возможность объединения и расширения онтологий</li>
          </ul>
          <p>ER-модели и UML отлично подходят для проектирования баз данных, но онтологии решают задачи интеграции знаний и семантического поиска.</p>
        `
      },
      {
        question: "Какие стандарты используются для создания онтологий?",
        answer: `
          <p>Основные стандарты W3C:</p>
          <ul>
            <li><strong>RDF (Resource Description Framework)</strong> — базовая модель данных</li>
            <li><strong>RDFS (RDF Schema)</strong> — базовая система типов</li>
            <li><strong>OWL (Web Ontology Language)</strong> — язык для создания онтологий</li>
            <li><strong>SPARQL</strong> — язык запросов для RDF</li>
            <li><strong>SHACL</strong> — язык ограничений для валидации</li>
            <li><strong>JSON-LD</strong> — представление связанных данных в JSON</li>
          </ul>
          <p>Эти стандарты обеспечивают совместимость между различными системами и инструментами.</p>
        `
      },
      {
        question: "Что такое граф знаний и как он связан с онтологиями?",
        answer: `
          <p>Граф знаний — это база данных, организованная в виде графа, где:</p>
          <ul>
            <li><strong>Узлы</strong> представляют сущности (люди, компании, продукты)</li>
            <li><strong>Рёбра</strong> представляют отношения между сущностями</li>
          </ul>
          <p>Онтология определяет <em>схему</em> графа знаний — какие типы узлов и рёбер могут существовать, какие правила и ограничения действуют.</p>
          <p><strong>Пример:</strong> Google Knowledge Graph использует онтологии schema.org для структурирования информации о фильмах, людях, местах и т.д.</p>
        `
      }
    ]

    const businessQuestions = [
      {
        question: "Какой ROI можно ожидать от внедрения онтологий?",
        answer: `
          <p>ROI зависит от сферы применения, но типичные показатели:</p>
          <ul>
            <li><strong>300-500% ROI</strong> в течение 2-3 лет</li>
            <li><strong>50-80% сокращение</strong> времени на интеграции</li>
            <li><strong>30-60% повышение</strong> качества данных</li>
            <li><strong>40-70% ускорение</strong> поиска информации</li>
          </ul>
          <p>Основные источники экономии:</p>
          <ul>
            <li>Снижение затрат на интеграцию систем</li>
            <li>Ускорение разработки новых продуктов</li>
            <li>Повышение эффективности аналитики</li>
            <li>Автоматизация рутинных процессов</li>
          </ul>
        `
      },
      {
        question: "Для каких задач не подходят онтологии?",
        answer: `
          <p>Онтологии не являются серебряной пулей. Они не подходят для:</p>
          <ul>
            <li><strong>Простых CRUD приложений</strong> — избыточная сложность</li>
            <li><strong>High-frequency trading</strong> — требования к латентности</li>
            <li><strong>Простой отчётности</strong> — достаточно SQL</li>
            <li><strong>Статических данных</strong> — нет необходимости в семантике</li>
          </ul>
          <p>Онтологии эффективны для сложных доменов с большим количеством связей и необходимостью интеграции разнородных источников.</p>
        `
      },
      {
        question: "Сколько времени занимает разработка онтологии?",
        answer: `
          <p>Сроки зависят от сложности домена:</p>
          <ul>
            <li><strong>Простая онтология:</strong> 2-4 недели</li>
            <li><strong>Средняя сложность:</strong> 2-6 месяцев</li>
            <li><strong>Комплексная отраслевая:</strong> 6-18 месяцев</li>
          </ul>
          <p>Этапы разработки:</p>
          <ol>
            <li>Анализ домена и требований (20-30%)</li>
            <li>Создание базовой структуры (30-40%)</li>
            <li>Детализация и валидация (20-30%)</li>
            <li>Тестирование и документирование (10-20%)</li>
          </ol>
          <p>Итеративный подход позволяет получить первые результаты уже через несколько недель.</p>
        `
      },
      {
        question: "Какие компетенции нужны команде для работы с онтологиями?",
        answer: `
          <p>Состав команды для проекта:</p>
          <ul>
            <li><strong>Онтолог/Аналитик знаний</strong> — моделирование предметной области</li>
            <li><strong>Эксперт домена</strong> — знание бизнес-процессов</li>
            <li><strong>Семантический разработчик</strong> — техническая реализация</li>
            <li><strong>Архитектор данных</strong> — интеграция с существующими системами</li>
          </ul>
          <p>Ключевые навыки:</p>
          <ul>
            <li>Понимание логики и моделирования</li>
            <li>Знание стандартов W3C (RDF, OWL, SPARQL)</li>
            <li>Опыт работы с инструментами (Protégé, GraphDB)</li>
            <li>Навыки интеграции данных</li>
          </ul>
        `
      }
    ]

    const technicalQuestions = [
      {
        question: "Какие инструменты нужны для работы с онтологиями?",
        answer: `
          <p>Основные категории инструментов:</p>
          <h4>Редакторы онтологий:</h4>
          <ul>
            <li><strong>Protégé</strong> — популярный open source редактор</li>
            <li><strong>TopBraid Composer</strong> — коммерческая среда разработки</li>
            <li><strong>WebVOWL</strong> — веб-визуализация онтологий</li>
          </ul>
          <h4>Триплсторы (хранилища):</h4>
          <ul>
            <li><strong>GraphDB</strong> — производительный RDF триплстор</li>
            <li><strong>Apache Jena Fuseki</strong> — open source SPARQL сервер</li>
            <li><strong>Virtuoso</strong> — универсальный сервер данных</li>
          </ul>
          <h4>Библиотеки разработки:</h4>
          <ul>
            <li><strong>RDFLib (Python)</strong> — работа с RDF</li>
            <li><strong>Apache Jena (Java)</strong> — фреймворк для Semantic Web</li>
            <li><strong>OWL API (Java)</strong> — работа с OWL онтологиями</li>
          </ul>
        `
      },
      {
        question: "Как обеспечить производительность при работе с большими графами?",
        answer: `
          <p>Стратегии оптимизации производительности:</p>
          <h4>Архитектурные решения:</h4>
          <ul>
            <li><strong>Партиционирование</strong> — разделение графа по доменам</li>
            <li><strong>Федеративные запросы</strong> — распределённые SPARQL запросы</li>
            <li><strong>Кэширование</strong> — популярных запросов и результатов</li>
          </ul>
          <h4>Оптимизация запросов:</h4>
          <ul>
            <li>Использование индексов по предикатам</li>
            <li>LIMIT и OFFSET для пагинации</li>
            <li>Избегание сложных OPTIONAL и UNION</li>
          </ul>
          <h4>Выбор правильного триплстора:</h4>
          <ul>
            <li><strong>GraphDB</strong> — для сложной аналитики</li>
            <li><strong>Blazegraph</strong> — для больших объёмов</li>
            <li><strong>Neo4j</strong> — гибридное решение</li>
          </ul>
        `
      },
      {
        question: "Как интегрировать онтологии с существующими системами?",
        answer: `
          <p>Подходы к интеграции:</p>
          <h4>1. ETL подход:</h4>
          <ul>
            <li>Извлечение данных из источников</li>
            <li>Трансформация в RDF по онтологии</li>
            <li>Загрузка в граф знаний</li>
          </ul>
          <h4>2. Виртуализация данных:</h4>
          <ul>
            <li>R2RML маппинги для реляционных БД</li>
            <li>SPARQL-to-SQL трансляция</li>
            <li>Federated SPARQL запросы</li>
          </ul>
          <h4>3. API-first подход:</h4>
          <ul>
            <li>GraphQL API поверх SPARQL</li>
            <li>REST API с JSON-LD</li>
            <li>Потоковая обработка событий</li>
          </ul>
          <p><strong>Рекомендация:</strong> Начинайте с виртуализации для быстрого старта, переходите к ETL для production нагрузок.</p>
        `
      },
      {
        question: "Как обеспечить качество и согласованность онтологии?",
        answer: `
          <p>Методы контроля качества:</p>
          <h4>Автоматическая валидация:</h4>
          <ul>
            <li><strong>OWL reasoner</strong> — проверка логической согласованности</li>
            <li><strong>SHACL валидация</strong> — проверка структурных ограничений</li>
            <li><strong>Unit тесты</strong> — проверка конкретных сценариев</li>
          </ul>
          <h4>Процессы разработки:</h4>
          <ul>
            <li>Версионирование онтологий (Git + семантические версии)</li>
            <li>Code review изменений экспертами</li>
            <li>Регрессионное тестирование</li>
          </ul>
          <h4>Документирование:</h4>
          <ul>
            <li>Автогенерация документации из аннотаций</li>
            <li>Примеры использования для каждого класса</li>
            <li>Changelog изменений</li>
          </ul>
        `
      }
    ]

    const implementationQuestions = [
      {
        question: "С чего начать внедрение онтологий в компании?",
        answer: `
          <p>Пошаговый план внедрения:</p>
          <h4>Этап 1: Пилотный проект (2-8 недель)</h4>
          <ul>
            <li>Выберите небольшую, хорошо определённую область</li>
            <li>Создайте минимальную онтологию (10-20 классов)</li>
            <li>Продемонстрируйте ценность стейкхолдерам</li>
          </ul>
          <h4>Этап 2: Расширение (2-6 месяцев)</h4>
          <ul>
            <li>Интеграция с 2-3 источниками данных</li>
            <li>Создание поискового интерфейса</li>
            <li>Обучение команды</li>
          </ul>
          <h4>Этап 3: Масштабирование (6-18 месяцев)</h4>
          <ul>
            <li>Корпоративная онтология</li>
            <li>Центр компетенций</li>
            <li>Интеграция во все ключевые процессы</li>
          </ul>
        `
      },
      {
        question: "Какие риски существуют при внедрении онтологий?",
        answer: `
          <p>Основные риски и способы их минимизации:</p>
          <h4>Технические риски:</h4>
          <ul>
            <li><strong>Производительность:</strong> Тестирование на реальных объёмах данных</li>
            <li><strong>Сложность:</strong> Итеративный подход, начинайте с простого</li>
            <li><strong>Интеграция:</strong> Proof of concept для ключевых интеграций</li>
          </ul>
          <h4>Организационные риски:</h4>
          <ul>
            <li><strong>Сопротивление изменениям:</strong> Обучение и демонстрация выгод</li>
            <li><strong>Недостаток экспертизы:</strong> Привлечение консультантов</li>
            <li><strong>Завышенные ожидания:</strong> Чёткая постановка целей</li>
          </ul>
          <h4>Бизнес риски:</h4>
          <ul>
            <li><strong>Превышение бюджета:</strong> Поэтапная реализация</li>
            <li><strong>Длительная окупаемость:</strong> Фокус на quick wins</li>
          </ul>
        `
      },
      {
        question: "Как измерить успех проекта по онтологиям?",
        answer: `
          <p>KPI для оценки эффективности:</p>
          <h4>Технические метрики:</h4>
          <ul>
            <li><strong>Время интеграции</strong> — сравнение с традиционными подходами</li>
            <li><strong>Качество данных</strong> — % ошибок, дублирования</li>
            <li><strong>Скорость поиска</strong> — время отклика запросов</li>
            <li><strong>Покрытие домена</strong> — % данных, покрытых онтологией</li>
          </ul>
          <h4>Бизнес метрики:</h4>
          <ul>
            <li><strong>ROI</strong> — экономический эффект от внедрения</li>
            <li><strong>Time-to-market</strong> — скорость запуска новых продуктов</li>
            <li><strong>Удовлетворённость пользователей</strong> — NPS, время решения задач</li>
            <li><strong>Переиспользование</strong> — количество проектов, использующих онтологию</li>
          </ul>
          <h4>Организационные метрики:</h4>
          <ul>
            <li><strong>Adoption rate</strong> — % команд, использующих онтологии</li>
            <li><strong>Knowledge sharing</strong> — частота обращений к базе знаний</li>
          </ul>
        `
      },
      {
        question: "Какой бюджет закладывать на проект по онтологиям?",
        answer: `
          <p>Оценка бюджета по этапам:</p>
          <h4>Пилотный проект:</h4>
          <ul>
            <li><strong>Консалтинг:</strong> $20,000 - $50,000</li>
            <li><strong>Разработка:</strong> $30,000 - $80,000</li>
            <li><strong>Инструменты:</strong> $5,000 - $15,000</li>
            <li><strong>Итого:</strong> $55,000 - $145,000</li>
          </ul>
          <h4>Корпоративное внедрение:</h4>
          <ul>
            <li><strong>Команда (1 год):</strong> $300,000 - $800,000</li>
            <li><strong>Инфраструктура:</strong> $50,000 - $200,000</li>
            <li><strong>Лицензии:</strong> $20,000 - $100,000</li>
            <li><strong>Интеграция:</strong> $100,000 - $500,000</li>
          </ul>
          <p><strong>Факторы влияния на стоимость:</strong></p>
          <ul>
            <li>Сложность предметной области</li>
            <li>Количество источников данных</li>
            <li>Требования к производительности</li>
            <li>Наличие внутренней экспертизы</li>
          </ul>
        `
      }
    ]

    const glossaryTerms = [
      {
        term: "OWL",
        definition: "Web Ontology Language — стандарт W3C для создания формальных онтологий с поддержкой логических выводов"
      },
      {
        term: "RDF",
        definition: "Resource Description Framework — базовая модель данных семантического веба в виде троек субъект-предикат-объект"
      },
      {
        term: "SPARQL",
        definition: "Язык запросов для RDF данных, аналог SQL для реляционных баз данных"
      },
      {
        term: "Триплстор",
        definition: "Специализированная база данных для хранения и обработки RDF троек"
      },
      {
        term: "Reasoner",
        definition: "Программа для автоматического вывода новых знаний из онтологии на основе логических правил"
      },
      {
        term: "SHACL",
        definition: "Shapes Constraint Language — язык для описания и валидации структуры RDF графов"
      },
      {
        term: "URI",
        definition: "Uniform Resource Identifier — уникальный идентификатор ресурсов в семантическом вебе"
      },
      {
        term: "JSON-LD",
        definition: "JSON for Linking Data — формат представления связанных данных в JSON с семантической разметкой"
      },
      {
        term: "Граф знаний",
        definition: "База данных в виде графа, где узлы представляют сущности, а рёбра — отношения между ними"
      },
      {
        term: "Онтограф",
        definition: "Визуальное представление онтологии в виде графа классов, свойств и их связей"
      },
      {
        term: "Аксиома",
        definition: "Логическое утверждение в онтологии, которое считается истинным и используется для выводов"
      },
      {
        term: "Семантическая интеграция",
        definition: "Процесс объединения данных из разных источников на основе их смыслового содержания"
      }
    ]

    return {
      openItems,
      toggleFAQ,
      basicsQuestions,
      businessQuestions,
      technicalQuestions,
      implementationQuestions,
      glossaryTerms
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

/* Быстрая навигация */
.quick-nav {
  background: var(--bg-primary);
  padding: 2rem;
  border-radius: var(--radius-lg);
  margin-bottom: 4rem;
  text-align: center;
}

.quick-nav h3 {
  color: var(--primary-color);
  margin-bottom: 1rem;
}

.nav-links {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.nav-link {
  background: var(--bg-tertiary);
  color: var(--text-primary);
  padding: 0.5rem 1rem;
  border-radius: var(--radius-sm);
  text-decoration: none;
  transition: all 0.2s ease;
}

.nav-link:hover {
  background: var(--primary-color);
  color: white;
}

/* FAQ секции */
.faq-section {
  margin-bottom: 4rem;
}

.faq-section h2 {
  color: var(--primary-color);
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
}

.faq-items {
  max-width: 800px;
  margin: 0 auto;
}

.faq-item {
  background: var(--bg-primary);
  border-radius: var(--radius-lg);
  margin-bottom: 1rem;
  box-shadow: var(--shadow-md);
  overflow: hidden;
}

.faq-question {
  width: 100%;
  background: none;
  border: none;
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  color: var(--text-primary);
  font-size: 1.125rem;
  font-weight: 600;
  text-align: left;
  transition: all 0.2s ease;
}

.faq-question:hover {
  background: var(--bg-secondary);
}

.faq-question.active {
  background: var(--bg-tertiary);
  color: var(--primary-color);
}

.faq-question.active .icon {
  transform: rotate(180deg);
}

.faq-question .icon {
  transition: transform 0.2s ease;
  color: var(--primary-color);
}

.faq-answer {
  padding: 0 1.5rem 1.5rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

.faq-answer h4 {
  color: var(--text-primary);
  margin: 1rem 0 0.5rem;
  font-size: 1.125rem;
}

.faq-answer ul, .faq-answer ol {
  margin: 1rem 0;
  padding-left: 1.5rem;
}

.faq-answer li {
  margin: 0.5rem 0;
}

.faq-answer strong {
  color: var(--text-primary);
}

.faq-answer em {
  color: var(--primary-color);
}

/* Глоссарий */
.glossary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.glossary-term {
  background: var(--bg-primary);
  padding: 1.5rem;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
}

.glossary-term h4 {
  color: var(--primary-color);
  margin-bottom: 0.75rem;
  font-size: 1.125rem;
}

.glossary-term p {
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
  
  .nav-links {
    flex-direction: column;
    align-items: center;
  }
  
  .faq-question {
    padding: 1rem;
    font-size: 1rem;
  }
  
  .faq-answer {
    padding: 0 1rem 1rem;
  }
  
  .glossary-grid {
    grid-template-columns: 1fr;
  }
  
  .cta-actions {
    flex-direction: column;
    align-items: center;
  }
}
</style>
