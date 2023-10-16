const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { SALT } = require("../constants.js");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true,"Firstname is required !"],
    unique: true,
  },
  lastname: {
    type: String,
    required: [true,"Lastname is required !"],
    unique: true,
  },
  email: {
    type: String,
    required: [true,"Email is required ! !"],
  },
  password: {
    type: String,
    required: [true,"Password is required !"],
  },
});

userSchema.virtual("repeatPassword").set(function (value) {
  if (this.password !== value) {
    throw new Error("Password missmatch !");
  }
});


userSchema.pre("save", async function () {
  const hash = await bcrypt.hash(this.password, SALT);
  this.password = hash;
});

const User = mongoose.model("User", userSchema);

module.exports = User;