const express = require('express')
const UsersServices = require('../services/users.service')
const { createUserSchema } = require('../schemas/user.schema')
const validateSchema = require('../middlewares/validations/validationHandler')

const router = express.Router()

/**
 * @swagger
 * /api/users/:
 *   post:
 *     summary: Crear un usuario
 *     description: Crea un nuevo usuario en el sistema con el nombre de usuario, correo electrónico y contraseña proporcionados.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nombre de usuario único.
 *                 example: johndoe
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Correo electrónico válido.
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Contraseña del usuario.
 *                 example: mysecurepassword123
 *     responses:
 *       200:
 *         description: Usuario creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuario johndoe creado
 *       400:
 *         description: Error en los datos enviados.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Los datos enviados son inválidos."
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error al crear el usuario."
 */
router.post('/', createUserSchema, validateSchema, async (req, res) => {
  const { username, email, password } = req.body
  try {
    const result = await UsersServices.createUser({ username, email, password })
    if (result) {
      res.json({ message: `Usuario ${username} creado` })
    }
  } catch (error) {
    res.json({ message: error.detail || error.message })
  }
})

module.exports = router
