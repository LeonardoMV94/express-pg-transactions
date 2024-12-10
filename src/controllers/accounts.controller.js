const express = require("express");
const ServiceAccount = require("../services/accounts.service");

const router = express.Router();

router.post("/", async (req, res) => {
  const { account_number, username } = req.body;
  try {
    const result = await ServiceAccount.createAccount({
      account_number,
      username,
    });
    if (!result) throw new Error(`Error al crear cuenta`);
    res.status(200).json({ message: "Cuenta creada exitosamente." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
