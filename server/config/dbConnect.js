const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "auth"
})


// connection.query("CREATE TABLE IF NOT EXISTS authTable (firstName VARCHAR(20), lastName VARCHAR(30), email VARCHAR(20) UNIQUE, password VARCHAR(300), resetToken VARCHAR(100), resetTokenExpires DATETIME)", (err) => console.log(err))

module.exports = connection

