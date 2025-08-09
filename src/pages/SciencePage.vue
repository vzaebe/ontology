<template>
  <div class="science-page">
    <CurveDivider />
    <!-- Заголовок страницы -->
    <section class="page-header">
      <div class="container">
        <h1>Научные публикации</h1>
        <p class="page-subtitle">
          Статьи и исследования об онтологиях, графах знаний и семантических технологиях
        </p>
      </div>
    </section>

    <!-- Фильтры -->
    <section class="filters-section">
      <div class="container">
        <div class="filters">
          <div class="filter-group">
            <label for="journal-filter">Журнал:</label>
            <select 
              id="journal-filter" 
              v-model="filters.journal"
              class="filter-select"
            >
              <option value="">Все журналы</option>
              <option value="Applied Ontology">Applied Ontology</option>
              <option value="Journal of Web Semantics">Journal of Web Semantics</option>
              <option value="Semantic Web Journal">Semantic Web Journal</option>
              <option value="IEEE Transactions">IEEE Transactions</option>
              <option value="ACM Transactions">ACM Transactions</option>
            </select>
          </div>
          
          <div class="filter-group">
            <label for="year-filter">Год:</label>
            <select 
              id="year-filter" 
              v-model="filters.year"
              class="filter-select"
            >
              <option value="">Все годы</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
            </select>
          </div>
          
          <div class="filter-group">
            <label for="search-filter">Поиск:</label>
            <input 
              id="search-filter"
              v-model="filters.search"
              type="text"
              placeholder="Поиск по названию, авторам или ключевым словам..."
              class="filter-input"
            />
          </div>
          
          <button 
            @click="clearFilters"
            class="btn btn-secondary"
          >
            🗑️ Очистить фильтры
          </button>
        </div>
      </div>
    </section>

    <!-- Статистика публикаций -->
    <section class="stats-section">
      <div class="container">
        <h2>Статистика публикаций</h2>
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon">📊</div>
            <div class="stat-number">{{ totalArticles }}</div>
            <div class="stat-label">Всего статей</div>
          </div>
          
          <div class="stat-card">
            <div class="stat-icon">📚</div>
            <div class="stat-number">{{ uniqueJournals }}</div>
            <div class="stat-label">Журналов</div>
          </div>
          
          <div class="stat-card">
            <div class="stat-icon">👥</div>
            <div class="stat-number">{{ uniqueAuthors }}</div>
            <div class="stat-label">Авторов</div>
          </div>
          
          <div class="stat-card">
            <div class="stat-icon">📈</div>
            <div class="stat-number">{{ averageCitations }}</div>
            <div class="stat-label">Среднее цитирование</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Список статей (списком) -->
    <section class="articles-section list-variant">
      <div class="container">
        <div class="articles-header">
          <h2 id="publications">Найдено статей: {{ filteredArticles.length }}</h2>
          <div class="sort-controls">
            <label for="sort-select">Сортировка:</label>
            <select 
              id="sort-select" 
              v-model="sortBy"
              class="sort-select"
            >
              <option value="citations">По цитированию</option>
              <option value="year">По году</option>
              <option value="title">По названию</option>
              <option value="impact">По импакт-фактору</option>
            </select>
          </div>
        </div>
        
        <ul class="articles-list">
          <li 
            v-for="article in sortedArticles" 
            :key="article.id"
            class="article-row"
          >
            <div class="article-row-main">
              <a :href="article.url" target="_blank" rel="noopener" class="article-link">
                {{ article.title }}
              </a>
              <span class="article-meta-inline">
                <span class="journal">{{ article.journal }}</span>
                <span class="year">{{ article.year }}</span>
                <span v-if="article.metrics?.citations" class="citations">📊 {{ article.metrics.citations }}</span>
                <span v-if="article.metrics?.impactFactor" class="impact">⭐ {{ article.metrics.impactFactor }}</span>
              </span>
            </div>
            <div v-if="article.authors?.length" class="article-authors-inline">
              {{ article.authors.join(', ') }}
            </div>
          </li>
        </ul>
        
        <!-- Пагинация -->
        <div class="pagination" v-if="totalPages > 1">
          <button 
            @click="currentPage--"
            :disabled="currentPage === 1"
            class="pagination-btn"
          >
            ← Предыдущая
          </button>
          
          <div class="page-numbers">
            <button 
              v-for="page in visiblePages" 
              :key="page"
              @click="currentPage = page"
              class="page-btn"
              :class="{ 'active': currentPage === page }"
            >
              {{ page }}
            </button>
          </div>
          
          <button 
            @click="currentPage++"
            :disabled="currentPage === totalPages"
            class="pagination-btn"
          >
            Следующая →
          </button>
        </div>
      </div>
    </section>

    <!-- Популярные журналы -->
    <section class="journals-section">
      <div class="container">
        <h2>Популярные журналы</h2>
        <div class="journals-grid">
          <div 
            v-for="journal in popularJournals" 
            :key="journal.name"
            class="journal-card"
          >
            <div class="journal-header">
              <h3>{{ journal.name }}</h3>
            <div class="journal-impact">
              <svg class="icon" width="14" height="14" aria-hidden="true"><use href="#icon-star"/></svg>
              IF: {{ journal.impactFactor }}
            </div>
            </div>
            <p class="journal-description">{{ journal.description }}</p>
            <div class="journal-stats">
              <div class="journal-stat">
                <span class="stat-label">Статей:</span>
                <span class="stat-value">{{ journal.articlesCount }}</span>
              </div>
              <div class="journal-stat">
                <span class="stat-label">Цитирований:</span>
                <span class="stat-value">{{ journal.totalCitations }}</span>
              </div>
            </div>
            <a :href="journal.url" target="_blank" rel="noopener" class="btn btn-primary">
              Перейти на сайт
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Тренды исследований (приземленная версия) -->
    <section class="trends-section">
      <div class="container">
        <h2>Тренды исследований</h2>
        <div class="trends-grid">
          <div class="trend-card">
            <h3><svg class="icon" width="18" height="18" aria-hidden="true"><use href="#icon-chart" /></svg> Популярные темы (практика)</h3>
            <div class="trend-tags">
              <span class="trend-tag">Семантическая индексация</span>
              <span class="trend-tag">Каталоги данных</span>
              <span class="trend-tag">Онтологии требований</span>
              <span class="trend-tag">Интеграция CAD/PLM</span>
              <span class="trend-tag">Объяснимый ИИ</span>
            </div>
          </div>
          
          <div class="trend-card">
            <h3><svg class="icon" width="18" height="18" aria-hidden="true"><use href="#icon-trending-up" /></svg> Растущие направления (авиастроение)</h3>
            <div class="trend-list">
              <div class="trend-item">
                <span class="trend-name">Автоматизация проектирования</span>
                <span class="trend-growth">+45%</span>
              </div>
              <div class="trend-item">
                <span class="trend-name">Семантическая интеграция</span>
                <span class="trend-growth">+32%</span>
              </div>
              <div class="trend-item">
                <span class="trend-name">Управление знаниями</span>
                <span class="trend-growth">+28%</span>
              </div>
            </div>
          </div>
          
          <div class="trend-card">
            <h3>🌍 Географическое распределение</h3>
            <div class="trend-list">
              <div class="trend-item">
                <span class="trend-name">США</span>
                <span class="trend-growth">35%</span>
              </div>
              <div class="trend-item">
                <span class="trend-name">Европа</span>
                <span class="trend-growth">30%</span>
              </div>
              <div class="trend-item">
                <span class="trend-name">Азия</span>
                <span class="trend-growth">25%</span>
              </div>
              <div class="trend-item">
                <span class="trend-name">Россия</span>
                <span class="trend-growth">10%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import ArticleCard from '../components/ArticleCard.vue'
