const express = require('express')
const ServiceTransfer = require('../services/transfer.service')
const validateSchema = require('../middlewares/validations/validationHandler')
const { transferSchema } = require('../schemas/transfer.schema')
const router = express.Router()

/**
 * @swagger
 * /api/transfers/:
 *   post:
 *     summary: Realizar una transferencia
 *     description: Realiza una transferencia entre dos cuentas, actualizando los balances de origen y destino.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               accountOrigin:
 *                 type: string
 *                 description: Cuenta de origen desde donde se transferirán los fondos.
 *                 example: "123456789"
 *               accountDestiny:
 *                 type: string
 *                 description: Cuenta de destino a donde se transferirán los fondos.
 *                 example: "987654321"
 *               amount:
 *                 type: number
 *                 description: Monto a transferir.
 *                 example: 1000.50
 *     responses:
 *       200:
 *         description: Transferencia exitosa.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Transferencia exitosa."
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
router.post('/', transferSchema, validateSchema, async (req, res) => {
  const { accountOrigin, accountDestiny, amount } = req.body

  try {
    const result = await ServiceTransfer.updateBalance({
      accountOrigin,
      accountDestiny,
      amount
    })
    if (result) {
      res.status(200).json({ message: 'Transferencia exitosa.' })
    }
  } catch (error) {
    res.status(500).json({ message: error.detail || error.message })
  }
})

/**
 * @swagger
 * /api/transfers//check-balance/{account_number}:
 *   get:
 *     summary: Verificar balance de cuenta
 *     description: Obtiene el balance de una cuenta específica basado en su número.
 *     parameters:
 *       - in: path
 *         name: account_number
 *         required: true
 *         schema:
 *           type: string
 *         description: Número de la cuenta cuyo balance se desea verificar.
 *         example: "123456789"
 *     responses:
 *       200:
 *         description: Balance de la cuenta obtenido exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 balance:
 *                   type: number
 *                   description: Balance actual de la cuenta.
 *                   example: 1500.75
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
router.get('/check-balance/:account_number', async (req, res) => {
  const account_number = req.params.account_number

  try {
    const result = await ServiceTransfer.checkAmmoutBalance({ account_number })
    if (result) {
      res.status(200).json({ balance: result })
    }
  } catch (error) {
    res.status(500).json({ message: error.detail || error.message })
  }
})

module.exports = router
