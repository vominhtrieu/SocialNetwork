exports.getUpdate = (req, res) => {
  res.json({
    newFriendRequests: req.body.user.friendRequests.length,
  });
};