const express = require("express");
const router = express.Router();
const friendController = require("../controllers/friend");
const checkAuth = require("../middlewares/checkAuth");

router.post("/addfriend", checkAuth, friendController.addFriend);
router.get("/friendrequests", checkAuth, friendController.getFriendRequests);
router.post("/respondFriendRequest", checkAuth, friendController.respondFriendRequest);
router.post("/unfriend", checkAuth, friendController.unfriend);
router.get("/:id/friends", checkAuth, friendController.getFriendList);

module.exports = router;
