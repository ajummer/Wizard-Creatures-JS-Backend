const router = require("express").Router();
const creatureService = require("../services/creatureService.js");
const {isAuth} = require("../middlewares/authMiddleware.js")
 
router.get("/", (req, res) => {
  res.render("home");
});

router.get("/404", (req, res) => {
  res.render("404");
});

router.get("/profile", isAuth , async (req, res) => {
  const userId = req.user._id;
  const posts = await creatureService.getByOwner(userId).populate("owner").lean();
  console.log(posts)

  res.render("my-posts", { posts });
});

module.exports = router;
