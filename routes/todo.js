const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const controller = require("../controllers/todoController");

router.get("/", auth, controller.getTodos);
router.post("/", auth, controller.addTodo);
router.delete("/:id", auth, controller.deleteTodo);
router.put("/:id", auth, controller.updateTodo);

module.exports = router;
