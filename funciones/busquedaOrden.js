import { connectToMySQL } from '../database/connection.js'; // Asegúrate de que la ruta sea correcta

export async function buscar_Orden(id, opcion, estadp, estadoDos) {
    let connection;
    let rows = [];


    console.log("datos de bsuqueda ")

    console.log(id, opcion, estadp, estadoDos);


    try {
        connection = await connectToMySQL();

        if (opcion == 0) {
            [rows] = await connection.execute(
                'SELECT * FROM Orden WHERE Id = ?',
                [id]
            );
        } else if (opcion == 1) {
            [rows] = await connection.execute(
                'SELECT * FROM Orden WHERE estado = ? ORDER BY id',
                [estadp]
            );
        } else if (opcion == 2) {

            [rows] = await connection.execute(
                'SELECT ' +
                'c.nombre, ' +
                'c.cedula, ' +
                'c.telefono_1, ' +
                'c.celular, ' +
                'c.direccion, ' +
                'c.correo, ' +
                'o.id, ' +
                'o.fecha_Ingreso, ' +
                'o.fecha_Salida, ' +
                'o.articulo, ' +
                'o.total, ' +
                'o.estado ' +

                'FROM Orden o ' +
                'INNER JOIN Cliente c ON o.cedulaCliente = c.cedula ' +
                'WHERE o.estado = ? OR o.estado = ? ' +
                'ORDER BY o.id',
                [estadp, estadoDos]
            );


        }

        console.log("datos de la busqueda -----")
        console.table(rows);

        return rows; // Retorna las filas obtenidas
    } catch (error) {
        console.error("Algo salió mal", error);
        throw error;
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}
