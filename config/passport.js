/* Prior to Passport authentication, we configure the Local / Google strategies */
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const GoogleStrat = require("passport-google-oauth20");
const keys = require("./keys");
const bcrypt = require("bcrypt");
const User = require("../models/user.model.js");

/**
 * cookie used to ID session.
 */

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new localStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) throw err;
      if (!user) return done(null, false);
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) throw err;
        if (result === true) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    });
  })
);

passport.use(
  new GoogleStrat(
    {
      //options for stratergy
      callbackURL: "/login/redirect",
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
    },
    /**
     * verify callback function
     * > gets user with a set of credentials
     * > passport parses credentials
     * > verify cb function is now invoked (arguments {credentials})
     * > if (valid) ... call done() ... inform passport auth is OK
     * > write user details to DB before invoking done
     */
    (accessToken, refreshToken, profile, done) => {
      console.log("Passport callback function fired");
      console.log(profile);
      User.findOne({ googleID: profile.id }).then((currentUser) => {
        //have this user in our db
        if (currentUser) {
          console.log("existing User " + currentUser);
          done(null, currentUser);
        } //user not saved in DB so save
        else {
          new User({
            username: profile.displayName,
            googleID: profile.id,
          })
            .save()
            .then((newUser) => {
              console.log("new User CREATED " + newUser);
              done(null, newUser);
            });
        }
      });
    }
  )
);
