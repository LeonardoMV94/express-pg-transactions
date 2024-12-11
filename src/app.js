const express = require('express')
const routes = require('./routers/router')
const middlewares = require('./middlewares/index')
const config = require('./config')

const app = express()
const port = config.port

middlewares(app)
routes(app)

app.listen(port, () => {
  console.log(`Server in http://localhost:${port}`)
  console.log(`Documentation in http://localhost:${port}/docs`)
})
