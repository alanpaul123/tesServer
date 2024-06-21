const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  number: {
    type: Number,
  },
});

const users = mongoose.model("users", userSchema);
module.exports = users;
