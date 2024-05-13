let mysql = require("mysql");

//konfigurasi untuk koneksi database MySql

let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "express_mysql",
});

//Kondisi untuk mengecek database berjalan atau tidak
connection.connect(function (error) {
  if (!!error) {
    console.log(error);
  } else {
    console.log("Koneksi ke database MySql Berhasil!");
  }
});

module.exports = connection;
