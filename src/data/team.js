// Team members and shared publications mapping
// Member model: { id, slug, name, title, role, email, phone, avatar, location, socials{}, interests[], skills[], joined, publications[], links[] }

export const team = [
  {
    id: 'm1',
    slug: 'ivanov-ap',
    name: 'Иванов Александр',
    title: 'Ведущий научный сотрудник',
    role: 'Team Lead',
    email: 'alexander@ontology.ru',
    phone: '+7 (495) 123-45-67',
    avatar: '',
    location: 'Москва, Россия',
    socials: {
      linkedin: 'https://linkedin.com/in/ivanov-ap',
      github: 'https://github.com/ivanov-ap',
      scholar: 'https://scholar.google.com/citations?user=ivanov'
    },
    interests: ['Онтологии', 'Графы знаний', 'Автоматизация'],
    skills: ['OWL', 'RDF', 'SPARQL', 'GraphDB', 'Python'],
    joined: '2021-03-15',
    publications: ['pub-aistep-2025-ont-asu', 'pub-eiks-2024-xml2owl'],
    links: [{ label: 'Лаборатория', url: '#' }]
  },
  {
    id: 'm2',
    slug: 'petrova-mv',
    name: 'Петрова Мария',
    title: 'Семантический архитектор',
    role: 'Architect',
    email: 'maria@ontology.ru',
    phone: '+7 (495) 222-22-22',
    avatar: '',
    location: 'Санкт-Петербург, Россия',
    socials: { linkedin: 'https://linkedin.com/in/petrova-mv' },
    interests: ['Семантический веб', 'Каталоги данных'],
    skills: ['RDFS', 'OWL API', 'Jena', 'Java'],
    joined: '2022-06-01',
    publications: ['pub-eiks-2024-xml2owl'],
    links: []
  },
  {
    id: 'm3',
    slug: 'sidorov-mk',
    name: 'Сидоров Михаил',
    title: 'Научный сотрудник',
    role: 'Researcher',
    email: 'mikhail@ontology.ru',
    phone: '+7 (495) 333-33-33',
    avatar: '',
    location: 'Москва, Россия',
    socials: { github: 'https://github.com/sidorov-mk' },
    interests: ['SPARQL', 'Интеграция данных'],
    skills: ['SPARQL', 'RDF4J', 'ETL'],
    joined: '2023-01-10',
    publications: [],
    links: []
  },
  {
    id: 'm4',
    slug: 'kozlov-da',
    name: 'Козлов Дмитрий',
    title: 'Доцент',
    role: 'Advisor',
    email: 'dmitry@ontology.ru',
    phone: '+7 (495) 444-44-44',
    avatar: '',
    location: 'Москва, Россия',
    socials: { scholar: 'https://scholar.google.com/citations?user=kozlov' },
    interests: ['Управление знаниями', 'Промышленная автоматизация'],
    skills: ['OWL', 'UML', 'BPMN'],
    joined: '2020-09-01',
    publications: [],
    links: []
  },
  {
    id: 'm5',
    slug: 'novikov-pv',
    name: 'Новиков Павел',
    title: 'Инженер-исследователь',
    role: 'Engineer',
    email: 'pavel@ontology.ru',
    phone: '+7 (495) 555-55-55',
    avatar: '',
    location: 'Москва, Россия',
    socials: {},
    interests: ['ЖЦ оборудования', 'RDF'],
    skills: ['Python', 'RDF', 'Neo4j'],
    joined: '2024-02-01',
    publications: [],
    links: []
  }
]


