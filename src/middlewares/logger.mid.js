const loggerRequest = (req, res, next) => {
  console.log(`Solicitud entrante: ${req.method} ${req.url}`)
  next()
}

module.exports = {
  loggerRequest
}
