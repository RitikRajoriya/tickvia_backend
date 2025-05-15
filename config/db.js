// config/db.js
const mysql = require('mysql2'); // Or 'mysql' if you're using it

const connection = mysql.createConnection({
    host: process.env.DB_HOST, 
    user: process.env.DB_USER, 
    password: process.env.DB_PASSWORD, // Your database password
    database: process.env.DB_NAME, // e.g., 'my_database'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        process.exit(1); // Exit if connection fails
    } else {
        console.log('Connected to MySQL database');
    }
});

module.exports = connection;
