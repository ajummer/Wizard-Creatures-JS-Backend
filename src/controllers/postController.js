const router = require("express").Router();
const creatureService = require("../services/creatureService.js");
const { getErrorMessage } = require("../utils/errorHelpers.js");

router.get("/", (req, res) => {
  res.render("posts");
});

router.get("/create", (req, res) => {
  res.render("posts/create");
});

router.post("/create", async (req, res) => {
  const creatureData = {
    ...req.body,
    owner: req.user._id,
  };
  console.log(creatureData)
  try {
    await creatureService.create(creatureData);
    res.redirect("/posts");
  } catch (err) {
    res.render("posts/create", { error: getErrorMessage(err) });
  }
});
module.exports = router;
