const express = require("express");
const router = express.Router();
const checkAuth = require("../middlewares/checkAuth");
const imageController = require("../controllers/image");

router.post("/avatar", checkAuth, imageController.uploadAvatar);
router.post("/cover", checkAuth, imageController.uploadCover);
router.get("/image", checkAuth, imageController.getImage);

module.exports = router;