<template>
  <div class="home-page">
    <CurveDivider />
    <!-- Hero: командная витрина -->
    <section class="hero-section">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">Единая онтология и граф знаний для вашей предметной области</h1>
          <p class="hero-subtitle">
            Связываем данные из ИТ-систем и документов в единый граф. Быстрый поиск, трассируемость, интеграции без разночтений терминов.
          </p>
          <div class="hero-actions">
            <a href="#demo" class="btn btn-primary">
              Демо-кейс
            </a>
            <a href="#contact" class="btn btn-secondary">
              Связаться
            </a>
          </div>
        </div>

        <!-- KPI -->
        <div class="kpis">
          <div class="kpi"><div class="num">5</div><div class="label">экспертов</div></div>
          <div class="kpi"><div class="num">2+</div><div class="label">публикаций</div></div>
          <div class="kpi"><div class="num">10+</div><div class="label">навыков</div></div>
        </div>
      </div>
    </section>

    <!-- Единая онтология предметной области -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <h2 id="unified-ontology">Единая онтология предметной области</h2>
          <p class="section-subtitle">
            Формальная модель для согласования терминов и связей в вашей предметной области
          </p>
        </div>

        <div class="ontology-basics">
          <div class="basic-item">
            <div class="basic-icon">🏗️</div>
            <h3>Сущности</h3>
            <p>Описываем ключевые объекты предметной области (оборудование, процессы, документы).</p>
          </div>

          <div class="basic-item">
            <div class="basic-icon">🔗</div>
            <h3>Свойства</h3>
            <p>Фиксируем атрибуты и ограничения, исключаем двусмысленности.</p>
          </div>

          <div class="basic-item">
            <div class="basic-icon">📊</div>
            <h3>Связи</h3>
            <p>Строим семантические связи между сущностями → граф знаний.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Выгоды для бизнеса -->
    <section class="section bg-secondary">
      <div class="container">
        <h2 id="business-benefits">Выгоды для бизнеса</h2>

        <div class="benefits-grid">
          <div class="benefit-card">
            <div class="benefit-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14,2 14,8 20,8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10,9 9,9 8,9"/>
              </svg>
            </div>
            <h3>Единый словарь терминов</h3>
            <p>Меньше конфликтов между командами</p>
          </div>

          <div class="benefit-card">
            <div class="benefit-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
              </svg>
            </div>
            <h3>Быстрые интеграции</h3>
            <p>Сокращение трудозатрат на стыковку систем</p>
          </div>

          <div class="benefit-card">
            <div class="benefit-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
            </div>
            <h3>Поиск по смыслу</h3>
            <p>Ответы через связи в графе, не только ключевые слова</p>
          </div>

          <div class="benefit-card">
            <div class="benefit-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
              </svg>
            </div>
            <h3>Трассируемость</h3>
            <p>Полная цепочка «требование → проект → объект → документ»</p>
          </div>

          <div class="benefit-card">
            <div class="benefit-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
            </div>
            <h3>Снижение дубликатов</h3>
            <p>Единые справочники вместо копий данных</p>
          </div>

          <div class="benefit-card">
            <div class="benefit-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M6 3v12"/>
                <circle cx="18" cy="6" r="3"/>
                <circle cx="6" cy="15" r="3"/>
                <path d="m18 9-5 5-3-3"/>
              </svg>
            </div>
            <h3>Прозрачные API</h3>
            <p>Переиспользование данных без «ручного клея»</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Как это работает -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <h2 id="how-it-works">Как это работает</h2>
          <p class="section-subtitle">
            Пошаговый процесс создания единой онтологии и графа знаний
          </p>
        </div>

        <!-- Прогресс-индикатор -->
        <div class="progress-container">
          <div class="progress-line">
            <div class="progress-fill"></div>
          </div>
        </div>

        <div class="pipeline-steps">
          <div class="pipeline-step" data-step="1">
            <div class="step-indicator">
              <div class="step-number">1</div>
              <div class="step-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2H5a2 2 0 0 0-2-2z"/>
                  <polyline points="3,7 12,13 21,7"/>
                </svg>
              </div>
            </div>
            <div class="step-content">
              <h3>Инвентаризация источников</h3>
              <p>Каталоги, БД, документы</p>
            </div>
          </div>

          <div class="pipeline-step" data-step="2">
            <div class="step-indicator">
              <div class="step-number">2</div>
              <div class="step-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/>
                </svg>
              </div>
            </div>
            <div class="step-content">
              <h3>Модель онтологии</h3>
              <p>Согласование терминов с экспертами</p>
            </div>
          </div>

          <div class="pipeline-step" data-step="3">
            <div class="step-indicator">
              <div class="step-number">3</div>
              <div class="step-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="16 18 22 12 16 6"/>
                  <polyline points="8 6 2 12 8 18"/>
                </svg>
              </div>
            </div>
            <div class="step-content">
              <h3>Парсинг/ETL → RDF</h3>
              <p>Извлечение фактов в граф</p>
            </div>
          </div>

          <div class="pipeline-step" data-step="4">
            <div class="step-indicator">
              <div class="step-number">4</div>
              <div class="step-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <ellipse cx="12" cy="5" rx="9" ry="3"/>
                  <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
                  <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/>
                </svg>
              </div>
            </div>
            <div class="step-content">
              <h3>Загрузка в графовую БД</h3>
              <p>GraphDB/Neo4j хранилище</p>
            </div>
          </div>

          <div class="pipeline-step" data-step="5">
            <div class="step-indicator">
              <div class="step-number">5</div>
              <div class="step-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14,2 14,8 20,8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                </svg>
              </div>
            </div>
            <div class="step-content">
              <h3>Запросы и витрины</h3>
              <p>SPARQL/API, граф-визуализация</p>
            </div>
          </div>

          <div class="pipeline-step" data-step="6">
            <div class="step-indicator">
              <div class="step-number">6</div>
              <div class="step-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.3"/>
                </svg>
              </div>
            </div>
            <div class="step-content">
              <h3>Поддержка и эволюция</h3>
              <p>Версии онтологии, SHACL контроль</p>
            </div>
          </div>
        </div>
      </div>
    </section>



    <!-- Демонстрационный кейс -->
    <section id="demo" class="section bg-secondary">
      <div class="container">
        <div class="section-header">
          <h2>Интерактивное демо</h2>
          <p class="section-subtitle">
            Попробуйте создать и отредактировать онтологию прямо в браузере
          </p>
        </div>
        
        <!-- Interactive Demo Component -->
        <OntologyDemoCompact />
        
        <div class="case-disclaimer">
          <p><strong>Дисклеймер:</strong> Данный пример создан в демонстрационных целях 
          и не содержит конфиденциальной информации реальных объектов.</p>
        </div>
        
        <div class="section-cta">
          <router-link to="/projects" class="btn btn-primary">
            Посмотреть все кейсы
          </router-link>
        </div>
      </div>
    </section>

    <!-- Полезное -->
    <section id="useful" class="section">
      <div class="container">
        <div class="section-header">
          <h2>Полезное</h2>
          <p class="section-subtitle">
            Подборка ПО, статей и рекомендаций по онтологиям и графам знаний
          </p>
        </div>

        <!-- Переключатели групп -->
        <div class="useful-tabs">
          <button 
            class="useful-tab-btn" 
            :class="{ active: activeUsefulTab === 'software' }"
            @click="activeUsefulTab = 'software'"
          >
            ПО и инструменты
          </button>
          <button 
            class="useful-tab-btn" 
            :class="{ active: activeUsefulTab === 'articles' }"
            @click="activeUsefulTab = 'articles'"
          >
            Статьи и материалы
          </button>
          <button 
            class="useful-tab-btn" 
            :class="{ active: activeUsefulTab === 'guides' }"
            @click="activeUsefulTab = 'guides'"
          >
            Рекомендации
          </button>
        </div>

        <!-- Контент групп -->
        <div class="useful-content">
          <!-- ПО и инструменты -->
          <div v-show="activeUsefulTab === 'software'" class="useful-grid">
            <div class="useful-item">
              <div class="useful-icon">🔧️</div>
              <h3>Protégé</h3>
              <p>Редактор онтологий (OWL/SHACL).</p>
              <button class="useful-btn">Перейти</button>
            </div>

            <div class="useful-item">
              <div class="useful-icon">🗃️</div>
              <h3>GraphDB CE</h3>
              <p>Графовая БД для RDF/SPARQL (CE).</p>
              <button class="useful-btn">Перейти</button>
            </div>

            <div class="useful-item">
              <div class="useful-icon">🔗</div>
              <h3>Neo4j</h3>
              <p>Хранилище графов, быстрые связи.</p>
              <button class="useful-btn">Перейти</button>
            </div>

            <div class="useful-item">
              <div class="useful-icon">🐍</div>
              <h3>RDFLib</h3>
              <p>Python-библиотека для RDF/парсинга.</p>
              <button class="useful-btn">Перейти</button>
            </div>

            <div class="useful-item">
              <div class="useful-icon">⚡</div>
              <h3>FastAPI</h3>
              <p>Быстрые API к графу знаний.</p>
              <button class="useful-btn">Перейти</button>
            </div>

            <div class="useful-item">
              <div class="useful-icon">🔄</div>
              <h3>Airflow</h3>
              <p>Оркестрация ETL и проверок качества.</p>
              <button class="useful-btn">Перейти</button>
            </div>
          </div>


          <!-- Статьи и материалы -->
          <div v-show="activeUsefulTab === 'articles'" class="useful-grid">
            <div class="useful-item">
              <div class="useful-icon">📖</div>
              <h3>RDF: краткое введение</h3>
              <p>Основы модели графа знаний.</p>
              <button class="useful-btn">PDF</button>
            </div>

            <div class="useful-item">
              <div class="useful-icon">🦉</div>
              <h3>OWL в онтологиях</h3>
              <p>Типы, классы, свойства, аксиомы.</p>
              <button class="useful-btn">PDF</button>
            </div>

            <div class="useful-item">
              <div class="useful-icon">✅</div>
              <h3>SHACL на практике</h3>
              <p>Правила валидации графа.</p>
              <button class="useful-btn">PDF</button>
            </div>

            <div class="useful-item">
              <div class="useful-icon">🔍</div>
              <h3>SPARQL для инженеров</h3>
              <p>Запросы и витрины данных.</p>
              <button class="useful-btn">PDF</button>
            </div>
          </div>

          <!-- Рекомендации и гайдлайны -->
          <div v-show="activeUsefulTab === 'guides'" class="useful-grid">
            <div class="useful-item">
              <div class="useful-icon">📝</div>
              <h3>Как описывать сущности</h3>
              <p>Шаблон карточки сущности и атрибутов.</p>
              <button class="useful-btn">Перейти</button>
            </div>

            <div class="useful-item">
              <div class="useful-icon">🏷️</div>
              <h3>Именование классов/свойств</h3>
              <p>Конвенции, коллизии, префиксы.</p>
              <button class="useful-btn">Перейти</button>
            </div>

            <div class="useful-item">
              <div class="useful-icon">🔍</div>
              <h3>Чек-лист качества графа</h3>
              <p>Дубликаты, несогласованность, пустые узлы.</p>
              <button class="useful-btn">Перейти</button>
            </div>

            <div class="useful-item">
              <div class="useful-icon">🔄</div>
              <h3>Версионирование онтологии</h3>
              <p>Семантические релизы и миграции.</p>
              <button class="useful-btn">Перейти</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Публикации -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <h2>Научные публикации</h2>
          <p class="section-subtitle">Исследования и практический опыт применения онтологий</p>
        </div>

        <!-- Компактные фильтры -->
        <PublicationFilters
          v-model="publicationFilters"
          :publications="allPublications"
          :compact="true"
          @filter-change="handlePublicationFilterChange"
        />

        <!-- Статистика -->
        <PublicationStats
          :publications="filteredHomePublications"
          :compact="true"
          :show-chart="true"
          :show-top-venues="false"
          :show-trends="false"
          @year-click="handleStatsYearClick"
          @venue-click="handleStatsVenueClick"
        />
        
        <!-- Сетка публикаций -->
        <div class="publications-grid">
                      <PublicationCard
              v-for="publication in displayedHomePublications"
              :key="publication.id"
              :publication="publication"
              :compact="false"
              @tag-click="handlePublicationTagClick"
              @article-click="handleArticleClick"
            />
        </div>

        <!-- Кнопка "Показать ещё" -->
        <div class="publications-load-more" v-if="hasMoreHomePublications">
          <button 
            @click="loadMoreHomePublications" 
            class="btn btn-secondary"
            :disabled="loadingMorePublications"
          >
            {{ loadingMorePublications ? 'Загрузка...' : `Показать ещё (${remainingHomeCount})` }}
          </button>
        </div>
        
        <div class="section-cta">
          <router-link 
            :to="getPublicationsPageUrl()" 
            class="btn btn-primary"
          >
            Все публикации
          </router-link>
        </div>
      </div>
    </section>

    <!-- Команда, организации и партнеры -->
    <section class="section bg-secondary">
      <div class="container">
        <div class="section-header">
          <h2>Команда и организации</h2>
          <p class="section-subtitle">Эксперты проекта и участвующие организации</p>
        </div>

        <!-- Вкладки -->
        <div class="tabs-container">
          <div class="tabs-header">
            <button class="tab-btn active" data-tab="team">Команда</button>
            <button class="tab-btn" data-tab="organizations">Организации</button>
          </div>

          <!-- Команда -->
          <div class="tab-content active" data-tab="team">
            <div class="team-members">
              <div class="member-card" v-for="m in featuredMembers" :key="m.id">
                <div class="member-avatar">
                  <img :src="m.avatar || '/default-avatar.svg'" :alt="m.name" loading="lazy" />
                </div>
                <div class="member-info">
                  <h4>{{ m.name }}</h4>
                  <p class="member-role">{{ m.title }}</p>
                  <p class="member-description">{{ m.expertise || 'Эксперт в области семантических технологий' }}</p>
                  <div class="member-links">
                    <a v-if="m.github" :href="m.github" target="_blank" rel="noopener" class="member-link">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                    <a v-if="m.linkedin" :href="m.linkedin" target="_blank" rel="noopener" class="member-link">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Организации -->
          <div class="tab-content" data-tab="organizations">
            <div class="organizations-grid">
              <div class="organization-card">
                <div class="org-logo-container">
                  <div class="org-logo">МГУ</div>
                </div>
                <div class="org-info">
                  <h4>Московский государственный университет</h4>
                  <p class="org-role">Ведущий участник</p>
                  <p class="org-description">Научное руководство и экспертиза в области семантических технологий</p>
                </div>
              </div>

              <div class="organization-card">
                <div class="org-logo-container">
                  <div class="org-logo">ИТМО</div>
                </div>
                <div class="org-info">
                  <h4>Университет ИТМО</h4>
                  <p class="org-role">Партнер</p>
                  <p class="org-description">Разработка методов машинного обучения для графов знаний</p>
                </div>
              </div>

              <div class="organization-card">
                <div class="org-logo-container">
                  <div class="org-logo">СПбГУ</div>
                </div>
                <div class="org-info">
                  <h4>Санкт-Петербургский государственный университет</h4>
                  <p class="org-role">Партнер</p>
                  <p class="org-description">Исследования в области формальных методов и логики</p>
                </div>
              </div>

              <div class="organization-card">
                <div class="org-logo-container">
                  <div class="org-logo">Ontotext</div>
                </div>
                <div class="org-info">
                  <h4>Ontotext</h4>
                  <p class="org-role">Технологический партнер</p>
                  <p class="org-description">Поставщик GraphDB и консультации по семантическим решениям</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="section-cta">
          <router-link to="/team" class="btn btn-primary">
            Подробнее
          </router-link>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <h2>Частые вопросы</h2>
          <p class="section-subtitle">Ответы на основные вопросы об онтологиях и графах знаний</p>
        </div>

        <div class="faq-accordion">
          <div class="faq-item" v-for="(faq, index) in faqItems" :key="index">
            <button 
              class="faq-question" 
              :class="{ active: faq.isOpen }"
              @click="toggleFaq(index)"
              :aria-expanded="faq.isOpen"
            >
              <span>{{ faq.question }}</span>
              <svg class="faq-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <div class="faq-answer" :class="{ active: faq.isOpen }">
              <div class="faq-answer-content">
                <p>{{ faq.answer }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="section-cta">
          <router-link to="/faq" class="btn btn-primary">
            Все вопросы
          </router-link>
        </div>
      </div>
    </section>

    <!-- Готовы начать? -->
    <section id="contact" class="section cta-section">
      <div class="container">
        <div class="cta-content">
          <h2>Готовы начать?</h2>
          <p>
            Покажем демо, согласуем словарь терминов и первый кейс.
          </p>
          <div class="cta-actions">
            <a href="#contact-form" class="btn btn-primary">
              Связаться
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Форма контактов -->
    <section id="contact-form" class="section">
      <div class="container">
        <div class="section-header">
          <h2>Свяжитесь с нами</h2>
          <p class="section-subtitle">
            Расскажите о вашем проекте, и мы предложим оптимальное решение
          </p>
        </div>

        <div class="contact-form">
          <form class="form-grid">
            <div class="form-group">
              <label for="name">Имя *</label>
              <input type="text" id="name" name="name" required>
            </div>

            <div class="form-group">
              <label for="email">Email *</label>
              <input type="email" id="email" name="email" required>
            </div>

            <div class="form-group">
              <label for="company">Компания</label>
              <input type="text" id="company" name="company">
            </div>

            <div class="form-group">
              <label for="phone">Телефон</label>
              <input type="tel" id="phone" name="phone">
            </div>

            <div class="form-group form-group-full">
              <label for="message">Сообщение</label>
              <textarea id="message" name="message" rows="4" placeholder="Опишите ваш проект или задачу..."></textarea>
            </div>

            <div class="form-actions">
              <button type="submit" class="btn btn-primary">Отправить</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import CurveDivider from '../components/CurveDivider.vue'
import CitationBadge from '../components/CitationBadge.vue'
import PublicationCard from '../components/PublicationCard.vue'
import PublicationFilters from '../components/PublicationFilters.vue'
import PublicationStats from '../components/PublicationStats.vue'
import ContactsSection from '../components/ContactsSection.vue'
import OntologyDemoCompact from '../components/OntologyDemoCompact.vue'
import { publications as cmsPublications } from '../data/publications.js'
import { team as cmsTeam } from '../data/team.js'

export default {
  name: 'HomePage',
  components: { 
    CurveDivider, 
    CitationBadge, 
    PublicationCard, 
    PublicationFilters, 
    PublicationStats,
    ContactsSection,
    OntologyDemoCompact
  },
  setup() {
    const featuredMembers = cmsTeam.slice(0, 4)
    
    // Активная вкладка в разделе "Полезное"
    const activeUsefulTab = ref('software')
    
    // Контакты
    const selectedContactDirection = ref('')
    const selectedContactPerson = ref('')
    
    // Публикации (используем обновленные данные)
    const allPublications = ref(cmsPublications)
    
    // Фильтры для публикаций на главной
    const publicationFilters = ref({
      types: [],
      years: [],
      venue: '',
      tags: [],
      search: '',
      sort: 'year-desc'
    })
    
    const homeItemsPerPage = 6
    const homeCurrentPage = ref(1)
    const loadingMorePublications = ref(false)
    
    // Вычисляемые свойства для публикаций
    const filteredHomePublications = computed(() => {
      let result = [...allPublications.value]

      // Фильтр по типу
      if (publicationFilters.value.types.length) {
        result = result.filter(pub => publicationFilters.value.types.includes(pub.type))
      }

      // Фильтр по году
      if (publicationFilters.value.years.length) {
        result = result.filter(pub => publicationFilters.value.years.includes(pub.year))
      }

      // Фильтр по площадке
      if (publicationFilters.value.venue) {
        result = result.filter(pub => pub.venue === publicationFilters.value.venue)
      }

      // Фильтр по тегам
      if (publicationFilters.value.tags.length) {
        result = result.filter(pub => 
          pub.tags && publicationFilters.value.tags.some(tag => pub.tags.includes(tag))
        )
      }

      // Поиск по названию
      if (publicationFilters.value.search) {
        const searchLower = publicationFilters.value.search.toLowerCase()
        result = result.filter(pub => 
          pub.title.toLowerCase().includes(searchLower) ||
          pub.authors?.some(author => 
            typeof author === 'string' 
              ? author.toLowerCase().includes(searchLower)
              : author.name?.toLowerCase().includes(searchLower)
          )
        )
      }

      // Сортировка
      switch (publicationFilters.value.sort) {
        case 'year-desc':
          result.sort((a, b) => b.year - a.year)
          break
        case 'year-asc':
          result.sort((a, b) => a.year - b.year)
          break
        case 'venue':
          result.sort((a, b) => a.venue.localeCompare(b.venue))
          break
        case 'type':
          result.sort((a, b) => a.type.localeCompare(b.type))
          break
      }

      return result
    })
    
    const displayedHomePublications = computed(() => {
      const endIndex = homeCurrentPage.value * homeItemsPerPage
      return filteredHomePublications.value.slice(0, endIndex)
    })
    
    const hasMoreHomePublications = computed(() => {
      return displayedHomePublications.value.length < filteredHomePublications.value.length
    })
    
    const remainingHomeCount = computed(() => {
      return filteredHomePublications.value.length - displayedHomePublications.value.length
    })
    
    // Методы для публикаций
    const handlePublicationFilterChange = () => {
      homeCurrentPage.value = 1
    }
    
    const handleStatsYearClick = (year) => {
      if (!publicationFilters.value.years.includes(year)) {
        publicationFilters.value.years.push(year)
      }
    }
    
    const handleStatsVenueClick = (venue) => {
      publicationFilters.value.venue = venue
    }
    
    const handlePublicationTagClick = (tag) => {
      if (!publicationFilters.value.tags.includes(tag)) {
        publicationFilters.value.tags.push(tag)
      }
    }
    
    const loadMoreHomePublications = () => {
      loadingMorePublications.value = true
      setTimeout(() => {
        homeCurrentPage.value++
        loadingMorePublications.value = false
      }, 300)
    }
    
    const getPublicationsPageUrl = () => {
      const query = {}
      
      if (publicationFilters.value.types.length) {
        query.types = publicationFilters.value.types.join(',')
      }
      if (publicationFilters.value.years.length) {
        query.years = publicationFilters.value.years.join(',')
      }
      if (publicationFilters.value.venue) {
        query.venue = publicationFilters.value.venue
      }
      if (publicationFilters.value.tags.length) {
        query.tags = publicationFilters.value.tags.join(',')
      }
      if (publicationFilters.value.search) {
        query.search = publicationFilters.value.search
      }
      if (publicationFilters.value.sort !== 'year-desc') {
        query.sort = publicationFilters.value.sort
      }
      
      return { 
        path: '/publications', 
        query: Object.keys(query).length ? query : undefined
      }
    }

    const handleArticleClick = (publication) => {
      // Открываем статью в новом окне/вкладке
      if (publication.links?.pdf) {
        window.open(publication.links.pdf, '_blank')
      } else if (publication.links?.doi) {
        window.open(publication.links.doi, '_blank')
      } else if (publication.links?.url) {
        window.open(publication.links.url, '_blank')
      } else {
        // Открываем внутреннюю страницу статьи
        window.open(`/publications/${publication.slug}`, '_blank')
      }
    }

    // FAQ данные
    const faqItems = ref([
      {
        question: 'Что такое онтология и чем отличается от справочника?',
        answer: 'Онтология — формальная модель со связями между понятиями, которая описывает семантику предметной области. Справочник — просто список терминов без описания отношений между ними и их семантического значения.',
        isOpen: true // Первый вопрос открыт по умолчанию
      },
      {
        question: 'Чем граф знаний лучше «обычной БД» для интеграций?',
        answer: 'Граф знаний хранит связи между данными как основную структуру, позволяя находить непрямые отношения, делать выводы и обеспечивать семантическую интероперабельность между различными системами.',
        isOpen: false
      },
      {
        question: 'Какие источники данных поддерживаются?',
        answer: 'Мы поддерживаем широкий спектр источников: реляционные базы данных, документы (PDF, Word, Excel), API различных систем, XML/JSON файлы, веб-сайты и любые структурированные или полуструктурированные данные.',
        isOpen: false
      },
      {
        question: 'Как начинается пилот и сколько длится?',
        answer: 'Пилот начинается с анализа источников данных (1-2 недели), затем создание MVP с первыми связями (4-6 недель), и наконец построение полного графа знаний (2-3 месяца). Сроки зависят от сложности предметной области.',
        isOpen: false
      },
      {
        question: 'Как обеспечивается качество (валидация/версионирование)?',
        answer: 'Качество обеспечивается через SHACL для автоматической валидации данных, Git для версионирования онтологии, автоматические тесты на согласованность и peer review изменений экспертами предметной области.',
        isOpen: false
      }
    ])

    const toggleFaq = (index) => {
      faqItems.value[index].isOpen = !faqItems.value[index].isOpen
    }

    // Обработчики контактов
    const handlePersonContact = (data) => {
      selectedContactDirection.value = data.direction
      selectedContactPerson.value = data.person
    }

    const handleContactFormSubmit = (formData) => {
      console.log('Contact form submitted:', formData)
    }

    return { 
      featuredMembers,
      activeUsefulTab,
      selectedContactDirection,
      selectedContactPerson,
      allPublications,
      publicationFilters,
      filteredHomePublications,
      displayedHomePublications,
      hasMoreHomePublications,
      remainingHomeCount,
      loadingMorePublications,
      handlePublicationFilterChange,
      handleStatsYearClick,
      handleStatsVenueClick,
      handlePublicationTagClick,
      loadMoreHomePublications,
      getPublicationsPageUrl,
      handleArticleClick,
      faqItems,
      toggleFaq,
      handlePersonContact,
      handleContactFormSubmit
    }
  },
  mounted() {
    // Обработчик вкладок
    const tabBtns = document.querySelectorAll('.tab-btn')
    const tabContents = document.querySelectorAll('.tab-content')

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Убираем активный класс у всех кнопок
        tabBtns.forEach(b => b.classList.remove('active'))
        // Скрываем все контенты
        tabContents.forEach(c => c.classList.remove('active'))

        // Добавляем активный класс текущей кнопке
        btn.classList.add('active')

        // Показываем соответствующий контент
        const tabName = btn.getAttribute('data-tab')
        const activeContent = document.querySelector(`.tab-content[data-tab="${tabName}"]`)
        if (activeContent) {
          activeContent.classList.add('active')
        }
      })
    })

    // Scroll animations
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in')
        }
      })
    }, observerOptions)

    // Наблюдаем за элементами для анимации
    const animateElements = document.querySelectorAll('.basic-item, .benefit-card, .useful-item, .pipeline-step, .member-card, .organization-card')
    animateElements.forEach((el, index) => {
      // Добавляем задержку для staggered анимации
      el.style.setProperty('--animation-delay', `${index * 0.1}s`)
      observer.observe(el)
    })

    // Обработчик табов демо
    const demoTabBtns = document.querySelectorAll('.demo-tab-btn')
    const demoTabContents = document.querySelectorAll('.demo-tab-content')

    demoTabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Убираем активный класс у всех кнопок
        demoTabBtns.forEach(b => b.classList.remove('active'))
        // Скрываем все контенты
        demoTabContents.forEach(c => c.classList.remove('active'))

        // Добавляем активный класс текущей кнопке
        btn.classList.add('active')

        // Показываем соответствующий контент
        const tabName = btn.getAttribute('data-demo-tab')
        const activeContent = document.querySelector(`.demo-tab-content[data-demo-tab="${tabName}"]`)
        if (activeContent) {
          activeContent.classList.add('active')
        }
      })
    })
  }
}
</script>

