const mysql = require("mysql");
const dotenv = require("dotenv");

dotenv.config();
const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE } = process.env;

const db = mysql.createConnection({
  host: DB_HOST,
  user: DB_USERNAME,
  port: DB_PORT,
  password: DB_PASSWORD,
  database: DB_DATABASE,
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to database");
});

module.exports = db;
