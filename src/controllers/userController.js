const router = require("express").Router();
const userService = require("../services/userService.js");
const { getErrorMessage } = require("../utils/errorHelpers.js");

router.get("/login", (req, res) => {
  res.render("users/login");
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await userService.login(email, password);

    res.cookie("token", token);
    res.redirect("/");
  } catch (err) {
    res.render("users/login", { error: getErrorMessage(err) });
  }
});

router.get("/register", (req, res) => {
  res.render("users/register");
});

router.post("/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const token = await userService.register({firstName,lastName,email,password});
    res.cookie("token", token);
    res.redirect("/");
  } catch (err) {
    res.render("users/register", { error: getErrorMessage(err) });
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});

module.exports = router;
