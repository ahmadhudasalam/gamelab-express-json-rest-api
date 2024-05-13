const router = require("express").Router();

const UserController = require("../controllers/UserController");
const TaskController = require("../controllers/TaskController");
const { authenticateToken } = require("../middleware/authMiddleware");

router.get("/", (req, res) => {
  res.send("Hello from To-Do App API!");
});

router.post("/login", UserController.login);
router.post("/register", UserController.register);
router.get("/profile", authenticateToken, UserController.detail);

router.get("/task", authenticateToken, TaskController.index);
router.post("/task", authenticateToken, TaskController.store);
router.put("/task/:id", authenticateToken, TaskController.update);
router.delete("/task/:id", authenticateToken, TaskController.destroy);
router.get("/task/completed", authenticateToken, TaskController.completed);
router.get("/task/:id", authenticateToken, TaskController.show);
router.delete("/task", authenticateToken, TaskController.destroyAll);

module.exports = router;
