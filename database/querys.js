import { setMaxParserCache } from "mysql2";

export const queries = {
    getClientesByCedula: 'SELECT * FROM cliente WHERE cedula = ?',

    getOrdenByCedula: 'SELECT * FROM orden WHERE cedulaCliente = ?',

    tecnicos: `SELECT Cedula, Nombre FROM TECNICOS ORDER BY NOMBRE ASC`,


    // getOrdenByCedula: `
    //   SELECT ATENCION.*, ATENCION_DETALLE.* 
    //   FROM ATENCION_DETALLE 
    //   INNER JOIN ATENCION ON dbo.ATENCION_DETALLE.Id_factura = ATENCION.id 
    //   WHERE ATENCION.cedula = @cedula
    // `,

    inserCliente: `
      IF EXISTS (SELECT 1 FROM cliente WHERE cedula = @cedula)
      BEGIN
          UPDATE cliente
          SET direccion = @direccion, nombre = @nombre, telefono_1 = @telefono_1, celular = @celular
          WHERE cedula = @cedula
      END
      ELSE
      BEGIN
          INSERT INTO cliente (cedula, direccion, nombre, telefono_1, celular)
          VALUES (@cedula, @direccion, @nombre, @telefono_1, @celular)
      END
    `,



    // orden: `
    //  IF EXISTS(SELECT 1 FROM ATENCION WHERE id_factura = @id_factura)
    //  BEGIN
    //      UPDATE ATENCION
    //      SET cedula = @cedula
    //      WHERE id_factura = @id_factura
    //  END
    //  ELSE
    //  BEGIN
    //      INSERT INTO ATENCION(cedula)
    //      VALUES(@cedula)
    //  END
    //  `,

};



 