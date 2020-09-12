var express = require("express");
var router = express.Router();
const task = require("../controllers/task.controller.js");

/* UPDATE a task listing. */
router.put("/", task.updateSingleTask);

module.exports = router;
