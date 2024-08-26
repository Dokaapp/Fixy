import { connectToMySQL } from '../database/connection.js'; // Asegúrate de que la ruta sea correcta

export async function upsertCliente(data) {
  let connection;
  console.log("datos del cliente para grabar")
  console.table(data);

  try {
    connection = await connectToMySQL();

    // Primero, verifica si el cliente existe
    const [rows] = await connection.execute(
      'SELECT 1 FROM cliente WHERE cedula = ?',
      [data.cedula]
    );

    if (rows.length > 0) {
      // Si el cliente existe, realiza un UPDATE
      await connection.execute(
        `UPDATE cliente  SET nombre = ?, Direccion = ?, telefono_1 = ?, celular = ?, Correo = ?
         WHERE cedula = ?`,
        [data.nombre, data.direccion, data.telefono_1, data.celular, data.correo, data.cedula]
      );
      console.log("Cliente actualizado exitosamente.");
      return true;
    } else {
      // Si el cliente no existe, realiza un INSERT
      await connection.execute(
        `INSERT INTO cliente (cedula, Direccion, nombre, telefono_1, celular, Correo)
          VALUES (?, ?, ?, ?, ?, ?)`,
        [data.cedula, data.direccion, data.nombre, data.telefono_1, data.celular, data.correo]
      );
      console.log("Cliente insertado exitosamente.");
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