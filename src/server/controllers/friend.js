const User = require("../models/User");
const FriendRequest = require("../models/FriendRequest");

exports.addFriend = async (req, res) => {
  try {
    const addId = Number(req.body.addId);
    if (req.body.id === addId) {
      return res.status(400).json("Cannot add yourself");
    }
    //Check if they are friend
    let user = await User.findOne({
      _id: req.body.addId,
      friends: { $elemMatch: { user: req.body.id } },
    }).exec();
    if (user) return res.status(400).json("You are already friend");

    user = await User.findById(req.body.id)
      .populate({ path: "friendRequest", match: { user: addId } })
      .exec();

    if (user.friendRequests.length !== 0)
      return res.status(400).json("You cannot sent this request");
    const addUser = await User.findById(addId)
      .populate({ path: "friendRequest", match: { user: req.body.id } })
      .exec();
    if (!addUser) {
      return res.status(400).json("Cannot find user to send request");
    }
    if (addUser.friendRequests.length !== 0)
      return res
        .status(400)
        .json("You already sent friend request to this person");

    const request = new FriendRequest({ user: req.body.id });
    await request.save();
    addUser.friendRequests.push(request._id);
    await addUser.save();
    res.status(200).json("Sent request");
  } catch (err) {
    res.status(500).json("Internal error " + err.code);
  }
};

exports.getFriendRequests = (req, res) => {
  User.findById(req.body.id)
    .populate({
      path: "friendRequests",
      model: "FriendRequest",
      populate: { path: "user", model: "User" },
    })
    .exec((err, user) => {
      if (err) res.status(500).json("Unable to get friend requests");
      else {
        const requestDetails = user.friendRequests.map((request) => {
          return {
            requestId: request._id,
            userId: request.user._id,
            firstName: request.user.firstName,
            lastName: request.user.lastName,
            avatar: request.user.avatar,
            date: request.requestedDate,
          };
        });
        res.json({ requests: requestDetails });
      }
    });
};

exports.respondFriendRequest = async (req, res) => {
  try {
    const request = await FriendRequest.findById(req.body.requestId).exec();
    if (!request) return res.status(400).json("Cannot respond to this request");
    await request.populate("user").execPopulate();

    await User.updateOne(
      { _id: req.body.id },
      { $pull: { friendRequests: req.body.requestId } }
    );

    if (req.body.accept) {
      req.body.user.friends.push({ user: request.user._id });
      request.user.friends.push({ user: req.body.id });

      await Promise.all([req.body.user.save(), request.user.save()]);
    }

    await FriendRequest.findByIdAndDelete(request._id);
    res.json("Action Completed");
  } catch (err) {
    res.status(500).json("Internal error");
  }
};

exports.unfriend = (req, res) => {
  User.findByIdAndUpdate(
    req.body.id,
    { $pull: { friends: { user: req.body.friendId } } },
    { useFindAndModify: true },
    (err) => {
      if (err)
        return res
          .status(400)
          .json("Unable to find this person in your friendlist");
      User.findByIdAndUpdate(
        req.body.friendId,
        { $pull: { friends: { user: req.body.id } } },
        { useFindAndModify: true },
        (err) => {
          if (err) return res.status(500).json("Internal error");
          res.json("You are no longer friend");
        }
      );
    }
  );
};

exports.getFriendList = (req, res) => {
  User.findById(req.params.id)
    .populate({
      path: "friends.user",
      model: "User",
    })
    .exec((err, user) => {
      if (err || !user) {
        console.log(err);
        res.status(400).json("Unable to get friend list");
      } else {
        const friendList = user.friends.map(({ user }) => {
          return {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            avatar: user.avatar,
          };
        });
        res.json(friendList);
      }
    });
};
