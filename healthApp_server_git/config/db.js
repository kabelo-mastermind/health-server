// config/db.js
const mysql = require('mysql');

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "healthapp",
  connectTimeout: 10000 // timeout in milliseconds (10 seconds)
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to database: ', err);
    return;
  }
  console.log('Connected to the database');
});

module.exports = db;
