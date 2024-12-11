// Objeto con todos los códigos de error de PostgreSQL
const PG_ERRORS = {
  // Clase 00 — Completado exitosamente
  '00000': {
    type: 'SUCCESS',
    message: 'Operación completada exitosamente'
  },

  // Clase 01 — Advertencia
  '01000': {
    type: 'WARNING',
    message: 'Advertencia general'
  },

  // Clase 02 — Sin datos
  '02000': {
    type: 'NO_DATA',
    message: 'No hay datos disponibles'
  },

  // Clase 03 — Declaración SQL incompleta
  '03000': {
    type: 'SQL_STATEMENT_NOT_YET_COMPLETE',
    message: 'Declaración SQL incompleta'
  },

  // Clase 08 — Errores de conexión
  '08000': {
    type: 'CONNECTION_EXCEPTION',
    message: 'Error de conexión general'
  },
  '08003': {
    type: 'CONNECTION_DOES_NOT_EXIST',
    message: 'La conexión no existe'
  },
  '08006': {
    type: 'CONNECTION_FAILURE',
    message: 'Fallo de conexión'
  },

  // Clase 22 — Errores de datos
  22000: {
    type: 'DATA_EXCEPTION',
    message: 'Error en los datos ingresados'
  },
  22001: {
    type: 'STRING_DATA_RIGHT_TRUNCATION',
    message: 'Cadena de texto demasiado larga'
  },
  22012: {
    type: 'DIVISION_BY_ZERO',
    message: 'División por cero'
  },

  // Clase 23 — Violación de restricción de integridad
  23000: {
    type: 'INTEGRITY_CONSTRAINT_VIOLATION',
    message: 'Violación de restricción de integridad'
  },
  23503: {
    type: 'FOREIGN_KEY_VIOLATION',
    message: 'Violación de clave foránea'
  },
  23505: {
    type: 'UNIQUE_VIOLATION',
    message: 'Violación de restricción única'
  },
  23514: {
    type: 'CHECK_VIOLATION',
    message: 'Violación de restricción check'
  },

  // Clase 42 — Error de sintaxis
  42601: {
    type: 'SYNTAX_ERROR',
    message: 'Error de sintaxis'
  },
  '42P01': {
    type: 'UNDEFINED_TABLE',
    message: 'La tabla no existe'
  },
  '42P02': {
    type: 'UNDEFINED_PARAMETER',
    message: 'Parámetro no definido'
  },
  42703: {
    type: 'UNDEFINED_COLUMN',
    message: 'Columna indefinida'
  }
}

// Función para obtener el error por código
const getErrorById = (errorCode) => {
  return (
    PG_ERRORS[errorCode] || {
      type: 'UNKNOWN_ERROR',
      message: 'Error desconocido'
    }
  )
}

// Ejemplo de uso:
const handleDatabaseError = (error) => {
  const errorInfo = getErrorById(error.code)
  return {
    type: errorInfo.type,
    message: errorInfo.message,
    details: error.detail || '',
    table: error.table || '',
    constraint: error.constraint || '',
    originalError: error
  }
}

module.exports = { PG_ERRORS, getErrorById, handleDatabaseError }
