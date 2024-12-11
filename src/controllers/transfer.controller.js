const express = require("express");
const ServiceTransfer = require("../services/transfer.service");

const router = express.Router();

router.post("/", async (req, res) => {
  const { accountOrigin, accountDestiny, amount } = req.body;

  try {
    const result = await ServiceTransfer.updateBalance({
      accountOrigin,
      accountDestiny,
      amount,
    });
    if (result) {
      res.status(200).json({ message: "Transferencia exitosa." });
    }
  } catch (error) {
    res.status(500).json({ message: error.detail || error.message });
  }
});

router.get('/check-balance/:account_number', async(req, res) => {
  const account_number = req.params.account_number;

  try {
    const result = await ServiceTransfer.checkAmmoutBalance({account_number});
    if (result){
      res.status(200).json({ balance: result });
    }
  } catch (error) {
    res.status(500).json({ message: error.detail || error.message });
  }
})

module.exports = router;