<style scoped>
/* Hero секция с анимированным фоном */
.hero-section {
  position: relative;
  color: white;
  padding: 8rem 0 5rem;
  text-align: left;
  overflow: hidden;
  background: var(--gradient-hero);
  min-height: 100vh;
  display: flex;
  align-items: center;
}

/* Анимированный фон - градиент с зерном и пульсацией */
.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 80%, rgba(102, 126, 234, 0.4) 0%, transparent 60%),
    radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.4) 0%, transparent 60%);
  animation: pulseGradient 8s ease-in-out infinite;
  pointer-events: none;
}

/* Текстурный шум */
.hero-section::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.02'/%3E%3C/svg%3E");
  animation: noiseFloat 12s linear infinite;
  pointer-events: none;
}

@keyframes pulseGradient {
  0%, 100% { 
    opacity: 0.8;
    transform: scale(1);
  }
  50% { 
    opacity: 1;
    transform: scale(1.05);
  }
}

@keyframes noiseFloat {
  0% { transform: translateX(0) translateY(0); }
  25% { transform: translateX(-2px) translateY(-1px); }
  50% { transform: translateX(1px) translateY(-2px); }
  75% { transform: translateX(-1px) translateY(1px); }
  100% { transform: translateX(0) translateY(0); }
}

