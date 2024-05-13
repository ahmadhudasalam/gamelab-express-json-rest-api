var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
//Tambahkan panggil routes kelas
var kelasRouter = require("./routes/kelas");
var sessionRouter = require("./routes/session");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "iniadalahkeyrahasiamu",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 },
  })
);

app.use("/", indexRouter);
app.use("/users", usersRouter);
//Tambahkan kelasRouter
app.use("/kelas", kelasRouter);
app.use("/kelas/:id", kelasRouter);
//Tambahkan sessionRouter
app.use("/session", sessionRouter);

module.exports = app;
