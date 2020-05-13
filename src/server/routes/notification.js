const express = require("express");
const router = express.Router();
const checkAuth = require("../middlewares/checkAuth");
const notificationController = require("../controllers/notification");

//Check for anything news
router.get("/update", checkAuth, notificationController.getUpdate);

module.exports = router;