/* Отключение анимации для пользователей с пониженным восприятием движения */
@media (prefers-reduced-motion: reduce) {
  .hero-section::before,
  .hero-section::after {
    animation: none;
  }
}

.hero-content {
  position: relative;
  z-index: 2;
  animation: fadeInUp 1s ease-out;
}

.hero-title {
  font-size: 4rem;
  font-weight: 900;
  margin-bottom: 1.5rem;
  line-height: 1.1;
  background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 30px rgba(255, 255, 255, 0.5);
}

.hero-subtitle {
  font-size: 1.375rem;
  margin-bottom: 2.5rem;
  opacity: 0.9;
  max-width: 720px;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
}

.hero-actions {
  display: flex;
  gap: 1.5rem;
  justify-content: flex-start;
  margin-bottom: 4rem;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Scroll animations - Performance optimized */
.basic-item,
.benefit-card,
.useful-item,
.pipeline-step,
.member-card,
.organization-card {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), 
              transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: var(--animation-delay, 0s);
  will-change: opacity, transform;
}

.basic-item.animate-in,
.benefit-card.animate-in,
.useful-item.animate-in,
.pipeline-step.animate-in,
.member-card.animate-in,
.organization-card.animate-in {
  opacity: 1;
  transform: translateY(0);
  will-change: auto;
}

