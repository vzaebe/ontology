// Enhanced publications data model according to spec
// Model: Publication {id, slug, title, year, venue, type, authors, orgs[], tags[], has_pdf, links{}, abstract, attachments[], featured, issue, pages, keywords[], badges[], figures[], standards[]}

export const publications = [
  {
    id: 'pub-aistep-2025-ont-asu',
    slug: 'ontological-description-asutd-2025',
    title: 'Онтологическое описание АСУТП',
    year: 2025,
    venue: 'Автоматизация и информатизация ТЭК',
    type: 'article',
    authors: [
      { name: 'Шишенков М.А.', personId: 'm1' },
      { name: 'Чужинов Е.С.', personId: null }
    ],
    orgs: [
      { id: 'org-ontology-ru', name: 'Ontology.ru', role: 'участник' }
    ],
    tags: ['онтологии', 'АСУТП', 'OWL', 'автоматизация'],
    has_pdf: true,
    links: {
      pdf: '/papers/ont-asutd-2025.pdf',
      doi: null,
      url: null
    },
    abstract: 'Практическое описание применения онтологий OWL 2 DL для машиночитаемой документации и подготовки к автоконфигурированию ПО в АСУ ТП.',
    attachments: [],
    featured: true,
    issue: '№ 1(618)',
    pages: '15–24',
    keywords: ['OWL 2 DL', 'АСУ ТП', 'мультидоменная модель', 'фасеты сигналов', 'мереология'],
    badges: ['peer-reviewed', 'rinc'],
    figures: [],
    standards: ['std-gost-21838-1-2021', 'std-gost-59798-2021', 'std-gost-15926-2-2010']
  },
  {
    id: 'pub-eiks-2024-xml2owl',
    slug: 'automated-engineering-info-processing-2024',
    title: 'Автоматизированная обработка инж.-техн. информации из схем',
    year: 2024,
    venue: 'Электротехнические и информационные комплексы и системы',
    type: 'article',
    authors: [
      { name: 'Шишенков М.А.', personId: 'm1' }
    ],
    orgs: [
      { id: 'org-ontology-ru', name: 'Ontology.ru', role: 'участник' }
    ],
    tags: ['парсинг данных', 'OWL', 'автоматизация', 'схемы'],
    has_pdf: true,
    links: {
      pdf: '/papers/xml2owl-2024.pdf',
      doi: null,
      url: null
    },
    abstract: 'Подход к преобразованию схем (*.xml: draw.io/E3/ModelStudio) в OWL-модель с использованием owlready/rdflib, визуализацией графа и последующим экспортом.',
    attachments: [],
    featured: false,
    issue: '№ 4, т. 20',
    pages: '',
    keywords: ['парсинг XML', 'OWL', 'rdflib', 'owlready', 'АСУ ТП'],
    badges: ['peer-reviewed'],
    figures: [],
    standards: ['std-gost-21838-1-2021']
  },
  {
    id: 'pub3',
    slug: 'shacl-validation-industrial-ontologies-2024',
    title: 'Применение SHACL для валидации онтологических моделей в промышленности',
    year: 2024,
    venue: 'Вестник компьютерных и информационных технологий',
    type: 'article',
    authors: [
      { name: 'Александров А.А.', personId: null },
      { name: 'Борисов Б.Б.', personId: null }
    ],
    orgs: [],
    tags: ['SHACL', 'валидация', 'промышленность', 'качество данных'],
    has_pdf: true,
    links: {
      pdf: '/papers/shacl-validation-2024.pdf',
      doi: 'https://doi.org/10.1234/example3',
      url: null
    },
    abstract: 'Практические аспекты применения языка SHACL для валидации качества онтологических моделей в промышленных системах.',
    attachments: [],
    featured: false,
    badges: ['peer-reviewed', 'wos']
  },
  {
    id: 'pub4',
    slug: 'automatic-knowledge-extraction-tech-docs-2024',
    title: 'Автоматическое извлечение знаний из технической документации',
    year: 2024,
    venue: 'Конференция "Искусственный интеллект и анализ данных"',
    type: 'conference',
    authors: [
      { name: 'Волков В.В.', personId: null },
      { name: 'Горшков Г.Г.', personId: null },
      { name: 'Дмитриев Д.Д.', personId: null }
    ],
    orgs: [],
    tags: ['извлечение знаний', 'техническая документация', 'NLP'],
    has_pdf: false,
    links: {
      pdf: null,
      doi: 'https://doi.org/10.1234/example4',
      url: 'https://conf-ai-2024.ru/papers/42'
    },
    abstract: 'Методы автоматического извлечения структурированных знаний из технической документации с использованием NLP.',
    attachments: [],
    featured: false,
    badges: ['best-paper']
  },
  {
    id: 'pub5',
    slug: 'semantic-integration-heterogeneous-data-2023',
    title: 'Семантическая интеграция разнородных источников данных',
    year: 2023,
    venue: 'Программирование',
    type: 'article',
    authors: [
      { name: 'Егоров Е.Е.', personId: null }
    ],
    orgs: [],
    tags: ['семантическая интеграция', 'разнородные данные', 'ETL'],
    has_pdf: true,
    links: {
      pdf: '/papers/semantic-integration-2023.pdf',
      doi: null,
      url: null
    },
    abstract: 'Подходы к семантической интеграции разнородных источников данных в едином информационном пространстве.',
    attachments: [],
    featured: false,
    badges: ['peer-reviewed', 'scopus', 'rinc']
  },
  {
    id: 'pub6',
    slug: 'knowledge-graphs-technical-systems-2023',
    title: 'Методы построения графов знаний для технических систем',
    year: 2023,
    venue: 'Тезисы докладов международной конференции по ИИ',
    type: 'thesis',
    authors: [
      { name: 'Жуков Ж.Ж.', personId: null },
      { name: 'Зайцев З.З.', personId: null }
    ],
    orgs: [],
    tags: ['графы знаний', 'технические системы', 'методология'],
    has_pdf: false,
    links: {
      pdf: null,
      doi: 'https://doi.org/10.1234/example6',
      url: null
    },
    abstract: 'Обзор методов построения графов знаний для представления технических систем и их компонентов.',
    attachments: [],
    featured: false,
    badges: []
  },
  {
    id: 'pub7',
    slug: 'sparql-optimization-large-knowledge-graphs-2023',
    title: 'Оптимизация SPARQL-запросов в больших графах знаний',
    year: 2023,
    venue: 'arXiv preprint',
    type: 'preprint',
    authors: [
      { name: 'Иванов И.И.', personId: null }
    ],
    orgs: [],
    tags: ['SPARQL', 'оптимизация', 'большие данные', 'производительность'],
    has_pdf: true,
    links: {
      pdf: '/papers/sparql-optimization-2023.pdf',
      doi: null,
      url: 'https://arxiv.org/abs/2023.12345'
    },
    abstract: 'Алгоритмы оптимизации SPARQL-запросов для эффективной работы с большими графами знаний.',
    attachments: [],
    featured: false,
    badges: []
  },
  {
    id: 'pub8',
    slug: 'machine-learning-ontology-enrichment-2022',
    title: 'Машинное обучение для автоматического пополнения онтологий',
    year: 2022,
    venue: 'Искусственный интеллект и принятие решений',
    type: 'article',
    authors: [
      { name: 'Калинин К.К.', personId: null },
      { name: 'Лебедев Л.Л.', personId: null }
    ],
    orgs: [],
    tags: ['машинное обучение', 'онтологии', 'автоматизация', 'пополнение знаний'],
    has_pdf: false,
    links: {
      pdf: null,
      doi: 'https://doi.org/10.1234/example8',
      url: null
    },
    abstract: 'Применение методов машинного обучения для автоматического обогащения и пополнения онтологий.',
    attachments: [],
    featured: false,
    badges: ['peer-reviewed', 'rinc']
  },
  {
    id: 'pub9',
    slug: 'rdf-manufacturing-processes-2022',
    title: 'Применение RDF для моделирования производственных процессов',
    year: 2022,
    venue: 'Конференция "Семантические технологии в промышленности"',
    type: 'conference',
    authors: [
      { name: 'Михайлов М.М.', personId: null },
      { name: 'Николаев Н.Н.', personId: null },
      { name: 'Орлов О.О.', personId: null }
    ],
    orgs: [],
    tags: ['RDF', 'производственные процессы', 'моделирование', 'индустрия'],
    has_pdf: true,
    links: {
      pdf: '/papers/rdf-manufacturing-2022.pdf',
      doi: 'https://doi.org/10.1234/example9',
      url: null
    },
    abstract: 'Использование RDF для создания семантических моделей производственных процессов в промышленности.',
    attachments: [],
    featured: false,
    badges: ['indexed']
  },
  {
    id: 'pub10',
    slug: 'formal-verification-ontologies-description-logic-2022',
    title: 'Формальная верификация онтологий с использованием логики описаний',
    year: 2022,
    venue: 'Формальные методы в программировании',
    type: 'article',
    authors: [
      { name: 'Павлов П.П.', personId: null }
    ],
    orgs: [],
    tags: ['верификация', 'логика описаний', 'формальные методы', 'онтологии'],
    has_pdf: true,
    links: {
      pdf: '/papers/formal-verification-2022.pdf',
      doi: 'https://doi.org/10.1234/example10',
      url: null
    },
    abstract: 'Методы формальной верификации онтологий с использованием аппарата логики описаний.',
    attachments: [],
    featured: false,
    badges: ['peer-reviewed', 'wos']
  },
  {
    id: 'pub11',
    slug: 'structured-data-extraction-pdf-2021',
    title: 'Методы извлечения структурированных данных из PDF-документов',
    year: 2021,
    venue: 'Обработка изображений и анализ документов',
    type: 'article',
    authors: [
      { name: 'Романов Р.Р.', personId: null },
      { name: 'Степанов С.С.', personId: null }
    ],
    orgs: [],
    tags: ['извлечение данных', 'PDF', 'структурирование', 'OCR'],
    has_pdf: true,
    links: {
      pdf: '/papers/pdf-extraction-2021.pdf',
      doi: null,
      url: null
    },
    abstract: 'Современные методы извлечения структурированных данных из PDF-документов с использованием OCR и ML.',
    attachments: [],
    featured: false,
    badges: ['peer-reviewed']
  },
  {
    id: 'pub12',
    slug: 'graph-databases-efficiency-ontology-storage-2021',
    title: 'Анализ эффективности графовых баз данных для хранения онтологий',
    year: 2021,
    venue: 'Базы данных и информационные системы',
    type: 'article',
    authors: [
      { name: 'Тихонов Т.Т.', personId: null },
      { name: 'Ушаков У.У.', personId: null },
      { name: 'Федоров Ф.Ф.', personId: null }
    ],
    orgs: [],
    tags: ['графовые БД', 'производительность', 'хранение данных', 'сравнительный анализ'],
    has_pdf: false,
    links: {
      pdf: null,
      doi: 'https://doi.org/10.1234/example12',
      url: null
    },
    abstract: 'Сравнительный анализ эффективности различных графовых баз данных для хранения онтологических моделей.',
    attachments: [],
    featured: false,
    badges: ['peer-reviewed', 'rinc']
  }
]


