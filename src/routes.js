const router = require("express").Router();

const homeController = require("./controllers/homeController.js");
const userController = require("./controllers/userController.js");
const postController = require("./controllers/postController.js");

router.use(homeController);
router.use("/users", userController);
router.use("/posts", postController);
router.get("*", (req, res) => {
  res.redirect("/404");
});

module.exports = router;
