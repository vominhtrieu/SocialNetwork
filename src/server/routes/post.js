const express = require("express");
const router = express.Router();
const checkAuth = require("../middlewares/checkAuth");
const postController = require("../controllers/post");

router.post("/newpost", checkAuth, postController.addNewPost);
router.get("/:id/posts", checkAuth, postController.getPost);

module.exports = router;