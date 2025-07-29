const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  deadline: Date,
  userId: { type: String, required: true },
});

module.exports = mongoose.model("Todo", todoSchema);
