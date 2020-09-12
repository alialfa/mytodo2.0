var express = require("express");
var router = express.Router();
const task = require("../controllers/task.controller.js");

/* GET all tasks index page. */
router.get("/", task.findAll);

/* GET a single task by id */
router.get("/:userId", task.findByUserId);

module.exports = router;
