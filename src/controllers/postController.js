const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("posts");
});

router.get("/create" , (req,res) =>{
  res.render("posts/create")
})
module.exports = router;
