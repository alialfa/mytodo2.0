/**
 * ALI_MONGI-L307-FSWV-MongoDB
 * car.controller.js - db query code to perform CRUD operations via Mongoose.
 */

const Task = require("../models/task.model.js");

// ○ Add a car to the tasks collection.
exports.create = function (req, res) {
  console.log(req.body.userId + ".." + req.body.task);
  // Create and Save a new task
  let taskModel = new Task({
    userId: req.body.userId,
    task: req.body.task,
  });
  taskModel.save(function (err, data) {
    if (err) {
      console.log(err);
      res
        .status(500)
        .send({ message: "Some error occurred while creating the task!" });
    } else {
      console.log(data);
      res.json({ m: "The task has been added!" });
    }
  });
};

// db.tasks.find({googleId: "113074832910116055647"}, {_id: 0, task:1} ).pretty()
exports.findByUserId = function (req, res) {
  let query = { userId: req.params.userId };
  Task.find(query, function (err, tasks) {
    if (err) {
      console.log(err);
      res
        .status(500)
        .send({ message: "Some error occurred while retrieving the tasks!" });
    } else {
      res.json(tasks);
    }
  });
};

// ○ List all the information for all tasks in your database.
exports.findAll = function (req, res) {
  Task.find(function (err, tasks) {
    if (err) {
      console.log(err);
      res
        .status(500)
        .send({ message: "Some error occurred while retrieving the tasks!" });
    } else {
      res.json(tasks);
    }
  });
};

// ○ Update information about a single task.
//***** e.g. mongo-shell: >> db.tasks.updateOne({ _id: ObjectId("5f3c94881394cb3df403dd8b") },{ $set: { task: "down" } });
//***** e.g. >> Task.updateOne(query, { $set: { task: "task here" } }, function (
exports.updateSingleTask = function (req, res) {
  let query = { _id: req.body.taskId }; //let query = { _id: "5f3c94881394cb3df403dd8b" };
  let updateData = { $set: { task: req.body.task } };

  Task.updateOne(query, updateData, function (err, doc) {
    if (err) {
      console.log("Something wrong when updating task data!");
      res.json("ERROR: Task Not Updated :(" + err);
    }
    res.json({ m: "The task has been updated!" });
  });
};

// ○ Delete a specific document.
exports.deleteTaskById = function (req, res) {
  let query = { _id: req.body.taskId }; // { _id: "5f3c5a1cb655dc6d54ae7fd7" };
  Task.findOneAndRemove(query, function (err) {
    if (err) {
      console.log("ERROR: Task NOT removed. " + err);
      res.json("ERROR: Task NOT removed. " + err);
    }
    res.json("The task has been deleted!");
  });
};