/* Отключение анимаций для пользователей с пониженным восприятием движения */
@media (prefers-reduced-motion: reduce) {
  .basic-item,
  .benefit-card,
  .useful-item,
  .pipeline-step,
  .member-card,
  .organization-card {
    opacity: 1;
    transform: none;
    transition: none;
  }
  
  .basic-item:hover,
  .benefit-card:hover,
  .useful-item:hover,
  .pipeline-step:hover,
  .member-card:hover,
  .organization-card:hover {
    transform: none;
  }
}

.hero-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 2rem;
  max-width: 600px;
  margin: 0 auto;
}

.kpis { display: flex; gap: 1.5rem; margin-top: 2rem; flex-wrap: wrap; }
.kpi { background: var(--bg-primary); padding: 1rem 1.25rem; border-radius: var(--radius-md); box-shadow: var(--shadow-sm); }
.kpi .num { font-weight: 800; font-size: 1.5rem; color: var(--primary-color); }
.kpi .label { color: var(--text-secondary); font-size: .875rem; }

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

/* Основы онтологий с анимациями */
.ontology-basics {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.basic-item {
  text-align: center;
  padding: 2.5rem;
  background: var(--gradient-glass);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  backdrop-filter: blur(10px);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.basic-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--gradient-primary);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.basic-item:hover {
  transform: translateY(-10px) scale(1.03);
  box-shadow: var(--shadow-xl);
  border-color: rgba(102, 126, 234, 0.3);
}

.basic-item:hover::before {
  transform: scaleX(1);
}

.basic-icon {
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  filter: drop-shadow(0 0 10px rgba(102, 126, 234, 0.3));
}

.basic-item h3 {
  color: var(--primary-color);
  margin-bottom: 1rem;
  font-size: 1.25rem;
  font-weight: 700;
}

.basic-item p {
  color: var(--text-secondary);
  line-height: 1.6;
}

/* Схема стандартов */
.schema-preview {
  background: var(--bg-primary);
  padding: 2rem;
  border-radius: var(--radius-lg);
  text-align: center;
}

.schema-preview h4 {
  color: var(--primary-color);
  margin-bottom: 1.5rem;
}

.schema-flow {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.schema-item {
  background: var(--primary-color);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: var(--radius-sm);
  font-weight: 600;
}

.schema-arrow {
  color: var(--primary-color);
  font-size: 1.5rem;
  font-weight: bold;
}

.schema-description {
  color: var(--text-secondary);
  margin: 0;
}

/* Применения */
.applications-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.featured-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.5rem; }
.block h3 { color: var(--primary-color); margin-bottom: .75rem; }
.mini-list { list-style: none; padding: 0; margin: 0; display: grid; gap: .5rem; }
.mini-list .meta { display: inline-block; margin-left: .5rem; color: var(--text-secondary); font-size: .85rem; }
.faces { display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: .75rem; }
.face { text-align: center; text-decoration: none; }
.face img { width: 80px; height: 80px; object-fit: cover; border-radius: 50%; border: 2px solid var(--primary-color); }
.face-name { margin-top: .5rem; color: var(--text-primary); font-size: .9rem; }

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

/* Выгоды бизнеса - сетка 3x2 */
.benefits-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

@media (max-width: 1024px) {
  .benefits-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .benefits-grid {
    grid-template-columns: 1fr;
  }
}

.benefit-card {
  background: var(--gradient-glass);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2.5rem;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  backdrop-filter: blur(10px);
  text-align: center;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.benefit-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at center, rgba(102, 126, 234, 0.1) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.benefit-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: var(--shadow-xl);
  border-color: rgba(102, 126, 234, 0.4);
}

.benefit-card:hover::before {
  opacity: 1;
}

.benefit-icon {
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 2;
  color: var(--primary-color);
  filter: drop-shadow(0 0 10px rgba(102, 126, 234, 0.3));
}

.benefit-icon svg {
  width: 48px;
  height: 48px;
}

.benefit-card h3 {
  color: var(--primary-color);
  margin-bottom: 1rem;
  font-size: 1.25rem;
  font-weight: 700;
  position: relative;
  z-index: 2;
}

.benefit-card p {
  color: var(--text-secondary);
  margin-bottom: 1rem;
  line-height: 1.6;
  position: relative;
  z-index: 2;
}

.benefit-metric {
  background: var(--success-color);
  color: white;
  padding: 0.375rem 0.75rem;
  border-radius: var(--radius-sm);
  font-weight: 600;
  display: inline-block;
}

/* Прогресс-индикатор */
.progress-container {
  position: relative;
  margin: 3rem 0;
  padding: 0 2rem;
}

.progress-line {
  width: 100%;
  height: 2px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 1px;
  overflow: hidden;
}

.progress-fill {
  width: 0%;
  height: 100%;
  background: var(--gradient-primary);
  border-radius: 1px;
  animation: progressFill 3s ease-out 0.5s forwards;
}

@keyframes progressFill {
  to { width: 100%; }
}

/* Пайплайн stepper */
.pipeline-steps {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 1rem;
  margin-bottom: 3rem;
  position: relative;
}

.pipeline-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  transition: all 0.3s ease;
}

