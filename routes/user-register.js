var express = require("express");
var router = express.Router();
const User = require("../models/user.model.js");
//const user = require("../controllers/user.controller.js");
const bcrypt = require("bcrypt");

//router.post("/", user.register);
router.get("/:username/:password", (req, res) => {
  ///console.log(req.params.username + "..,,,,,,,," + req.params.password);
  //console.log(req.body.username + "..,,,,,,,," + req.body.password);
  //*
  //User.findOne({ username: "ali" }, async (err, doc) => {
  User.findOne({ username: req.params.username }, async (err, doc) => {
    if (err) throw err;
    if (doc) res.json({ status: "FAIL", message: "Sorry, username is taken!" });
    if (!doc) {
      const hashedPassword = await bcrypt.hash(req.params.password, 10);
      //const hashedPassword = await bcrypt.hash("ali", 10);

      const newUser = new User({
        username: req.params.username,
        //username: "ali",
        password: hashedPassword,
        googleID: null,
      });
      await newUser.save();
      res.json({ status: "OK", message: "Registration succesful!" });
    }
  });
  //*/
});

module.exports = router;
