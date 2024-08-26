//34.72.152.68 edgar osorio

import mysql from 'mysql2/promise';

// MySQL connection configuration
const mysqlConfig = {
    host: '181.129.59.85',
    user: 'adminroot',
    password: 'OsitoDormilon2429.',
    database: 'FIXY',
    connectTimeout: 30000 // 30 seconds timeout
};

const connectToMySQL = async () => {
    try {
        const connection = await mysql.createConnection(mysqlConfig);
        return connection;
    } catch (err) {
        console.error('Error al conectar a la base de datos:', err.stack);
        throw err;
    }
};

export { connectToMySQL };







// conexion  con sqlserver 
// import sql from "mssql";

// const dbSetting = {
//     user: "Fixy",
//     password: "Fixy2429",
//     server: "181.129.59.85",
//     database: "FIXY",
//     options: {
//         trustedConnection: false,
//         //  enabledArithAbort: false,
//         encrypt: false,
//         trustServerCertificate: true,
//     }
// }

// export async function getConnection() {
//     try {
//         const pool = await sql.connect(dbSetting)
        
//         // //consulta de prueba de conexion
//         //  const result = await pool.request().query("SELECT * FROM cliente;");
//         //  console.log(result.recordset), 1
//         //  sql.close();

//         return pool;
//     } catch (error) {
//         console.log(error.message);
//     }
// }

// export { sql }; // la exporto para que otros modulos la utilizen

// getConnection();


