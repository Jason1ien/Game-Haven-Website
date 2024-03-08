// Load environment variables from .env file
require('dotenv').config();

var mysql = require('mysql');

// Create a 'connection pool' using the provided credentials
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : process.env.DB_HOST,
    user            : process.env.DB_USER,
    password        : process.env.DB_PASSWORD,
    database        : process.env.DB_DATABASE
});

// Export it for use in our application
module.exports.pool = pool;