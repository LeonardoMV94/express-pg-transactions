const { body } = require('express-validator')

const createUserSchema = [
  body('username', 'debe ingresar un username').notEmpty().isString().trim(),
  body('email', 'debe ingresar un email').notEmpty().isEmail(),
  body('password', 'debe ingresar un password').isString().trim().isLength({ min: 8 })
]

module.exports = {
  createUserSchema
}
