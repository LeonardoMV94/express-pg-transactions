const pool = require('../lib/db')

class ServiceAccount {
  async createAccount ({ account_number, username }) {
    try {
      // Inicia la transacción
      await pool.query('BEGIN')

      const user_id = await pool.query('SELECT * FROM users WHERE username like $1', [username])
      // console.log(JSON.stringify(user_id))
      if (user_id.rowCount === 0) throw new Error('Cuenta de usuario no existe')

      // Descontar dinero de la cuenta origen
      const createQuery = 'INSERT INTO accounts(account_number, user_id) VALUES ($1, $2);'
      const newAccount_number = account_number === undefined ? new Date().getTime() : account_number

      const debitResult = await pool.query(createQuery, [newAccount_number, user_id.rows[0].id])
      if (debitResult.rowCount === 0) throw new Error('Error al crear cuenta.')

      // Confirmar transacción
      await pool.query('COMMIT')
      return true
    } catch (error) {
      // Revertir si algo falla
      await pool.query('ROLLBACK')
      console.log(`[PG] ERROR WITH ROLLBACK: ${error}`)
      throw error
    }
  }
}

module.exports = new ServiceAccount()
