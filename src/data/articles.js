// Unified articles list: existing demo papers + CMS publications
// Model union: { id, title, authors[], venue|journal, year, doi?, url?, abstract?, keywords[], metrics?, pdf?, figures?, standards? }

import { publications as cmsPublications } from './publications.js'

const baseArticles = [
  {
    id: 'art-1',
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
    id: 'art-2',
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
    id: 'art-3',
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
    id: 'art-4',
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
    id: 'art-5',
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
    id: 'art-6',
    title: 'SPARQL queries for operational data analysis',
    authors: ['Волков С.Н.', 'Miller P.', 'Chen H.'],
    journal: 'ACM Transactions on Database Systems',
    year: 2021,
    doi: '10.1145/123456.789012',
    url: 'https://dl.acm.org/doi/10.1145/123456.789012',
    abstract: 'We investigate the use of SPARQL queries for analyzing operational data in oil and gas facilities. The approach provides flexible and powerful data exploration capabilities.',
    keywords: ['SPARQL', 'анализ данных', 'операционные данные', 'запросы'],
    metrics: { citations: 25, impactFactor: 3.8 }
  }
]

export const articles = [
  ...baseArticles,
  ...cmsPublications.map((p, idx) => ({
    id: p.id,
    title: p.title,
    authors: p.authors || [],
    journal: p.venue,
    year: p.year,
    doi: '',
    url: '#',
    abstract: p.abstract,
    keywords: p.keywords || [],
    metrics: { citations: 0, impactFactor: 0 },
    pdf: p.pdf || '',
    figures: p.figures || [],
    standards: p.standards || []
  }))
]


