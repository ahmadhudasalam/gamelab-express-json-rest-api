const db = require("../config/database");

const getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM users WHERE email = ?";
    db.query(query, email, (err, results) => {
      resolve(results);
    });
  });
};

const createUser = (email, password) => {
  return new Promise((resolve, reject) => {
    const query = "INSERT INTO users (email, password) VALUES (?, ?)";
    db.query(query, [email, password], (err, results) => {
      resolve(results);
    });
  });
};

const getDetailUser = (id) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM users WHERE id = ?";
    db.query(query, id, (err, results) => {
      resolve(results);
    });
  });
};

module.exports = { getUserByEmail, createUser, getDetailUser };
