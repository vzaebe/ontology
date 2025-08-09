// Universal Link model for Resources section
// Model: Link {id, label, category{tool/standard/paper/dataset/demo}, link, source}

export const links = [
  { id: 'lnk-protege', label: 'Protégé', category: 'tool', link: 'https://protege.stanford.edu/', source: 'official' },
  { id: 'lnk-owlready', label: 'owlready', category: 'tool', link: 'https://pypi.org/project/owlready2/', source: 'official' },
  { id: 'lnk-rdflib', label: 'rdflib', category: 'tool', link: 'https://rdflib.readthedocs.io/', source: 'official' },
  { id: 'lnk-w3c-tr', label: 'W3C TR', category: 'tool', link: 'https://www.w3.org/TR/', source: 'official' },
  { id: 'lnk-gost-21838-1-2021', label: 'ГОСТ Р ИСО/МЭК 21838-1-2021', category: 'standard', link: '', source: 'official' },
  { id: 'lnk-gost-59798-2021', label: 'ГОСТ Р 59798-2021', category: 'standard', link: '', source: 'official' },
  { id: 'lnk-gost-15926-2-2010', label: 'ГОСТ Р ИСО 15926-2-2010', category: 'standard', link: '', source: 'official' },
  { id: 'lnk-demo-owl', label: 'Демо OWL-модель', category: 'demo', link: '#', source: 'internal' }
]


