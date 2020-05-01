const express = require("express");
const router = express.Router();
const User = require("../models/User");
const FriendRequest = require("../models/FriendRequest");
const checkAuth = require("../middlewares/checkAuth");

router.post("/addFriend", checkAuth, );

module.exports = router;
