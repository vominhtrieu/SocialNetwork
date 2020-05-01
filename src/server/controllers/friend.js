exports.addFriend = (req, res) => {
  if (req.body.id === req.body.addId) {
    res.status(400).json("Cannot add yourself");
  } else {
    User.findById(req.body.addId, (err) => {
      if (err) {
        res.status(400).json("Cannot find user to send request");
      } else {
        const request = new FriendRequest({ userId: req.body.id });

        request.save().catch((err) => res.status(500).json("Internal error"));
        req.body.user.friendRequests.push(request._id);
        req.body.user
          .save()
          .then(() => {
            res.status(200).json("Sent request");
          })
          .catch((err) => res.status(500).json("Internal error"));
      }
    });
  }
};
