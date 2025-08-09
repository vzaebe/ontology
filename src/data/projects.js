// Project model aligned with spec
// Project: {id, slug, title, status{idea/mvp/prod}, domain, summary, problem, approach, stack[], artifacts[], publications[], contacts}

export const projects = [
  {
    id: 'proj-data2kg',
    slug: 'data-to-knowledge-graph',
    title: 'Данные → Граф знаний',
    status: 'mvp',
    domain: 'ИТ',
    summary: 'Из источников данных к графу знаний: нормализация сущностей/связей, построение онтологии и публикация графа.',
    problem: 'Разрозненность данных и слабая семантическая согласованность между системами.',
    approach: 'Выделение понятий, формализация онтологией, публикация графа для поиска и аналитики.',
    stack: ['Python', 'RDFLib', 'Protégé', 'GraphDB'],
    artifacts: ['demo.ttl', 'catalog.xlsx', 'screenshots/graph.png'],
    publications: [],
    contacts: { email: 'contact@ontology.ru' }
  },
  {
    id: 'proj-recommendations',
    slug: 'semantic-recommendations',
    title: 'Семантические рекомендации',
    status: 'idea',
    domain: 'Медиа',
    summary: 'Рекомендации контента на основе онтологий и пользовательских профилей.',
    problem: 'Слабая релевантность рекомендаций без учёта смысловых связей.',
    approach: 'Онтология домена + граф связей, запросы для подбора релевантного контента.',
    stack: ['SPARQL', 'Python'],
    artifacts: [],
    publications: [],
    contacts: { email: 'contact@ontology.ru' }
  },
  {
    id: 'proj-data-catalog',
    slug: 'semantic-data-catalog',
    title: 'Семантический каталог данных',
    status: 'mvp',
    domain: 'Предприятие',
    summary: 'Единые термины, понятия и связи для поиска и соблюдения регламентов.',
    problem: 'Трудно найти данные и понять контекст полей в разных системах.',
    approach: 'Онтология предметной области, линковка к источникам, понятия как первичные сущности.',
    stack: ['OWL', 'SPARQL', 'RDF4J'],
    artifacts: ['core.ttl'],
    publications: [],
    contacts: { email: 'contact@ontology.ru' }
  }
]


