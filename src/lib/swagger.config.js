const path = require('node:path')
const swaggerJsDoc = require('swagger-jsdoc')
const config = require('../config')

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Transacciones bancarias',
      version: '1.0.0'
    },
    servers: [
      {
        url: `http://localhost:${config.port}`
      }
    ]
  },
  apis: [path.resolve(__dirname, '../controllers/*.js')]
}

const swaggerSpecs = swaggerJsDoc(swaggerOptions)

module.exports = swaggerSpecs
