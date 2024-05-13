const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Selamat Datang di Gamelab Indonesia!");
});

app.get("/kelas/:jurusan?/:id/:pilihan?", (req, res) => {
  var jurusan = req.params.jurusan;
  var id = req.params.id;
  var pilihan = req.params.pilihan;

  res.send(
    `Ini adalah halaman untuk kelas ${jurusan} ${pilihan} tingkat ${id}`
  );
});

app.post("/kelas", (req, res) => {
  res.send("POST Kelas");
});

app.put("/kelas", (req, res) => {
  res.send("PUT Kelas");
});

app.delete("/kelas", (req, res) => {
  res.send("DELETE Kelas");
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
