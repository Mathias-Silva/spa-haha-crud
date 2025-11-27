const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'P@$$w0rd',
    database: process.env.DB_NAME || 'dbSpa',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

const pool = mysql.createPool(dbConfig);

// Testar conexão
pool.getConnection()
    .then(connection => {
        console.log(' MySQL conectado com sucesso!');
        connection.release();
    })
    .catch(err => {
        console.error(' Erro na conexão com o MySQL:', err.message);
        console.log(' Certifique-se de que o MySQL está rodando e o banco dbSpa existe.');
    });

module.exports = pool;

