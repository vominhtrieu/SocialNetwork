const express = require("express");
const router = express.Router();
const checkAuth = require("../middlewares/checkAuth");
const userController = require("../controllers/user");

router.get("/auth", checkAuth, userController.auth);

router.get("/profile", checkAuth, userController.getProfile);

router.get("/:id", checkAuth, userController.getProfileById);

module.exports = router;