.pipeline-step:hover {
  transform: translateY(-5px);
}

.step-indicator {
  position: relative;
  margin-bottom: 1.5rem;
}

.step-number {
  width: 60px;
  height: 60px;
  background: var(--gradient-primary);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  font-weight: 700;
  box-shadow: var(--shadow-md);
  transition: all 0.3s ease;
}

.step-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  opacity: 0;
  transition: all 0.3s ease;
}

.pipeline-step:hover .step-number {
  transform: scale(1.1);
  box-shadow: var(--shadow-lg);
}

.pipeline-step:hover .step-icon {
  opacity: 1;
}

.pipeline-step:hover .step-number {
  font-size: 0;
}

.step-content h3 {
  color: var(--primary-color);
  margin-bottom: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
}

.step-content p {
  color: var(--text-secondary);
  font-size: 0.875rem;
  margin: 0;
  line-height: 1.4;
}

/* Адаптивность stepper */
@media (max-width: 1024px) {
  .pipeline-steps {
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }
}

@media (max-width: 768px) {
  .pipeline-steps {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .pipeline-step {
    flex-direction: row;
    text-align: left;
    padding: 1.5rem;
    background: var(--gradient-glass);
    border-radius: var(--radius-lg);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .step-indicator {
    margin-right: 1rem;
    margin-bottom: 0;
    flex-shrink: 0;
  }
  
  .step-number {
    width: 50px;
    height: 50px;
    font-size: 1rem;
  }
}

/* Демо-кейс */
.demo-hero {
  margin-bottom: 3rem;
}

.demo-cover {
  position: relative;
  aspect-ratio: 16 / 9;
  background: var(--gradient-primary);
  border-radius: var(--radius-lg);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.demo-badge {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: var(--radius-sm);
  font-weight: 600;
  font-size: 0.875rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.demo-overlay {
  position: absolute;
  bottom: 2rem;
  left: 2rem;
  right: 2rem;
  color: white;
}

.demo-overlay h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: white;
}

.demo-overlay p {
  opacity: 0.9;
  margin: 0;
}

.demo-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: rgba(255, 255, 255, 0.7);
  opacity: 0.5;
}

.demo-placeholder span {
  margin-top: 1rem;
  font-size: 1.125rem;
  font-weight: 500;
}

/* Табы демо */
.demo-tabs {
  background: var(--gradient-glass);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-lg);
  overflow: hidden;
  backdrop-filter: blur(10px);
}

.demo-tabs-header {
  display: flex;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.demo-tab-btn {
  flex: 1;
  padding: 1rem 2rem;
  background: none;
  border: none;
  color: var(--text-secondary);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.demo-tab-btn:hover {
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-primary);
}

.demo-tab-btn.active {
  color: var(--primary-color);
  background: rgba(102, 126, 234, 0.1);
}

.demo-tab-btn.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--primary-color);
}

