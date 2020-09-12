const router = require("express").Router();

const authCheck = (req, res, next) => {
  if (!req.user) {
    //if user not logged in
    res.redirect("/login");
  } else {
    next();
  }
};

// when login is successful, retrieve user info
router.get("/auth/login/local", (req, res) => {
  if (req.user) {
    res.json({
      authenticated: true,
      username: req.user.username,
      userID: req.user._id,
      googleID: null,
      strategy: "passport_local",
    });
  } else {
    res.json({ authenticated: false });
  }
});

// used for social login initial window e.g. google
router.get("/welcome", authCheck, (req, res) => {
  var username = req.user.username;
  var title = "Dear " + username + ",";
  var welcome = "Welcome to myTODO.app";
  res.render("welcome", { title: title, welcome: welcome });
});

// when login is successful, retrieve user info
router.get("/auth/login/google", (req, res) => {
  if (req.user) {
    res.json({
      authenticated: true,
      username: req.user.username,
      userID: req.user._id,
      googleID: req.user.googleID,
      strategy: "passport_google",
    });
  } else {
    res.json({
      authenticated: false,
      message: "user authentication failed :(",
    });
  }
});

module.exports = router;
