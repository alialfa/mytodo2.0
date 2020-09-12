/**
 * TASKS = task model schema
 */

const mongoose = require("mongoose");

let TaskSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  task: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("tasks", TaskSchema);
