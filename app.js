/**
 * @app.js server settings for myTODO.app
 */
//----------------------------------------- IMPORTS---------------------------------------------------
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cors = require("cors");
const bodyParser = require("body-parser");
const passportSetup = require("./config/passport"); //To use passport within our app we need to require the file in which we configured the strategy we are using.
const mongoose = require("mongoose");
const keys = require("./config/keys");
const cookieSession = require("cookie-session");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
var authRoutes = require("./routes/auth");
var dashboard = require("./routes/dashboard");
var usersRouter = require("./routes/users");
var registerRouter = require("./routes/user-register");
var loginRouter = require("./routes/user-login");
var indexRouter = require("./routes/taskindex");
var addRouter = require("./routes/taskadd");
var updateRouter = require("./routes/taskupdate");
var deleteRouter = require("./routes/taskdelete");

var app = express();

//----------------------------------------- MIDDLEWARE---------------------------------------------------
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// set up cors to allow us to accept requests from our client
var corsOption = {
  origin: "https://mytodobyali.herokuapp.com/", // allow to server to accept request from different origin
  //origin: "http://localhost:3000", // allow to server to accept request from different origin
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // allow session cookie from browser to pass through
  exposedHeaders: ["x-auth-token"],
};

app.use(cors(corsOption));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  cookieSession({ maxAge: 24 * 60 * 60 * 1000, keys: [keys.session.cookieKey] })
);
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser("secretcode"));

app.use(passport.initialize());
app.use(passport.session());

app.use(authRoutes);
app.use(dashboard);
app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/users", usersRouter);
app.use("/task/index", indexRouter);
app.use("/task/add", addRouter);
app.use("/task/update", updateRouter);
app.use("/task/delete", deleteRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

/*
app.get("/user", (req, res) => {
  res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
});*/
//----------------------------------------- DATABASE---------------------------------------------------
mongoose.connect(
  keys.mongoDB.dbURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log(">>>>>>>>>> Connected to MongoDb");
  }
);

//----------------------------------------- DEPLOYMENT---------------------------------------------------

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "frontend/build")));
  // Handle React routing, return all requests to React app
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "frontend/build", "index.html"));
  });
}

module.exports = app;