.demo-tab-content {
  display: none;
  padding: 2rem;
}

.demo-tab-content.active {
  display: block;
}

.demo-before-after {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.demo-column h4 {
  color: var(--primary-color);
  margin-bottom: 1rem;
  font-size: 1.125rem;
}

.demo-column ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.demo-column li {
  padding: 0.5rem 0;
  color: var(--text-secondary);
  position: relative;
  padding-left: 1.5rem;
}

.demo-column li::before {
  content: '→';
  color: var(--primary-color);
  position: absolute;
  left: 0;
  font-weight: bold;
}

.tech-stack-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.tech-stack-item {
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: var(--radius-md);
  color: var(--text-secondary);
}

.tech-stack-item strong {
  color: var(--primary-color);
}

.case-content h3 {
  color: var(--primary-color);
  margin-bottom: 1rem;
}

.case-features {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin: 1.5rem 0;
}

.case-feature {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
}

.feature-icon {
  font-size: 1.2rem;
}

.case-results h4 {
  color: var(--text-primary);
  margin-bottom: 0.75rem;
}

.case-results ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.case-results li {
  padding: 0.25rem 0;
  color: var(--text-secondary);
  position: relative;
  padding-left: 1.5rem;
}

.case-results li::before {
  content: '✓';
  color: var(--success-color);
  position: absolute;
  left: 0;
  font-weight: bold;
}

.case-visual {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.graph-preview {
  background: var(--bg-secondary);
  padding: 1.5rem;
  border-radius: var(--radius-md);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.graph-node {
  background: var(--primary-color);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: var(--radius-sm);
  font-size: 0.875rem;
  font-weight: 500;
}

.graph-edge {
  color: var(--text-secondary);
  font-size: 0.8rem;
  font-style: italic;
}

.graph-caption {
  color: var(--text-secondary);
  font-size: 0.875rem;
  text-align: center;
  margin: 0;
}

.case-disclaimer {
  background: var(--bg-tertiary);
  padding: 1rem;
  border-radius: var(--radius-md);
  margin-bottom: 2rem;
}

.case-disclaimer p {
  color: var(--text-secondary);
  font-size: 0.875rem;
  margin: 0;
}

/* Публикации - новые стили для интеграции */
.publications-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.publications-load-more {
  text-align: center;
  margin-bottom: 2rem;
}

.btn-sm {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

/* Команда */
.team-members {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.member-card {
  background: var(--gradient-glass);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2rem;
  border-radius: var(--radius-lg);
  backdrop-filter: blur(10px);
  text-align: center;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.member-card:hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow: var(--shadow-xl);
  border-color: rgba(102, 126, 234, 0.3);
}

.member-avatar {
  margin-bottom: 1.5rem;
}

.member-avatar img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--primary-color);
  transition: all 0.3s ease;
  loading: lazy;
}

.member-card:hover .member-avatar img {
  transform: scale(1.05);
  box-shadow: 0 0 20px rgba(102, 126, 234, 0.4);
}

.member-info h4 {
  color: var(--primary-color);
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
  font-weight: 700;
}

.member-role {
  color: var(--text-primary);
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
}

.member-description {
  color: var(--text-secondary);
  font-size: 0.875rem;
  line-height: 1.4;
  margin-bottom: 1rem;
}

.member-links {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
}

.member-link {
  color: var(--text-light);
  transition: all 0.3s ease;
  padding: 0.5rem;
  border-radius: var(--radius-sm);
}

.member-link:hover {
  color: var(--primary-color);
  background: rgba(102, 126, 234, 0.1);
  transform: translateY(-2px);
}

/* Организации */
.organizations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.organization-card {
  background: var(--gradient-glass);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2rem;
  border-radius: var(--radius-lg);
  backdrop-filter: blur(10px);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.organization-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-xl);
  border-color: rgba(102, 126, 234, 0.3);
}

.org-logo-container {
  flex-shrink: 0;
}

.org-logo {
  width: 80px;
  height: 80px;
  background: var(--gradient-primary);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: white;
  font-size: 0.875rem;
  box-shadow: var(--shadow-md);
}

.org-info h4 {
  color: var(--primary-color);
  margin-bottom: 0.5rem;
  font-size: 1.125rem;
  font-weight: 700;
}

.org-role {
  color: var(--accent-color);
  font-weight: 600;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
}

.org-description {
  color: var(--text-secondary);
  font-size: 0.875rem;
  line-height: 1.4;
  margin: 0;
}

/* Вкладки */
.tabs-container {
  margin-bottom: 3rem;
}

.tabs-header {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid var(--border-color);
}

.tab-btn {
  background: none;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-secondary);
  cursor: pointer;
  border-radius: var(--radius-md);
  transition: all 0.3s ease;
}

.tab-btn:hover {
  background: var(--bg-primary);
  color: var(--primary-color);
}

.tab-btn.active {
  background: var(--primary-color);
  color: white;
}

.tab-content {
  display: none;
}

.tab-content.active {
  display: block;
}

.partners-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.partner-logo {
  background: var(--bg-primary);
  padding: 1.5rem;
  border-radius: var(--radius-lg);
  text-align: center;
  font-weight: 600;
  color: var(--text-primary);
  transition: transform 0.3s ease;
}

.partner-logo:hover {
  transform: translateY(-3px);
}

/* FAQ Accordion */
.faq-accordion {
  max-width: 800px;
  margin: 0 auto;
}

.faq-item {
  background: var(--gradient-glass);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-lg);
  margin-bottom: 1rem;
  backdrop-filter: blur(10px);
  overflow: hidden;
  transition: all 0.3s ease;
}

