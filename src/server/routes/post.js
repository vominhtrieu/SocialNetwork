const express = require("express");
const router = express.Router();
const checkAuth = require("../middlewares/checkAuth");
const postController = require("../controllers/post");

router.post("/posts", checkAuth, postController.addNewPost);
router.get("/:id/posts", checkAuth, postController.getUserPost);
router.get("/posts/:id", checkAuth, postController.getPost);
router.get("/feed", checkAuth, postController.getFeed);
router.post("/posts/:postId/share", checkAuth, postController.sharePost);

module.exports = router;
