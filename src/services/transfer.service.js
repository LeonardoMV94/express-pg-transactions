const pool = require('../lib/db')
class TransferService {
  async checkAmmoutBalance ({ account_number }) {
    try {
      // 2. Descontar dinero de la cuenta origen
      const debitQuery = 'SELECT balance FROM accounts WHERE account_number = $1'
      const debitResult = await pool.query(debitQuery, [account_number])
      // console.log(JSON.stringify(debitResult))
      if (debitResult.rowCount === 0) throw new Error('Cuenta no encontrada.')

      return debitResult.rows[0].balance
    } catch (error) {
      // 5. Revertir si algo falla
      await pool.query('ROLLBACK')
      console.log(`[PG] ERROR WITH ROLLBACK: ${JSON.stringify(error)}`)
      throw error
    }
  }

  async updateBalance ({ accountOrigin, accountDestiny, amount }) {
    try {
      // 1. Inicia la transacción
      await pool.query('BEGIN')

      // validar balance de cuenta de origen
      const balanceOrigen = await this.checkAmmoutBalance({ account_number: accountOrigin })
      console.log(`monto: ${balanceOrigen} ${(balanceOrigen - amount) < 0}`)
      if ((balanceOrigen - amount) < 0) throw new Error('No hay plata señores.')

      // 2. Descontar dinero de la cuenta origen
      const debitQuery = 'UPDATE accounts SET balance = balance - $1 WHERE account_number = $2'
      const debitResult = await pool.query(debitQuery, [amount, accountOrigin])
      if (debitResult.rowCount === 0) throw new Error('Cuenta de origen no encontrada.')

      // 3. Agregar dinero a la cuenta destino
      const creditQuery = 'UPDATE accounts SET balance = balance + $1 WHERE account_number = $2'
      const creditResult = await pool.query(creditQuery, [amount, accountDestiny])
      if (creditResult.rowCount === 0) throw new Error('Cuenta de destino no encontrada.')

      // 4. Confirmar transacción
      await pool.query('COMMIT')
      return true
    } catch (error) {
      // 5. Revertir si algo falla
      await pool.query('ROLLBACK')
      console.log(`[PG] ERROR WITH ROLLBACK: ${JSON.stringify(error)}`)
      throw error
    }
  }
}

module.exports = new TransferService()
