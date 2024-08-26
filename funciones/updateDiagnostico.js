import { connectToMySQL } from "../database/connection.js";

export async function update_Diagnostico(params) {

console.table(params)

    let connection;
    try {

        

        connection  = await  connectToMySQL();

        const [result] = await connection.execute(
            'UPDATE Orden SET observaciones = ?, estado = ? WHERE id = ?',
            [params.observaciones, 'Revisado',params.id]
        );

        if (result.affectedRows > 0) {  // Check if any rows were actually updated
            return true;
        } else {
            return false;
        }
        
    } catch (error) {
        console.error("Problemas en la actualización:", error);
        throw error;
        
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}