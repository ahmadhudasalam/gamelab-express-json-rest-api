const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  // debugger;
  console.log('Ini adalah permintaan request untuk "/"');
  console.log("Selamat Datang di Gamelab Indonesia!");
  res.send("Selamat Datang di Gamelab Indonesia!");
});

app.get("/kelas", (req, res) => {
  console.log('Ini adalah permintaan request untuk "/kelas"');
  res.send("Ini adalah Halaman Kelas");
});

app.get("/kelas/:jurusan", (req, res) => {
  console.log(
    `Ini adalah permintaan request untuk "/kelas/${req.params.jurusan}"`
  );
  res.send(`Ini adalah halaman untuk kelas ${req.params.jurusan}`);
});

app.get("/about", (req, res) => {
  console.log('Ini adalah permintaan request untuk "/about"');
  res.send("Ini adalah Halaman About");
});

app.get("/kelas/:jurusan/:id/:pilihan?", (req, res) => {
  var jurusan = req.params.jurusan;
  var id = req.params.id;
  var pilihan = req.params.pilihan;

  console.log(
    `Ini adalah permintaan request untuk "/kelas/${req.params.jurusan}/${req.params.id}/$req.params.pilihan`
  );
  res.send(
    `Ini adalah halaman untuk kelas ${jurusan} ${pilihan} tingkat ${id}`
  );
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
