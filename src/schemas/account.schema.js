const { body } = require('express-validator')

const createAccountSchema = [
  body('username', 'debe ingresar un username').notEmpty(),
  body('account_number', 'debe ingresar un account_number').isNumeric()
]

module.exports = {
  createAccountSchema
}
