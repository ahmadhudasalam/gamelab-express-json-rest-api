var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");
var bodyParser = require("body-parser");
var flash = require("req-flash");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var productsRouter = require("./routes/products");

//Tambahkan panggil routes kelas
var kelasRouter = require("./routes/kelas");
var sessionRouter = require("./routes/session");

// Definisi lokasi untuk auth
const loginRoutes = require("./routes/login");
const registerRoutes = require("./routes/register");

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
app.use(flash());

// tambahkan ini
app.use(function (req, res, next) {
  res.setHeader(
    "Cache-Control",
    "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
  );
  res.setHeader("Pragma", "no-cache");
  next();
});
// end

// Setting folder views
app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");

app.use("/", indexRouter);
app.use("/users", usersRouter);

//Tambahkan kelasRouter
app.use("/kelas", kelasRouter);
app.use("/session", sessionRouter);

// Gunakan routes yang telah didefinisikan untuk auth
app.use("/login", loginRoutes);
app.use("/register", registerRoutes);

app.use("/products", productsRouter);

module.exports = app;
