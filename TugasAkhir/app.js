const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require("path");
const cookieParser = require("cookie-parser");
const flash = require("express-flash");
const session = require("express-session");
const logger = require("morgan");

const apiRouter = require("./routes/api");
const webRouter = require("./routes/web");

dotenv.config();
const { APP_PORT } = process.env || 3000;

const app = express();
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));
app.use(express.static(path.join(__dirname, "./public")));

app.use("/api", apiRouter);
app.use("/", webRouter);

app.listen(APP_PORT, () => {
  console.log(`Server running at: http://localhost:${APP_PORT}`);
});
