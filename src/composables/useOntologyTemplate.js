/**
 * Composable for managing ontology templates and default data
 */
export function useOntologyTemplate() {
  // Default prefixes according to specification
  const defaultPrefixes = `@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix owl: <http://www.w3.org/2002/07/owl#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
@prefix skos: <http://www.semanticweb.org/skos/core#> .
@prefix sh: <http://www.w3.org/ns/shacl#> .
@prefix ex: <http://example.org/ontology#> .

`

  // Default ontology template according to specification
  const defaultTemplate = `${defaultPrefixes}
# Ontology Declaration
ex: a owl:Ontology ;
    rdfs:label "Equipment Ontology Demo"@en ;
    rdfs:comment "Demo ontology for equipment management"@en .

# Classes
ex:Equipment a owl:Class ;
    rdfs:label "Equipment"@en ;
    rdfs:comment "Base class for all equipment"@en .

ex:Valve a owl:Class ;
    rdfs:subClassOf ex:Equipment ;
    rdfs:label "Valve"@en ;
    rdfs:comment "A valve for controlling flow"@en .

ex:Document a owl:Class ;
    rdfs:label "Document"@en ;
    rdfs:comment "Documentation related to equipment"@en .

ex:Requirement a owl:Class ;
    rdfs:label "Requirement"@en ;
    rdfs:comment "Requirements for equipment"@en .

# Properties
ex:controls a owl:ObjectProperty ;
    rdfs:label "controls"@en ;
    rdfs:domain ex:Equipment ;
    rdfs:range ex:Equipment ;
    rdfs:comment "One piece of equipment controls another"@en .

ex:hasDocument a owl:ObjectProperty ;
    rdfs:label "has document"@en ;
    rdfs:domain ex:Equipment ;
    rdfs:range ex:Document ;
    rdfs:comment "Equipment has associated documentation"@en .

ex:hasTag a owl:DatatypeProperty ;
    rdfs:label "has tag"@en ;
    rdfs:domain ex:Equipment ;
    rdfs:range xsd:string ;
    rdfs:comment "Equipment identifier tag"@en .

# Sample Individuals
ex:MainValve a ex:Valve ;
    rdfs:label "Main Control Valve"@en ;
    ex:hasTag "V-001" .

ex:PumpA a ex:Equipment ;
    rdfs:label "Primary Pump A"@en ;
    ex:hasTag "P-001" ;
    ex:controls ex:MainValve .

ex:MaintenanceDoc a ex:Document ;
    rdfs:label "Maintenance Manual"@en .

ex:MainValve ex:hasDocument ex:MaintenanceDoc .

# SHACL Shapes for Validation
ex:ValveShape a sh:NodeShape ;
    sh:targetClass ex:Valve ;
    sh:property [
        sh:path ex:hasTag ;
        sh:datatype xsd:string ;
        sh:minCount 1 ;
        sh:minLength 1 ;
        rdfs:label "Valve must have a tag"@en
    ] .

ex:DocumentShape a sh:NodeShape ;
    sh:targetClass ex:Equipment ;
    sh:property [
        sh:path ex:hasDocument ;
        sh:class ex:Document ;
        rdfs:label "Document must be of type Document"@en
    ] .
`

  // JSON-LD version of the template
  const defaultTemplateJsonLD = {
    "@context": {
      "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
      "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
      "owl": "http://www.w3.org/2002/07/owl#",
      "xsd": "http://www.w3.org/2001/XMLSchema#",
      "skos": "http://www.semanticweb.org/skos/core#",
      "sh": "http://www.w3.org/ns/shacl#",
      "ex": "http://example.org/ontology#"
    },
    "@graph": [
      {
        "@id": "ex:",
        "@type": "owl:Ontology",
        "rdfs:label": "Equipment Ontology Demo",
        "rdfs:comment": "Demo ontology for equipment management"
      },
      {
        "@id": "ex:Equipment",
        "@type": "owl:Class",
        "rdfs:label": "Equipment",
        "rdfs:comment": "Base class for all equipment"
      },
      {
        "@id": "ex:Valve",
        "@type": "owl:Class",
        "rdfs:subClassOf": { "@id": "ex:Equipment" },
        "rdfs:label": "Valve",
        "rdfs:comment": "A valve for controlling flow"
      },
      {
        "@id": "ex:Document",
        "@type": "owl:Class", 
        "rdfs:label": "Document",
        "rdfs:comment": "Documentation related to equipment"
      },
      {
        "@id": "ex:Requirement",
        "@type": "owl:Class",
        "rdfs:label": "Requirement", 
        "rdfs:comment": "Requirements for equipment"
      },
      {
        "@id": "ex:controls",
        "@type": "owl:ObjectProperty",
        "rdfs:label": "controls",
        "rdfs:domain": { "@id": "ex:Equipment" },
        "rdfs:range": { "@id": "ex:Equipment" },
        "rdfs:comment": "One piece of equipment controls another"
      },
      {
        "@id": "ex:hasDocument", 
        "@type": "owl:ObjectProperty",
        "rdfs:label": "has document",
        "rdfs:domain": { "@id": "ex:Equipment" },
        "rdfs:range": { "@id": "ex:Document" },
        "rdfs:comment": "Equipment has associated documentation"
      },
      {
        "@id": "ex:hasTag",
        "@type": "owl:DatatypeProperty", 
        "rdfs:label": "has tag",
        "rdfs:domain": { "@id": "ex:Equipment" },
        "rdfs:range": { "@id": "xsd:string" },
        "rdfs:comment": "Equipment identifier tag"
      },
      {
        "@id": "ex:MainValve",
        "@type": "ex:Valve",
        "rdfs:label": "Main Control Valve",
        "ex:hasTag": "V-001"
      },
      {
        "@id": "ex:PumpA",
        "@type": "ex:Equipment", 
        "rdfs:label": "Primary Pump A",
        "ex:hasTag": "P-001",
        "ex:controls": { "@id": "ex:MainValve" }
      },
      {
        "@id": "ex:MaintenanceDoc",
        "@type": "ex:Document",
        "rdfs:label": "Maintenance Manual"
      }
    ]
  }

  // Preset SPARQL queries according to specification
  const presetQueries = [
    {
      name: "Классы и количество индивидов",
      query: `SELECT ?class (COUNT(?individual) as ?count) WHERE {
  ?class a owl:Class .
  OPTIONAL { ?individual a ?class }
} GROUP BY ?class ORDER BY DESC(?count)`
    },
    {
      name: "Все требования, связанные с оборудованием", 
      query: `SELECT ?equipment ?requirement WHERE {
  ?equipment a ex:Equipment .
  ?equipment ?property ?requirement .
  ?requirement a ex:Requirement .
}`
    },
    {
      name: "Трассировка документ → объект",
      query: `SELECT ?document ?equipment ?tag WHERE {
  ?equipment ex:hasDocument ?document .
  ?equipment ex:hasTag ?tag .
  ?document a ex:Document .
} ORDER BY ?document`
    }
  ]

  /**
   * Get the default ontology template
   * @param {string} format - 'turtle' or 'jsonld'
   * @returns {string} Template content
   */
  const getDefaultTemplate = (format = 'turtle') => {
    if (format === 'jsonld') {
      return JSON.stringify(defaultTemplateJsonLD, null, 2)
    }
    return defaultTemplate
  }

  /**
   * Reset ontology to default template
   * @param {string} format - 'turtle' or 'jsonld'  
   * @returns {string} Template content
   */
  const resetToTemplate = (format = 'turtle') => {
    return getDefaultTemplate(format)
  }

  /**
   * Get preset SPARQL queries
   * @returns {Array} Array of query objects
   */
  const getPresetQueries = () => {
    return presetQueries
  }

  /**
   * Get default prefixes
   * @returns {string} Prefix declarations
   */
  const getDefaultPrefixes = () => {
    return defaultPrefixes
  }

  return {
    getDefaultTemplate,
    resetToTemplate,
    getPresetQueries,
    getDefaultPrefixes,
    defaultPrefixes,
    presetQueries
  }
}
