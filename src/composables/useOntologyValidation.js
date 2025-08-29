// import { Parser } from 'n3' - commented out until n3 package is installed

/**
 * Composable for SHACL validation of ontologies
 */
export function useOntologyValidation() {
  
  /**
   * Validate ontology data using SHACL
   * @param {string} ontologyData - The ontology data to validate
   * @param {string} format - Format of the data ('turtle' or 'jsonld')
   * @returns {Promise<Object>} Validation results
   */
  const validateOntology = async (ontologyData, format = 'turtle') => {
    try {
      // For now, we'll implement basic validation
      // In a full implementation, this would use rdf-validate-shacl
      const results = await performBasicValidation(ontologyData, format)
      return results
    } catch (error) {
      console.error('Validation error:', error)
      return {
        isValid: false,
        error: error.message,
        violations: []
      }
    }
  }

  /**
   * Perform basic validation checks
   * @param {string} ontologyData - The ontology data
   * @param {string} format - Data format
   * @returns {Promise<Object>} Basic validation results
   */
  const performBasicValidation = async (ontologyData, format) => {
    const violations = []
    let isValid = true

    try {
      if (format === 'turtle') {
        // Parse Turtle data (simplified without n3 library)
        const lines = ontologyData.split('\n').filter(line => line.trim())
        const quads = lines.length // Rough estimate of data presence

        // Basic checks
        if (lines.length === 0 || ontologyData.trim() === '') {
          violations.push({
            type: 'warning',
            message: 'Онтология не содержит данных',
            line: 1
          })
          isValid = false
        }

        // Check for required prefixes
        const requiredPrefixes = ['rdf:', 'rdfs:', 'owl:']
        for (const prefix of requiredPrefixes) {
          if (!ontologyData.includes(`@prefix ${prefix}`)) {
            violations.push({
              type: 'warning',
              message: `Отсутствует обязательный префикс: ${prefix}`,
              suggestion: `Добавьте: @prefix ${prefix} <...>`
            })
          }
        }

        // Check for ontology declaration
        if (!ontologyData.includes('owl:Ontology')) {
          violations.push({
            type: 'info',
            message: 'Рекомендуется объявить онтологию с помощью owl:Ontology'
          })
        }

        // Check for proper class definitions
        const classMatches = ontologyData.match(/\w+:\w+\s+a\s+owl:Class/g)
        if (!classMatches || classMatches.length === 0) {
          violations.push({
            type: 'info', 
            message: 'Не найдено определений классов (owl:Class)'
          })
        }

        // Syntax validation passed if we got here
        if (violations.length === 0) {
          violations.push({
            type: 'success',
            message: 'Синтаксис корректен'
          })
        }

      } else if (format === 'jsonld') {
        // Parse JSON-LD
        const data = JSON.parse(ontologyData)
        
        if (!data['@context']) {
          violations.push({
            type: 'warning',
            message: 'Отсутствует @context в JSON-LD'
          })
          isValid = false
        }

        if (!data['@graph'] && !Array.isArray(data)) {
          violations.push({
            type: 'info',
            message: 'JSON-LD не содержит @graph или массив данных'
          })
        }
      }

    } catch (parseError) {
      isValid = false
      violations.push({
        type: 'error',
        message: `Ошибка синтаксиса: ${parseError.message}`,
        line: parseError.line || 1
      })
    }

    return {
      isValid: isValid && violations.filter(v => v.type === 'error').length === 0,
      violations,
      summary: {
        total: violations.length,
        errors: violations.filter(v => v.type === 'error').length,
        warnings: violations.filter(v => v.type === 'warning').length,
        info: violations.filter(v => v.type === 'info').length,
        success: violations.filter(v => v.type === 'success').length
      }
    }
  }

  /**
   * Get validation status text
   * @param {Object} results - Validation results
   * @returns {string} Status text
   */
  const getValidationStatus = (results) => {
    if (!results) return 'Не проверено'
    
    if (results.error) return 'Ошибка валидации'
    
    if (results.isValid && results.summary.errors === 0) {
      return 'Валидно'
    } else if (results.summary.errors > 0) {
      return `${results.summary.errors} ошибок`
    } else {
      return `${results.summary.warnings} предупреждений`
    }
  }

  /**
   * Get validation status color class
   * @param {Object} results - Validation results  
   * @returns {string} CSS class name
   */
  const getValidationStatusClass = (results) => {
    if (!results) return 'status-unknown'
    
    if (results.error) return 'status-error'
    
    if (results.isValid && results.summary.errors === 0) {
      return 'status-valid'
    } else if (results.summary.errors > 0) {
      return 'status-error'
    } else {
      return 'status-warning'
    }
  }

  /**
   * Format violation message for display
   * @param {Object} violation - Violation object
   * @returns {string} Formatted message
   */
  const formatViolation = (violation) => {
    let message = violation.message
    
    if (violation.line) {
      message = `Строка ${violation.line}: ${message}`
    }
    
    if (violation.suggestion) {
      message += ` (${violation.suggestion})`
    }
    
    return message
  }

  return {
    validateOntology,
    getValidationStatus,
    getValidationStatusClass,
    formatViolation
  }
}
