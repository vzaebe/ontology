// Vacancy model per spec
// Vacancy: {id, title, role_type, stack[], tasks[], requirements[], nice_to_have[], test_task, contact}

export const vacancies = [
  {
    id: 'vac-ont-engineer',
    title: 'Инженер-онтолог',
    role_type: 'ontology-engineer',
    stack: ['OWL 2 DL', 'Protégé', 'SPARQL'],
    tasks: ['Моделирование домена', 'Проектирование таксономий и отношений', 'Выравнивание терминов'],
    requirements: ['Практика OWL 2 DL', 'Опыт моделирования предметных областей', 'Понимание верхнеуровневых онтологий (BFO)'],
    nice_to_have: ['Опыт модульных онтологий', 'Опыт публикаций'],
    test_task: 'Смоделировать небольшой домен и обосновать модель в OWL.',
    contact: 'hr@ontology.ru'
  },
  {
    id: 'vac-ingestion',
    title: 'Инженер по загрузке и нормализации данных',
    role_type: 'parser-engineer',
    stack: ['Python', 'RDFLib', 'ETL'],
    tasks: ['Извлечение сущностей/связей из источников', 'Нормализация в RDF/OWL'],
    requirements: ['Python', 'RDFLib', 'Опыт разбора структурированных данных'],
    nice_to_have: ['Опыт визуализации графов'],
    test_task: 'Преобразовать небольшой набор данных в RDF/TTL.',
    contact: 'hr@ontology.ru'
  },
  {
    id: 'vac-generators',
    title: 'Разработчик генераторов артефактов',
    role_type: 'dev-tools',
    stack: ['Python', 'SPARQL'],
    tasks: ['Генерация артефактов и отчётов из онтологии/шаблонов'],
    requirements: ['Шаблонизация', 'SPARQL', 'Инжиниринг ПО'],
    nice_to_have: ['Опыт CI/CD'],
    test_task: 'Сгенерировать простой отчёт по онтологии.',
    contact: 'hr@ontology.ru'
  },
  {
    id: 'vac-frontend-graphs',
    title: 'Frontend (визуал графов/запросов)',
    role_type: 'frontend',
    stack: ['Vue', 'SPARQL'],
    tasks: ['Просмотр графов OWL', 'Фильтры', 'SPARQL-вью'],
    requirements: ['Vue 3', 'D3/Graph libs'],
    nice_to_have: ['Опыт с тройничными хранилищами'],
    test_task: 'Собрать просмотр графа и простой SPARQL UI на демо-OWL.',
    contact: 'hr@ontology.ru'
  }
]


