const router = require("express").Router();
const creatureService = require("../services/creatureService.js");
const { getErrorMessage } = require("../utils/errorHelpers.js");
const { emailExtractor } = require("../utils/utiity.js");

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
  console.log(req.user);
  try {
    const post = await creatureService
      .getOnePost(postId)
      .populate("votes.user")
      .lean();
    // get all voted users emails
    const votedUsers = emailExtractor(post?.votes);
    // check if current user voted
    const isVoted = votedUsers.includes(req.user?.email)
    const isOwner = req.user?._id == post.owner._id;
    res.render("posts/details", {
      post,
      isOwner,
      votes: post.votes.length,
      votedUsers,
      isVoted,
    });
  } catch (err) {
    res.render("posts/details", { error: getErrorMessage(err) });
  }
});

router.get("/details/:postId/edit", async (req, res) => {
  const postId = req.params.postId;
  try {
    const post = await creatureService.getOnePost(postId).lean();

    if (req.user._id == post.owner._id) {
      res.render("posts/edit", { post });
    } else {
      res.redirect("/404");
    }
  } catch (err) {
    res.render("posts/edit", { error: getErrorMessage(err) });
  }
});

router.post("/details/:postId/edit", async (req, res) => {
  const postId = req.params.postId;
  const post = req.body;
  try {
    const updatedPost = await creatureService.updateOnePost(postId, post);
    await updatedPost.save();
    res.redirect(`/posts/details/${postId}`);
  } catch (err) {
    res.render("posts/edit", { post, error: getErrorMessage(err) });
  }
});

router.get("/details/:postId/delete", async (req, res) => {
  const postId = req.params.postId;
  try {
    const post = await creatureService.getOnePost(postId);
    if (req.user._id == post.owner._id) {
      await creatureService.deletePost(postId);
      res.redirect("/posts");
    } else {
      res.redirect("/404");
    }
  } catch (err) {
    res.render(`/posts/details/${postId}`, {
      error: "Unsuccessfull attempt to delete the post!",
    });
  }
});

router.get("/details/:postId/votes", async (req, res) => {
  const postId = req.params.postId;
  const user = req.user._id;

  try {
    await creatureService.addVote(postId, { user });
    res.redirect(`/posts/details/${postId}`);
  } catch (err) {
    res.render("posts/details", { error: getErrorMessage(err) });
  }
});

module.exports = router;
