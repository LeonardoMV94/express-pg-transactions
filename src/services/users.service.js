const bcrypt = require('bcrypt')
const pool = require("../lib/db");
class UsersServices {
    async createUser({username, email, password}){
        try {
        
            await pool.query("BEGIN");

            const newPassword = await bcrypt.hash(password, 10)           
      
            // crear usuario
            const createUserQuery = "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)";
            const createResult = await pool.query(createUserQuery, [username, email, newPassword]);
            if (createResult.rowCount === 0) throw new Error("No se creó la cuenta.");
        
            // Confirmar transacción
            await pool.query("COMMIT");
            return true;
          } catch (error) {
            // Revertir si algo falla
            await pool.query("ROLLBACK");
            console.log(`[PG] ERROR WITH ROLLBACK: ${error}`)
            return false;
          }
    }


}

module.exports = new UsersServices()