.faq-item:hover {
  border-color: rgba(102, 126, 234, 0.3);
  box-shadow: var(--shadow-md);
}

.faq-question {
  width: 100%;
  padding: 1.5rem 2rem;
  background: none;
  border: none;
  text-align: left;
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
  position: relative;
}

.faq-question:hover {
  color: var(--primary-color);
  background: rgba(102, 126, 234, 0.05);
}

.faq-question:focus {
  outline: none;
  box-shadow: inset 0 0 0 2px rgba(102, 126, 234, 0.2);
}

.faq-question.active {
  color: var(--primary-color);
  background: rgba(102, 126, 234, 0.1);
}

.faq-arrow {
  transition: transform 0.3s ease;
  color: var(--primary-color);
  flex-shrink: 0;
  margin-left: 1rem;
}

.faq-question.active .faq-arrow {
  transform: rotate(180deg);
}

.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.faq-answer.active {
  max-height: 300px; /* Достаточно для большинства ответов */
}

.faq-answer-content {
  padding: 0 2rem 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.faq-answer-content p {
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 1rem 0 0;
  font-size: 0.95rem;
}

/* Анимация появления для FAQ */
.faq-item.animate-faq {
  opacity: 0;
  transform: translateY(10px);
  animation: fadeInUp 0.5s ease forwards;
}

.faq-item:nth-child(1) { animation-delay: 0.1s; }
.faq-item:nth-child(2) { animation-delay: 0.2s; }
.faq-item:nth-child(3) { animation-delay: 0.3s; }
.faq-item:nth-child(4) { animation-delay: 0.4s; }
.faq-item:nth-child(5) { animation-delay: 0.5s; }

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Общие элементы */
.section-cta {
  text-align: center;
  margin-top: 3rem;
}

/* Переключатели групп в разделе "Полезное" */
.useful-tabs {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.useful-tab-btn {
  padding: 0.75rem 1.5rem;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  background: var(--gradient-glass);
  backdrop-filter: blur(10px);
  color: var(--text-secondary);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 44px;
  font-family: var(--font-sans);
}

.useful-tab-btn:hover {
  border-color: var(--primary-color);
  background: rgba(102, 126, 234, 0.1);
  color: var(--text-primary);
}

.useful-tab-btn.active {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.useful-tab-btn:focus {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}

.useful-tab-btn:focus:not(:focus-visible) {
  outline: none;
}

.useful-tab-btn:focus-visible {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}

/* Контент групп */
.useful-content {
  margin-top: 2rem;
}

.useful-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.useful-item {
  background: var(--gradient-glass);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1.5rem;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.useful-item:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-xl);
  border-color: rgba(102, 126, 234, 0.3);
}

.useful-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.useful-item h3 {
  color: var(--primary-color);
  margin-bottom: 0.75rem;
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.3;
}

.useful-item p {
  color: var(--text-secondary);
  font-size: 0.875rem;
  margin: 0 0 1.5rem 0;
  line-height: 1.4;
  flex-grow: 1;
}

.useful-btn {
  background: var(--primary-color);
  color: white;
  border: none;
  padding: 0.625rem 1.25rem;
  border-radius: var(--radius-sm);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  align-self: flex-start;
  min-height: 44px;
  font-family: var(--font-sans);
}

.useful-btn:hover {
  background: var(--accent-color);
  transform: translateY(-1px);
}

.useful-btn:focus {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}

.useful-btn:focus:not(:focus-visible) {
  outline: none;
}

.useful-btn:focus-visible {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}

/* CTA секция с эпичными эффектами */
.cta-section {
  background: var(--gradient-hero);
  color: white;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.cta-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 30% 30%, rgba(102, 126, 234, 0.4) 0%, transparent 50%),
    radial-gradient(circle at 70% 70%, rgba(139, 92, 246, 0.4) 0%, transparent 50%);
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

.cta-content {
  position: relative;
  z-index: 2;
}

.cta-content h2 {
  font-size: 3rem;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 30px rgba(255, 255, 255, 0.5);
  font-weight: 900;
}

.cta-content p {
  font-size: 1.25rem;
  margin-bottom: 2.5rem;
  opacity: 0.9;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
}

.cta-actions {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

.cta-actions .btn {
  padding: 1rem 2.5rem;
  font-size: 1rem;
  font-weight: 700;
}

/* Адаптивность */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.125rem;
  }
  
  .hero-actions {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .cta-content h2 {
    font-size: 2rem;
  }

  .cta-content p {
    font-size: 1.125rem;
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
  
  .ontology-basics,
  .applications-grid,
  .benefits-grid,
  .useful-grid,
  .publications-grid,
  .faq-preview {
    grid-template-columns: 1fr;
  }
  
  .schema-flow {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .schema-arrow {
    transform: rotate(90deg);
  }
  
  .pipeline-steps {
    flex-direction: column;
    align-items: center;
  }
  
  .demo-case {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .case-features {
    grid-template-columns: 1fr;
  }
  
  .team-preview {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .team-members {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
  
  .partners-showcase {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .partner-logos {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  }
  
  .cta-actions {
    flex-direction: column;
    align-items: center;
  }
}

/* Контактная форма */
.contact-form {
  max-width: 800px;
  margin: 0 auto;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group-full {
  grid-column: 1 / -1;
}

.form-group label {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

.form-group input,
.form-group textarea {
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--primary-color);
}

.form-group textarea {
  resize: vertical;
  min-height: 100px;
}

.form-actions {
  grid-column: 1 / -1;
  text-align: center;
  margin-top: 1rem;
}

.form-actions .btn {
  min-width: 150px;
}

/* Адаптивность формы */
@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }

  .form-group-full {
    grid-column: 1;
  }

  /* Адаптивность схемы */
  .schema-container {
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .schema-arrow {
    transform: rotate(90deg);
    margin: 0;
  }
  
  .useful-grid {
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1rem;
  }

  .useful-tabs {
    gap: 0.5rem;
  }

  .useful-tab-btn {
    font-size: 0.8125rem;
    padding: 0.625rem 1rem;
  }

  /* Адаптивность команды и организаций */
  .team-members {
    grid-template-columns: 1fr;
  }

  .organizations-grid {
    grid-template-columns: 1fr;
  }

  .organization-card {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }

  /* Адаптивность публикаций */
  .publications-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  /* Адаптивность FAQ */
  .faq-question {
    padding: 1rem 1.5rem;
    font-size: 1rem;
  }

  .faq-answer-content {
    padding: 0 1.5rem 1rem;
  }

  .faq-arrow {
    margin-left: 0.5rem;
  }
}
</style> 