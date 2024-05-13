const Task = require("../models/Task");

const index = async (req, res) => {
  try {
    const user_id = req.user.id;
    const tasks = await Task.getAllTask(user_id);

    if (tasks.length > 0) {
      const data = {
        message: "Get All Task",
        data: tasks,
      };
      return res.status(200).json(data);
    } else {
      return res.status(200).json({ message: "Data is empty" });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const show = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id;
    const task = await Task.getTaskById(id, user_id);

    if (task.length > 0) {
      const data = {
        message: "Get Task By Id",
        data: task,
      };
      return res.status(200).json(data);
    }
    return res.status(404).json({ message: "Task not found" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const store = async (req, res) => {
  try {
    const { title } = req.body;
    const user_id = req.user.id;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    } else {
      const task_id = await Task.addTask(title, user_id);
      const task = await Task.getTaskById(task_id.insertId, user_id);
      const data = {
        message: "Task added successfully",
        data: task,
      };
      return res.status(201).json(data);
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;
    const user_id = req.user.id;

    const task = await Task.getTaskById(id, user_id);

    if (task.length === 0) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    if (!title && completed === undefined) {
      return res
        .status(400)
        .json({ message: "Title or completed is required" });
    } else {
      await Task.updateTask(id, completed, user_id, title);
      const updatedTask = await Task.getTaskById(id, user_id);
      const data = {
        message: "Task updated successfully",
        data: updatedTask,
      };
      return res.status(200).json(data);
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const destroy = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.getTaskById(id, req.user.id);

    if (task.length > 0) {
      await Task.deleteTask(id, req.user.id);
      const data = {
        message: "Task deleted successfully",
        data: task,
      };
      res.status(200).json(data);
    } else {
      const data = {
        message: "Task not found",
      };
      res.status(404).json(data);
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const completed = async (req, res) => {
  try {
    const { status } = req.query;
    const user_id = req.user.id;
    const tasks = await Task.getTaskCompleted(user_id, status);

    if (tasks.length > 0) {
      const data = {
        message: "Get Task By Completed",
        data: tasks,
      };
      return res.status(200).json(data);
    } else {
      return res.status(200).json({ message: "Data is empty" });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const destroyAll = async (req, res) => {
  try {
    const user_id = req.user.id;
    const tasks = await Task.getAllTask(user_id);

    if (tasks.length > 0) {
      await Task.deleteAllTask(user_id);
      const data = {
        message: "All Task deleted successfully",
      };
      res.status(200).json(data);
    } else {
      const data = {
        message: "Task not found",
      };
      res.status(404).json(data);
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { index, show, store, update, destroy, completed, destroyAll };
