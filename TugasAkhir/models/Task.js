const db = require("../config/database");

const getAllTask = (user_id) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT id, title, IF(completed, "true", "false") completed, user_id FROM tasks WHERE user_id = ?`;
    db.query(query, user_id, (err, results) => {
      resolve(results);
    });
  });
};

const getTaskById = (id, user_id) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT id, title, IF(completed, "true", "false") completed FROM tasks WHERE id = ? AND user_id = ?`;
    db.query(query, [id, user_id], (err, results) => {
      resolve(results);
    });
  });
};

const addTask = (title, user_id) => {
  return new Promise((resolve, reject) => {
    const query = "INSERT INTO tasks (title, user_id) VALUES (?, ?)";
    db.query(query, [title, user_id], (err, results) => {
      resolve(results);
    });
  });
};

const updateTask = (id, completed, user_id, title) => {
  return new Promise((resolve, reject) => {
    let query = "UPDATE tasks SET ";
    const queryParams = [];

    if (title !== undefined) {
      query += "title = ?, ";
      queryParams.push(title);
    }

    if (completed !== undefined) {
      query += "completed = ?, ";
      queryParams.push(completed);
    }

    query = query.replace(/,\s*$/, " ");
    query += "WHERE id = ? AND user_id = ?";
    queryParams.push(id, user_id);

    db.query(query, queryParams, (err, results) => {
      resolve(results);
    });
  });
};

const deleteTask = (id, user_id) => {
  return new Promise((resolve, reject) => {
    const query = "DELETE FROM tasks WHERE id = ? AND user_id = ?";
    db.query(query, [id, user_id], (err, results) => {
      resolve(results);
    });
  });
};

const getTaskCompleted = (user_id, status) => {
  return new Promise((resolve, reject) => {
    const completed = status === "true";
    const query = `SELECT id, title, IF(completed, "true", "false") completed FROM tasks WHERE user_id = ? AND completed = ?`;
    db.query(query, [user_id, completed], (err, results) => {
      resolve(results);
    });
  });
};

const deleteAllTask = (user_id) => {
  return new Promise((resolve, reject) => {
    const query = "DELETE FROM tasks WHERE user_id = ?";
    db.query(query, user_id, (err, results) => {
      resolve(results);
    });
  });
};

module.exports = {
  getAllTask,
  getTaskById,
  addTask,
  updateTask,
  deleteTask,
  getTaskCompleted,
  deleteAllTask,
};
