require('dotenv').config();
const mysql = require('mysql2');

const init = () => {
  const db = mysql.createConnection({
    host: process.env.DB_HOST ?? "localhost",
    user: "user",
    password: "password",
    port: 3306
  });
  
  db.connect(function(err) {
    if (err) throw err;
    console.log("Connected to MySQL Database!");
  });
}

module.exports = {
  init
}