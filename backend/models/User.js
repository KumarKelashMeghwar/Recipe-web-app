const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fname: String,
  avatar: {
    data: Buffer,
    contentType: String,
  },
  lname: String,
  birthday: Date,
  email: String,
  password: String,
  is_verified: 0,
});

module.exports = mongoose.model("User", userSchema);
