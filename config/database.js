const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: true,  // Attend que les connexions soient disponibles
    connectionLimit: 10,       // Limite de connexions simultanées
    queueLimit: 0              // Pas de limite de mise en fi
});

/*
mysqlConnection.createConnection((err) => {
    if (!err)
        console.log('Connection Established Successfully');
    else
        console.log('Connection Failed!' + JSON.stringify(err));
});
*/
module.exports = pool;