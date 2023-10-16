const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const jwt = require("../lib/jwt.js");
const { SECRET } = require("../constants.js");

exports.login = async (email, password) => {
  // find user

  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid username or password !");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid username or password !");
  }

  const token = await generateToken(user);

  return token;
};

exports.register = async (userData) => {
  const user = await User.exists({ email: userData.email });
  if (user) {
    throw new Error("User already exists !");
  }

  try {
    const createdUser = await User.create(userData);
    const token = await generateToken(createdUser);
    return token;
  } catch (err) {
    return err;
  }
};

async function generateToken(user) {
  // create the payload
  const payload = {
    _id: user._id,
    username: user.username,
    email: user.email,
  };

  // generate the token
  const token = await jwt.sign(payload, SECRET, { expiresIn: "2d" });

  // if everything goes right return the generated token
  return token;
}
