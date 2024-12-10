const express = require("express");
const UsersServices = require("../services/users.service");

const router = express.Router();

router.post("/", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const result = await UsersServices.createUser({ username, email, password });
    if (!result) {
      throw new Error(`Error al crear usuario`);
    }
    res.json({ message: `Usuario ${username} creado` });
  } catch (error) {
    res.json({ message: error.message });
  }
});

module.exports = router;
