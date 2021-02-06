const express = require("express");
const router = express.Router();
const checkAuth = require("../middlewares/checkAuth");
const upload = require("../services/fileUpload");
const imageController = require("../controllers/image");

router.post("/avatar", checkAuth, upload.single("avatar"), imageController.uploadAvatar);
router.post("/cover", checkAuth, upload.single("cover"), imageController.uploadCover);
router.get("/images/:id", checkAuth, imageController.getImage);

module.exports = router;
