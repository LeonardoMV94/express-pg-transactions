const express = require('express')
const cors = require('cors')
const { loggerRequest } = require('./logger.mid')
const swaggerUi = require('swagger-ui-express')
const swaggerSpecs = require('../lib/swagger.config')

const middlewares = (app) => {
  app.use(express.json())
  app.use(cors())
  app.use(loggerRequest)
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs))
}

module.exports = middlewares
