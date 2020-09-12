/**
 * USERS = user model schema
 */

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  googleID: String,
});

let User = mongoose.model("User", UserSchema);
module.exports = User;
