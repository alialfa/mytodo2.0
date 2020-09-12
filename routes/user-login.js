var express = require("express");
var router = express.Router();
const passport = require("passport");
const User = require("../models/user.model.js");

router.post("/", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) {
      console.log("No User Exists");
      res.json({ status: "FAIL", message: "Authentication failed, retry!" });
    } else {
      req.logIn(user, (err) => {
        if (err) throw err;
        console.log("Successfully Authenticated");
        console.log(req.user);
        res.json({ status: "OK", message: "Authentication successfull!" });
      });
    }
  })(req, res, next);
});

module.exports = router;
