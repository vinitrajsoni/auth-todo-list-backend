const Todo = require("../models/Todo");

exports.getTodos = async (req, res) => {
  const todos = await Todo.find({ userId: req.user.id });
  res.json(todos);
};

exports.addTodo = async (req, res) => {
  const { title, description, deadline } = req.body;
  const newTodo = new Todo({
    title,
    description,
    deadline,
    userId: req.user.id,
  });
  await newTodo.save();
  res.status(201).json(newTodo);
};

exports.deleteTodo = async (req, res) => {
  await Todo.deleteOne({ _id: req.params.id, userId: req.user.id });
  res.json({ success: true });
};

exports.updateTodo = async (req, res) => {
  const { title, description, deadline } = req.body;
  const updated = await Todo.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    { title, description, deadline },
    { new: true }
  );
  if (!updated) return res.status(404).json({ error: "Todo not found" });
  res.json(updated);
};
