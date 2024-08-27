// agosto 6 de 2024
// agosto 23 de 2024
console.log("archivo index.js")


import { upsertCliente } from '../funciones/upsertCliente.js';
import { upsertOrden } from '../funciones/upserOrden.js';
import { update_Diagnostico } from '../funciones/updateDiagnostico.js';



console.log("Bienvenido");
import app from './app.js';
import { connectToMySQL, queries } from '../database/index.js'
import { escape } from 'querystring';
import { unwatchFile } from 'fs';
import { buscar_Orden } from '../funciones/busquedaOrden.js';



// // Middleware simple que registra la solicitud
// app.use((req, res, next) => {
//   console.log(`${req.method} ${req.url}`);
//   next(); // Llama a la siguiente función de middleware
// });


// Ruta principal --------------------------------------------
//                                  http://localhost:3000
app.get('/', (req, res) => {
  res.json({ message: 'Hello, world!' });
  //ingresar();
  consultarCliente('71721')
});


//----------- traer el cliente
//                                    http://lcoalhost:3000/api/cliente/147

app.get('/api/cliente/:cedulaCliente', async (req, res) => {
  const { cedulaCliente } = req.params;

  let connection;
  connection = await connectToMySQL();
  const [rows] = await connection.execute(queries.getClientesByCedula, [cedulaCliente]);
  if (rows.length > 0) {
    const user = rows[0];
    console.log("existe ", user);
    res.status(201).json(rows);

  } else {
    console.log("no existe el cliente");
    res.status(201).json("no existe el cliente");
  }

});

//----------- traer la orden
///                    http://localhost:3000/api/orden/147

app.get('/api/orden/:cedulaCliente', async (req, res) => {

  const { cedulaCliente } = req.params;

  let connection;
  connection = await connectToMySQL();
  const [rows] = await connection.execute(queries.getOrdenByCedula, [cedulaCliente]);
  if (rows.length > 0) {
    const user = rows[0];
    console.log("existe ", user);
    res.status(201).json(rows);

  } else {
    res.status(400).send("no existe la orden")
    console.log("no existe el cliente");
  }

});





//  ---------------------------------------------------------------- 
//    GRABAR o MODIFICAR EL CLIENTE
//                                    http://localhost:3000/api/cliente
//   -----------------------------------------------------------------*/
// Endpoint para insertar datos









// const { cedulaCliente } = req.params;

// let connection;
// connection = await connectToMySQL();
// const [rows] = await connection.execute(queries.getOrdenByCedula, [cedulaCliente]);
// if (rows.length > 0) {
//   const user = rows[0];
//   console.log("existe ", user);
//   res.status(201).json(rows);

// } else {
//   console.log("no existe el cliente");
// }



// // Ejemplo de cómo podrías llamar a esta función
// const clienteData = {
//   cedula: '123456789',
//   direccion: 'Calle Falsa 123',
//   nombre: 'Juan Pérez',
//   telefono_1: '555-1234',
//   celular: '555-5678'
// };

// upsertCliente(clienteData);
















// /*  ---------------------------------------------------------------- 
//     GRABAR ORDEN 
//    -----------------------------------------------------------------*/
// app.post("/api/orden", async (req, res) => {
//   const { id_factura, cedula } = req.body;
//   const pool = await getConnection();
//   await pool.request()
//     .input("id_factura", sql.Numeric, id_factura)
//     .input("cedula", sql.NVarChar(20), cedula)

//     .query(queries.orden);

//   res.status(201).json("Orden Grabado con éxito")
// });



//  -----------------  Tecnicos
//                                http://localhost:3000/api/tecnicos

app.get('/api/tecnicos', async (req, res) => {

  let connection;
  connection = await connectToMySQL();
  const [rows] = await connection.execute(queries.tecnicos);
  if (rows.length > 0) {
    console.log(rows);
    res.json(rows)
  } else {
    console.log("no existe el cliente");
  }

})













// Iniciar el servidor ------------------------------------------
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
//  --------------------------------------------------------------








async function ingresar() {
  let connection;
  connection = await connectToMySQL();
  const [rows] = await connection.execute('SELECT Usuario, Clave FROM LOGIN');

  if (rows.length > 0) {
    const user = rows[0];
    console.log("existe ", user.Usuario);
  } else {
    console.log("registrarse");
  }

}






async function consultarCliente(cedulaCliente) {
  let connection;
  connection = await connectToMySQL();
  const [rows] = await connection.execute(queries.getClientesByCedula, [cedulaCliente]);
  if (rows.length > 0) {
    const user = rows[0];
    console.log("existe ", user);
  } else {
    console.log("no existe el cliente");
  }
}


// // Función UpdateInsertCliente
// async function UpdateInsertCliente(data) {
//   const respuesta = await upsertCliente(data); // Llamada correcta a la función
//   console.table(respuesta);
// }