import CurveDivider from '../components/CurveDivider.vue'
import { publications as cmsPublications } from '../data/publications.js'

export default {
  name: 'SciencePage',
  components: {
    ArticleCard,
    CurveDivider
  },
  setup() {
    // Состояние фильтров
    const filters = ref({
      journal: '',
      year: '',
      search: ''
    })
    
    // Сортировка
    const sortBy = ref('citations')
    
    // Пагинация
    const currentPage = ref(1)
    const itemsPerPage = ref(6)
    
    // Исходные статьи (сохраняем) + добавляем публикации из CMS (две карточки по ТЗ)
    const articles = ref([
      // Существующие записи (сохранены)
      {
        id: 1,
        title: 'Ontology-based approach for automated pipeline design',
        authors: ['Иванов А.П.', 'Петров В.С.', 'Smith J.'],
        journal: 'Applied Ontology',
        year: 2024,
        doi: '10.3233/AO-2024-001',
        url: 'https://content.iospress.com/articles/applied-ontology/ao2024001',
        abstract: 'This paper presents a novel ontology-based approach for automated pipeline design in the oil and gas industry. The proposed methodology integrates domain knowledge with computational algorithms to improve design efficiency and accuracy.',
        keywords: ['онтологии', 'автоматизация', 'проектирование', 'трубопроводы'],
        metrics: { citations: 15, impactFactor: 2.8 }
      },
      {
        id: 2,
        title: 'Semantic integration of heterogeneous data sources in oil and gas domain',
        authors: ['Сидоров М.К.', 'Johnson R.', 'Brown A.'],
        journal: 'Journal of Web Semantics',
        year: 2023,
        doi: '10.1016/j.websem.2023.100123',
        url: 'https://www.sciencedirect.com/science/article/abs/pii/S1570826823001234',
        abstract: 'We propose a semantic integration framework for heterogeneous data sources commonly found in oil and gas operations. The framework leverages ontologies to provide unified access to diverse data formats.',
        keywords: ['семантическая интеграция', 'гетерогенные данные', 'нефтегаз'],
        metrics: { citations: 28, impactFactor: 3.2 }
      },
      {
        id: 3,
        title: 'Knowledge management in industrial automation using ontologies',
        authors: ['Козлов Д.А.', 'Wilson E.', 'Davis M.'],
        journal: 'IEEE Transactions on Industrial Informatics',
        year: 2023,
        doi: '10.1109/TII.2023.456789',
        url: 'https://ieeexplore.ieee.org/document/456789',
        abstract: 'This research explores the application of ontologies for knowledge management in industrial automation systems. The study demonstrates improved decision-making capabilities through structured knowledge representation.',
        keywords: ['управление знаниями', 'промышленная автоматизация', 'онтологии'],
        metrics: { citations: 42, impactFactor: 4.5 }
      },
      {
        id: 4,
        title: 'RDF-based data modeling for equipment lifecycle management',
        authors: ['Новиков П.В.', 'Anderson L.', 'Taylor S.'],
        journal: 'Semantic Web Journal',
        year: 2022,
        doi: '10.3233/SW-2022-002',
        url: 'https://content.iospress.com/articles/semantic-web/sw2022002',
        abstract: 'We present an RDF-based data modeling approach for equipment lifecycle management in the oil and gas sector. The model supports comprehensive tracking of equipment from design to decommissioning.',
        keywords: ['RDF', 'жизненный цикл', 'оборудование', 'моделирование'],
        metrics: { citations: 19, impactFactor: 2.9 }
      },
      {
        id: 5,
        title: 'OWL ontologies for safety standards compliance',
        authors: ['Морозов А.И.', 'Garcia M.', 'Lee K.'],
        journal: 'Applied Ontology',
        year: 2022,
        doi: '10.3233/AO-2022-003',
        url: 'https://content.iospress.com/articles/applied-ontology/ao2022003',
        abstract: 'This paper describes the development of OWL ontologies for representing safety standards in the oil and gas industry. The ontologies enable automated compliance checking and risk assessment.',
        keywords: ['OWL', 'стандарты безопасности', 'соответствие', 'оценка рисков'],
        metrics: { citations: 31, impactFactor: 2.8 }
      },
      {
        id: 6,
        title: 'SPARQL queries for operational data analysis',
        authors: ['Волков С.Н.', 'Miller P.', 'Chen H.'],
        journal: 'ACM Transactions on Database Systems',
        year: 2021,
        doi: '10.1145/123456.789012',
        url: 'https://dl.acm.org/doi/10.1145/123456.789012',
        abstract: 'We investigate the use of SPARQL queries for analyzing operational data in oil and gas facilities. The approach provides flexible and powerful data exploration capabilities.',
        keywords: ['SPARQL', 'анализ данных', 'операционные данные', 'запросы'],
        metrics: { citations: 25, impactFactor: 3.8 }
      },
      // Добавляем публикации из CMS
      ...cmsPublications.map((p, idx) => ({
        id: `cms-${idx}`,
        title: p.title,
        authors: p.authors,
        journal: p.venue,
        year: p.year,
        doi: '',
        url: '#',
        abstract: p.abstract,
        keywords: p.keywords,
        metrics: { citations: 0, impactFactor: 0 }
      }))
    ])
    
    // Популярные журналы
    const popularJournals = ref([
      {
        name: 'Applied Ontology',
        impactFactor: '2.8',
        description: 'Международный журнал, посвященный прикладным аспектам онтологий',
        articlesCount: 45,
        totalCitations: 1250,
        url: 'https://content.iospress.com/journals/applied-ontology'
      },
      {
        name: 'Journal of Web Semantics',
        impactFactor: '3.2',
        description: 'Ведущий журнал по семантическому вебу и связанным технологиям',
        articlesCount: 38,
        totalCitations: 2100,
        url: 'https://www.sciencedirect.com/journal/journal-of-web-semantics'
      },
      {
        name: 'Semantic Web Journal',
        impactFactor: '2.9',
        description: 'Журнал по семантическому вебу и связанным технологиям',
        articlesCount: 32,
        totalCitations: 980,
        url: 'https://content.iospress.com/journals/semantic-web'
      },
      {
        name: 'IEEE Transactions on Industrial Informatics',
        impactFactor: '4.5',
        description: 'Журнал по промышленной информатике и автоматизации',
        articlesCount: 28,
        totalCitations: 3200,
        url: 'https://ieeexplore.ieee.org/xpl/RecentIssue.jsp?punumber=9424'
      }
    ])
    
    // Фильтрация статей
    const filteredArticles = computed(() => {
      return articles.value.filter(article => {
        // Фильтр по журналу
        if (filters.value.journal && article.journal !== filters.value.journal) {
          return false
        }
        
        // Фильтр по году
        if (filters.value.year && article.year !== parseInt(filters.value.year)) {
          return false
        }
        
        // Фильтр по поиску
        if (filters.value.search) {
          const searchLower = filters.value.search.toLowerCase()
          const titleMatch = article.title.toLowerCase().includes(searchLower)
          const authorsMatch = article.authors.some(author => 
            author.toLowerCase().includes(searchLower)
          )
          const keywordsMatch = article.keywords.some(keyword => 
            keyword.toLowerCase().includes(searchLower)
          )
          if (!titleMatch && !authorsMatch && !keywordsMatch) {
            return false
          }
        }
        
        return true
      })
    })
    
    // Сортировка
    const sortedArticles = computed(() => {
      const sorted = [...filteredArticles.value]
      
      switch (sortBy.value) {
        case 'citations':
          return sorted.sort((a, b) => b.metrics.citations - a.metrics.citations)
        case 'year':
          return sorted.sort((a, b) => b.year - a.year)
        case 'title':
          return sorted.sort((a, b) => a.title.localeCompare(b.title))
        case 'impact':
          return sorted.sort((a, b) => b.metrics.impactFactor - a.metrics.impactFactor)
        default:
          return sorted
      }
    })
    
    // Пагинация
    const totalPages = computed(() => {
      return Math.ceil(sortedArticles.value.length / itemsPerPage.value)
    })
    
    const paginatedArticles = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage.value
      const end = start + itemsPerPage.value
      return sortedArticles.value.slice(start, end)
    })
    
    const visiblePages = computed(() => {
      const pages = []
      const start = Math.max(1, currentPage.value - 2)
      const end = Math.min(totalPages.value, currentPage.value + 2)
      
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
      
      return pages
    })
    
    // Статистика
    const totalArticles = computed(() => articles.value.length)
    
    const uniqueJournals = computed(() => {
      const journals = new Set(articles.value.map(a => a.journal))
      return journals.size
    })
    
    const uniqueAuthors = computed(() => {
      const authors = new Set()
      articles.value.forEach(article => {
        article.authors.forEach(author => authors.add(author))
      })
      return authors.size
    })
    
    const averageCitations = computed(() => {
      const total = articles.value.reduce((sum, article) => sum + article.metrics.citations, 0)
      return Math.round(total / articles.value.length)
    })
    
    // Методы
    const clearFilters = () => {
      filters.value = {
        journal: '',
        year: '',
        search: ''
      }
      currentPage.value = 1
    }
    
    return {
      filters,
      sortBy,
      currentPage,
      filteredArticles: paginatedArticles,
      totalPages,
      visiblePages,
      popularJournals,
      totalArticles,
      uniqueJournals,
      uniqueAuthors,
      averageCitations,
      clearFilters
    }
  }
}
</script>

