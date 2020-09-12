/**
 * @auth.js
 * > create route handlers for authentication routes
 * > default, if authentication fails, passport responds with 401
 * > on success, next handler invoked && req.user === authenticated user
 */

const router = require("express").Router();
const passport = require("passport");

// initial google authentication attempt
router.get(
  "/login/google",
  passport.authenticate("google", { scope: ["profile"] })
);

//path === redirect URI (on Google's Dev Console)
router.get("/login/redirect", passport.authenticate("google"), (req, res) => {
  //res.redirect("/welcome");
  res.send("Callback URI" + req.user);
});

// allow app alogout
router.get("/logout", function (req, res) {
  req.logout();
  res.json({
    logout: "successful",
    message: "logout successful!",
  });
});

module.exports = router;
