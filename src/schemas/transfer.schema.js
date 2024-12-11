const { body } = require('express-validator')

const transferSchema = [
  body('accountOrigin', 'debe ingresar un accountOrigin').notEmpty().isString().trim(),
  body('accountDestiny', 'debe ingresar un accountDestiny').notEmpty().isEmail(),
  body('amount', 'debe ingresar un amount').isFloat()
]

module.exports = {
  transferSchema
}
