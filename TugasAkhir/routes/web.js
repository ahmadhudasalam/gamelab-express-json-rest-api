const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

dotenv.config();
const { ACCESS_TOKEN_SECRET } = process.env;
const User = require("../models/User");
const Task = require("../models/Task");

router.get("/", (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.render("index", { email: null, token: null });
  }
  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
    res.render("index", { email: user.email, token: token });
  });
});

router.get("/login", (req, res) => {
  const token = req.cookies.token;
  if (token) {
    return res.redirect("/");
  }
  res.render("login");
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      req.flash("error", "Email and password fields are required");
      res.redirect("/login");
      return;
    }

    const user = await User.getUserByEmail(email);
    if (user.length === 0 || !bcrypt.compareSync(password, user[0].password)) {
      req.flash("error", "Invalid email or password");
      res.redirect("/login");
      return;
    }

    const accessToken = jwt.sign(
      { email: user[0].email, id: user[0].id },
      ACCESS_TOKEN_SECRET,
      { expiresIn: "12h" }
    );
    res.cookie("token", accessToken, { httpOnly: true });
    res.redirect("/task");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/profile", (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.redirect("/login");
  }
  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.redirect("/login");
    }
    res.render("profile", { email: user.email });
  });
});

router.get("/register", (req, res) => {
  const token = req.cookies.token;
  if (token) {
    return res.redirect("/");
  }
  res.render("register");
});

router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      req.flash("error", "Email and password fields are required");
      res.redirect("/register");
      return;
    }

    if (password.length < 6) {
      req.flash("error", "Password must be at least 6 characters");
      res.redirect("/register");
      return;
    }

    const user = await User.getUserByEmail(email);
    if (user.length > 0) {
      req.flash("error", "Email already registered");
      res.redirect("/register");
      return;
    } else {
      const hashedPassword = bcrypt.hashSync(password, 10);
      await User.createUser(email, hashedPassword);
      req.flash("success", "User registered successfully!");
      res.redirect("/register");
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
});

router.get("/task", (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.redirect("/login");
  }
  jwt.verify(token, ACCESS_TOKEN_SECRET, async (err, user) => {
    if (err) {
      return res.redirect("/login");
    }
    const tasks = await Task.getAllTask(user.id);
    res.render("task", { tasks: tasks, user_id: user.id });
  });
});

router.post("/task/:id/update", async (req, res) => {
  try {
    const { id } = req.params;
    const { status, user_id, title } = req.body;
    const completed = status === "true";
    await Task.updateTask(id, completed, user_id, title);
    res.redirect("/task");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/task/:id/delete", async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id } = req.body;
    await Task.deleteTask(id, user_id);
    res.redirect("/task");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/task", async (req, res) => {
  try {
    const { title, user_id } = req.body;

    if (!title) {
      req.flash("error", "Title field is required");
      res.redirect("/task");
      return;
    }
    await Task.addTask(title, user_id);
    res.redirect("/task");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
