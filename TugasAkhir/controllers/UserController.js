const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

const User = require("../models/User");
dotenv.config();
const { ACCESS_TOKEN_SECRET } = process.env;

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).send("Email and password are required");
      return;
    }

    const user = await User.getUserByEmail(email);

    if (user.length > 0) {
      const hashedPassword = user[0].password;
      const isPasswordMatch = bcrypt.compareSync(password, hashedPassword);

      if (isPasswordMatch) {
        const accessToken = jwt.sign(
          { email: user[0].email, id: user[0].id },
          ACCESS_TOKEN_SECRET,
          { expiresIn: "12h" }
        );
        res.json({ accessToken });
      } else {
        res.status(401).send("Invalid email or password");
      }
    } else {
      res.status(401).send("Invalid email or password");
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
};

const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).send("Email and password are required");
      return;
    }

    const user = await User.getUserByEmail(email);

    if (user.length > 0) {
      return res.status(400).json({ message: "Email already registered" });
    } else {
      const hashedPassword = bcrypt.hashSync(password, 10);
      await User.createUser(email, hashedPassword);
      res.status(201).json({ message: "User registered successfully" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
};

const detail = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await User.getDetailUser(id);
    res.json({ id: user[0].id, email: user[0].email });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { login, register, detail };
