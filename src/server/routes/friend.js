const express = require("express");
const router = express.Router();
const User = require("../models/User");
const FriendRequest = require("../models/FriendRequest");
const authMiddleware = require("../middlewares/auth");

router.post("/addFriend", authMiddleware, (req, res) => {
  if (req.body.id === req.body.addId) {
    res.status(400).json("Cannot add yourself");
  } else {
    User.findById(req.body.addId, (err) => {
      if (err) {
        res.status(400).json("Cannot find user to send request");
      } else {
        const request = new FriendRequest({ userId: req.body.id });

        request.save().catch((err) => res.status(500).json("Internal error"));
        User.findById(req.body.id, (err, receiver) => {
          if (err) {
            res.status(400).json("Invalid access token");
          } else {
            receiver.friendRequests.push(request._id);
            receiver
              .save()
              .then(() => {
                console.log(receiver);
                res.status(200).json("Sent request");
              })
              .catch((err) => res.status(500).json("Internal error"));
          }
        });
      }
    });
  }
});

module.exports = router;
