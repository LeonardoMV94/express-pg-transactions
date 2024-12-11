const swaggerUi = require('swagger-ui-express');

const swaggerMiddleware = (req, res, next) => {
  console.log(`Solicitud entrante: ${req.method} ${req.url}`);
  next();
};

module.exports = {
  swaggerMiddleware,
};
