var express = require("express");
var router = express.Router();
const task = require("../controllers/task.controller.js");

/* DELETE a task listing. */
router.delete("/", task.deleteTaskById);

module.exports = router;
