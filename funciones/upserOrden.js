import { connectToMySQL } from '../database/connection.js'; // Asegúrate de que la ruta sea correcta

export async function upsertOrden(data) {

console.log("datos de la orden asdAS", data);

    let connection;

    try {
        connection = await connectToMySQL();

        // Primero, verifica si la orden existe
        const [rows] = await connection.execute(
            'SELECT 1 FROM ORDEN WHERE Id = ?',
            [data.id]
        );

        if (rows.length > 0) {
            // Si la orden existe, realiza un UPDATE
            await connection.execute(
                `UPDATE ORDEN SET cedulaCliente = ?, Articulo = ?, Accesorios = ?, Marca = ?, Modelo = ?, Descripcion = ?
                 WHERE Id = ?`,
                [data.cedulaCliente, data.articulo, data.accesorios, data.marca, data.modelo, data.descripcion, data.id]
            );
            console.log("Orden actualizada exitosamente.");
            return true;
        } else {
            // Si la orden no existe, realiza un INSERT
            await connection.execute(
                `INSERT INTO ORDEN (cedulaCliente, Articulo, Accesorios, Marca, Modelo, Descripcion, cedulaTecnico) VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [data.cedulaCliente, data.articulo, data.accesorios, data.marca, data.modelo, data.descripcion, data.cedulaTecnico]
            );
            console.log("Orden insertada exitosamente.");
            return true;
        }

    } catch (error) {
        console.error("Error en la operación:", error.message);
        return false;
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}
