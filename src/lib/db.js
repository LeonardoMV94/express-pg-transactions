const { Pool } = require('pg')
const config = require('../config')

const pool = new Pool({
  connectionString: config.databaseUrl,
  max: 20,
  connectionTimeoutMillis: 5000
})

pool.on('error', (error, client) => {
  console.log(`[PG] Error query : ${error}`)
})

pool.connect((err, connection) => {
  if (err) throw err
  console.log('Database is connected successfully !')
  connection.release()
})

module.exports = pool