<style scoped>
/* Заголовок страницы */
.page-header {
  background: radial-gradient(600px 400px at 12% 20%, rgba(255,47,109,0.35), transparent 60%),
              linear-gradient(135deg, #2a0b3b, #0a0d1f 70%);
  color: white;
  padding: 4rem 0;
  text-align: center;
}

.page-header h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.page-subtitle {
  font-size: 1.25rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
}

/* Фильтры */
.filters-section {
  background: var(--bg-secondary);
  padding: 2rem 0;
  border-bottom: 1px solid var(--bg-tertiary);
}

.filters {
  display: flex;
  gap: 2rem;
  align-items: end;
  flex-wrap: wrap;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.filter-group label {
  font-weight: 600;
  color: var(--text-primary);
  font-size: 0.875rem;
}

.filter-select,
.filter-input {
  padding: 0.75rem;
  border: 1px solid var(--text-light);
  border-radius: var(--radius-md);
  background: var(--bg-primary);
  font-size: 0.875rem;
  min-width: 200px;
}

.filter-select:focus,
.filter-input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(30, 58, 138, 0.1);
}

/* Статистика */
.stats-section {
  padding: 4rem 0;
  background: var(--bg-secondary);
}

.stats-section h2 {
  text-align: center;
  color: var(--primary-color);
  margin-bottom: 3rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

.stat-card {
  background: var(--bg-primary);
  padding: 2rem;
  border-radius: var(--radius-lg);
  text-align: center;
  box-shadow: var(--shadow-md);
}

.stat-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
}

.stat-label {
  color: var(--text-secondary);
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Статьи */
.articles-section {
  padding: 4rem 0;
}

.articles-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.articles-header h2 {
  color: var(--primary-color);
  margin: 0;
}

.sort-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.sort-controls label {
  font-weight: 600;
  color: var(--text-primary);
  font-size: 0.875rem;
}

.sort-select {
  padding: 0.5rem;
  border: 1px solid var(--text-light);
  border-radius: var(--radius-md);
  background: var(--bg-primary);
  font-size: 0.875rem;
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

/* Пагинация */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 3rem;
}

.pagination-btn {
  padding: 0.75rem 1.5rem;
  border: 1px solid var(--text-light);
  background: var(--bg-primary);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.2s ease;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-btn:not(:disabled):hover {
  background: var(--bg-secondary);
}

.page-numbers {
  display: flex;
  gap: 0.5rem;
}

.page-btn {
  width: 3rem;
  height: 3rem;
  border: 1px solid var(--text-light);
  background: var(--bg-primary);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.page-btn.active {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.page-btn:hover:not(.active) {
  background: var(--bg-secondary);
}

/* Журналы */
.journals-section {
  background: var(--bg-secondary);
  padding: 4rem 0;
}

.journals-section h2 {
  text-align: center;
  color: var(--primary-color);
  margin-bottom: 3rem;
}

.journals-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.journal-card {
  background: var(--bg-primary);
  padding: 2rem;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
}

.journal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.journal-header h3 {
  color: var(--primary-color);
  margin: 0;
}

.journal-impact {
  background: var(--accent-color);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-sm);
  font-weight: 600;
  font-size: 0.875rem;
}

.journal-description {
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
}

.journal-stats {
  display: flex;
  gap: 2rem;
  margin-bottom: 1.5rem;
}

.journal-stat {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.stat-label {
  color: var(--text-secondary);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stat-value {
  color: var(--text-primary);
  font-weight: 600;
  font-size: 1.125rem;
}

/* Тренды */
.trends-section {
  padding: 4rem 0;
}

.trends-section h2 {
  text-align: center;
  color: var(--primary-color);
  margin-bottom: 3rem;
}

.trends-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.trend-card {
  background: var(--bg-primary);
  padding: 2rem;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
}

.trend-card h3 {
  color: var(--primary-color);
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.trend-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.trend-tag {
  background: var(--accent-color);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: var(--radius-sm);
  font-size: 0.875rem;
  font-weight: 500;
}

.trend-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.trend-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
}

.trend-name {
  color: var(--text-primary);
  font-weight: 500;
}

.trend-growth {
  background: var(--success-color);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-sm);
  font-weight: 600;
  font-size: 0.875rem;
}

/* Адаптивность */
@media (max-width: 768px) {
  .page-header h1 {
    font-size: 2rem;
  }
  
  .page-subtitle {
    font-size: 1rem;
  }
  
  .filters {
    flex-direction: column;
    align-items: stretch;
  }
  
  .filter-select,
  .filter-input {
    min-width: auto;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .articles-header {
    flex-direction: column;
    align-items: stretch;
  }
  
  .articles-grid {
    grid-template-columns: 1fr;
  }
  
  .pagination {
    flex-direction: column;
    gap: 1rem;
  }
  
  .journals-grid {
    grid-template-columns: 1fr;
  }
  
  .trends-grid {
    grid-template-columns: 1fr;
  }
  
  .journal-stats {
    flex-direction: column;
    gap: 1rem;
  }
}
</style> 