// // Ejemplo de cómo podrías llamar a esta función
// const clienteData = {
//   cedula: '123456789',
//   direccion: 'Calle Falsa 123',
//   nombre: 'edgar Pérez',
//   telefono_1: '555-34',
//   celular: '555-5678'
// };

// UpdateInsertCliente(clienteData);





/*  ---------------------------------------------------------------- 
    grabar o modificar ORDEN
    http://localhost:3000/api/cliente
   -----------------------------------------------------------------*/




app.post('/api/orden/', async (req, res) => {

  const { id, cedulaCliente, articulo, accesorios, marca, modelo, descripcion, actualizoGrabo, cedulaTecnico } = req.body;

  // Crear el objeto data con los datos de la orden
  const data = {
    id,
    cedulaCliente,
    articulo,
    accesorios,
    marca,
    modelo,
    descripcion,
    actualizoGrabo,
    cedulaTecnico,
  };


  console.table(data);

  try {
    // Llamar a la función upsertCliente
    const respuesta = await upsertOrden(data);
    console.table(respuesta);

    if (respuesta) {
      res.status(200).json({ success: true, actualizoGrabo: actualizoGrabo });
    } else {
      res.status(500).json({ success: false });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});


//  ---------------------------------------------------------------- 
//    actualizar el diagnostico
//                             
//   -----------------------------------------------------------------*/
app.post("/api/updateDiagnostico", async (req, res) => {
  const { id, observaciones } = req.body;

  // Ensure both observaciones and id are provided
  if (!observaciones || !id) {
    return res.status(400).json({ success: false, message: "Datos incompletos" });
  }

  const data = {
    id: id,
    observaciones: observaciones,
  };



  try {
    // Call the update_Diagnostico function with the data
    const result = await update_Diagnostico(data);

    if (result) {
      res.status(200).json({ success: true, message: 'Diagnóstico actualizado' });
    } else {
      res.status(404).json({ success: false, message: 'Orden no encontrada' });
    }
  } catch (error) {
    console.error("Error al actualizar:", error);
    res.status(500).json({ success: false, message: 'Error al actualizar' });
  }
});





//  ---------------------------------------------------------------- 
//    grabar o modificar cliente
//                                    http://localhost:3000/api/cliente
//   -----------------------------------------------------------------*/

app.post('/api/cliente/', async (req, res) => {
  const { cedula, direccion, nombre, telefono_1, celular, correo } = req.body;

  // Crear el objeto data con los datos del cliente
  const data = {
    cedula,
    direccion,
    nombre,
    telefono_1,
    celular,
    correo
  };

  try {
    // Llamar a la función upsertCliente
    const respuesta = await upsertCliente(data);
    console.table(respuesta);

    if (respuesta) {
      res.status(200).json({ success: true, message: 'Operación exitosa' });
    } else {
      res.status(500).json({ success: false, message: 'Error en la operación' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});



// try {
//   const pool = await getConnection();
//   await pool.request()
//     .input("cedula", sql.NVarChar(20), cedula) // Ajusta el tipo de dato según tu schema
//     .input("Direccion", sql.NVarChar(100), direccion)
//     .input("nombre", sql.NVarChar(100), nombre)
//     .input("telefono_1", sql.NVarChar(7), telefono_1)
//     .input("celular", sql.NVarChar(10), celular)
//     .query(queries.inserCliente);
//   //res.status(201).send('Cliente insertada correctamente');
//   res.status(201).json({ message: 'Cliente insertada correctamente' });
//   console.log('Cliente insertada correctamente')
// } catch (error) {
//   console.error('Error al insertar la Cliente:', error);
//   //res.status(500).send('Error al insertar el cliente');
//   res.status(500).json({ error: 'Error al insertar el cliente' });
// }


app.get("/api/buscar/:orden/:opcion/:estado/:estadoDos/", async (req, res) => {
  try {
    const id = parseInt(req.params.orden, 10); // Convertir a número
    const opcion = parseInt(req.params.opcion, 10); // Convertir a número
    const estado = req.params.estado
    const estadoDos = req.params.estadoDos


    console.log("datos de bsuqueda ")



    if (isNaN(id) || isNaN(opcion)) {
      return res.status(400).json({ message: "Parámetros inválidos. Se esperaba un número." });
    }

    const result = await buscar_Orden(id, opcion, estado, estadoDos); // Llama a la función para buscar la orden

    if (result.length > 0) {
      res.status(200).json(result); // Envía los resultados si se encuentra la orden
    } else {
      res.status(404).json({ message: "Orden no encontrada" }); // Envía un 404 si no se encuentra la orden
    }
  } catch (error) {
    res.status(500).json({ message: "Error al buscar la orden", error }); // Manejo de errores
  }
});





