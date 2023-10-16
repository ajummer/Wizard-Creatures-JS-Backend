const router = require("express").Router();
const creatureService = require("../services/creatureService.js");
const { getErrorMessage } = require("../utils/errorHelpers.js");

router.get("/", async (req, res) => {
  const posts = await creatureService.getAllPosts().lean();
  res.render("posts", { posts });
});

router.get("/create", (req, res) => {
  res.render("posts/create");
});

router.post("/create", async (req, res) => {
  const creatureData = {
    ...req.body,
    owner: req.user._id,
  };
  try {
    await creatureService.create(creatureData);
    res.redirect("/posts");
  } catch (err) {
    res.render("posts/create", { error: getErrorMessage(err) });
  }
});

router.get("/details/:postId", async (req, res) => {
  const postId = req.params.postId;
  const post = await creatureService.getOnePost(postId).lean();
  const isOwner = req.user?._id == post.owner._id
  res.render("posts/details", { post , isOwner });
});
module.exports = router;
