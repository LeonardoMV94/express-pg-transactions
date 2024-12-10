const express = require("express");
const cors = require('cors')
const { loggerRequest } = require("./logger.mid");

const middlewares = (app) => {
  app.use(express.json());
  app.use(cors());
  app.use(loggerRequest);
};

module.exports = middlewares;
