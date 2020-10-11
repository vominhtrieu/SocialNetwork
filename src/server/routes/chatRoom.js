const express = require("express");
const router = express.Router();
const checkAuth = require("../middlewares/checkAuth");
const chatRoomController = require("../controllers/chatRoom");

router.get("/chatrooms", checkAuth, chatRoomController.getRoomList);
router.get("/room/:id", checkAuth, chatRoomController.getRoom);
router.get("/room/:id/messages", checkAuth, chatRoomController.getMessages);
router.post("/room/new", checkAuth, chatRoomController.createNewRoom);

module.exports = router;
