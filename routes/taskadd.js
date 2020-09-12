var express = require("express");
var router = express.Router();
const task = require("../controllers/task.controller.js");

/* GET tasks listing. */
router.post("/", task.create);

module.exports = router;
