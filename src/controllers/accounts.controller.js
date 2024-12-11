const express = require('express')
const ServiceAccount = require('../services/accounts.service')
const validateSchema = require('../middlewares/validations/validationHandler')
const { createAccountSchema } = require('../schemas/account.schema')

const router = express.Router()

/**
 * @swagger
 * /api/accounts/:
 *   post:
 *     summary: Crear una nueva cuenta
 *     description: Crea una cuenta asociada a un número de cuenta y un nombre de usuario.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               account_number:
 *                 type: string
 *                 description: Número único de la cuenta.
 *                 example: "123456789"
 *               username:
 *                 type: string
 *                 description: Nombre del usuario al que pertenece la cuenta.
 *                 example: "johndoe"
 *     responses:
 *       200:
 *         description: La cuenta fue creada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Cuenta creada exitosamente."
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Detalle del error."
 */
router.post('/', createAccountSchema, validateSchema, async (req, res) => {
  const { account_number, username } = req.body
  try {
    const result = await ServiceAccount.createAccount({
      account_number,
      username
    })
    if (result) {
      res.status(200).json({ message: 'Cuenta creada exitosamente.' })
    }
  } catch (error) {
    res.status(500).json({ message: error.detail || error.message })
  }
})

module.exports = router
