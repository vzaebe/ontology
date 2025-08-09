// Versioned publications data for Science section and cross-page citations
// Model: Publication {id, title, year, venue, issue, pages, abstract, keywords[], pdf, figures[], standards[], authors[]}

export const publications = [
  {
    id: 'pub-aistep-2025-ont-asu',
    title: 'Онтологическое описание АСУТП',
    year: 2025,
    venue: 'Автоматизация и информатизация ТЭК',
    issue: '№ 1(618)',
    pages: '15–24',
    abstract: 'Практическое описание применения онтологий OWL 2 DL для машиночитаемой документации и подготовки к автоконфигурированию ПО в АСУ ТП.',
    keywords: ['OWL 2 DL', 'АСУ ТП', 'мультидоменная модель', 'фасеты сигналов', 'мереология'],
    pdf: '',
    figures: [],
    standards: ['std-gost-21838-1-2021', 'std-gost-59798-2021', 'std-gost-15926-2-2010'],
    authors: ['Шишенков М.А.', 'Чужинов Е.С.']
  },
  {
    id: 'pub-eiks-2024-xml2owl',
    title: 'Автоматизированная обработка инж.-техн. информации из схем…',
    year: 2024,
    venue: 'Электротехнические и информационные комплексы и системы',
    issue: '№ 4, т. 20',
    pages: '',
    abstract: 'Подход к преобразованию схем (*.xml: draw.io/E3/ModelStudio) в OWL-модель с использованием owlready/rdflib, визуализацией графа и последующим экспортом.',
    keywords: ['парсинг XML', 'OWL', 'rdflib', 'owlready', 'АСУ ТП'],
    pdf: '',
    figures: [],
    standards: ['std-gost-21838-1-2021'],
    authors: ['Шишенков М.А.']
  }
]


