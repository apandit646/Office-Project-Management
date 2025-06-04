const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'projectmanagement',
    port: 3306, // Default MySQL port
    multipleStatements: true // Allows executing multiple SQL statements in one query

});


db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});


module.exports = db;