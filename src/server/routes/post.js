const express = require("express");
const router = express.Router();
const checkAuth = require("../middlewares/checkAuth");
const postController = require("../controllers/post");
const upload = require("../services/fileUpload");

router.post("/posts", checkAuth, upload.any(), postController.addNewPost);
router.get("/:id/posts", checkAuth, postController.getUserPost);
router.get("/posts/:id", checkAuth, postController.getPost);
router.get("/feed", checkAuth, postController.getFeed);
router.post("/posts/:postId/share", checkAuth, postController.sharePost);
router.delete("/posts/:postId", checkAuth, postController.deletePost);

module.exports = router;
