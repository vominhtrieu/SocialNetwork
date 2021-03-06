const User = require("../models/User");
const FriendRequest = require("../models/FriendRequest");
const ChatRoom = require("../models/ChatRoom");
const Notification = require("../models/Notification");

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

    if (user.friendRequests.length !== 0) return res.status(400).json("You cannot sent this request");
    const addUser = await User.findById(addId)
      .populate({ path: "friendRequest", match: { user: req.body.id } })
      .exec();
    if (!addUser) {
      return res.status(400).json("Cannot find user to send request");
    }

    if (addUser.friendRequests.length !== 0)
      return res.status(400).json("You already sent friend request to this person");

    const request = new FriendRequest({ user: req.body.id });
    await request.save();
    addUser.friendRequests.push(request._id);
    await addUser.save();
    res.status(200).json("Sent request");
  } catch (err) {
    res.status(500).json("Internal error " + err.code);
  }
};

exports.getFriendRequest = (req, res) => {
  FriendRequest.findById(req.query.id)
    .populate("user", "firstName lastName avatar")
    .exec((err, request) => {
      if (err) return res.status(500);
      if (!request) return res.status(400);
      res.json(request);
    });
};

exports.getFriendRequests = (req, res) => {
  User.findById(req.body.id, (err, user) => {
    if (err) res.status(500).json("Unable to get friend requests");
    else {
      console.log(user.friendRequests);
      res.json({ requests: user.friendRequests });
    }
  });
};

exports.respondFriendRequest = async (req, res) => {
  try {
    const request = await FriendRequest.findById(req.body.requestId).exec();
    if (!request) return res.status(400).json("Cannot respond to this request");
    await request.populate("user").execPopulate();

    await User.updateOne({ _id: req.body.id }, { $pull: { friendRequests: req.body.requestId } });

    if (req.body.accept) {
      req.body.user.friends.push({ user: request.user._id });
      request.user.friends.push({ user: req.body.id });
      await req.body.user
        .populate({
          path: "chatRooms",
          match: {
            participants: { $elemMatch: { user: request.user._id } },
          },
        })
        .execPopulate();

      await request.user
        .populate({
          path: "chatRooms",
          match: {
            participants: { $elemMatch: { user: req.body.id } },
          },
        })
        .execPopulate();

      if (req.body.user.chatRooms.length === 0 && request.user.chatRooms.length === 0) {
        const participants = [{ user: req.body.id }, { user: request.user._id }];
        const room = new ChatRoom({
          participants: participants,
        });
        await room.save();
        req.body.user.chatRooms.push(room._id);
        request.user.chatRooms.push(room._id);
      }

      const noti = new Notification({
        user: req.body.user._id,
        html: `${req.body.user.lastName} has accepted your friend request`,
        link: `/${req.body.user._id}`,
      });
      await noti.save();
      request.user.notifications.push(noti);

      await Promise.all([req.body.user.save(), request.user.save()]);
    }

    await FriendRequest.findByIdAndDelete(request._id);
    res.json("Action Completed");
  } catch (err) {
    res.status(500).json("Internal error" + err);
  }
};

exports.cancelRequest = async (req, res) => {
  try {
    const request = await FriendRequest.findById(req.body.requestId).exec();
    if (!request) return res.status(400).json("Cannot respond to this request");
    await request.populate("user").execPopulate();
    await User.updateOne({ _id: req.body.id }, { $pull: { friendRequests: req.body.requestId } });
    await User.updateOne({ _id: req.body.userId }, { $pull: { friendRequests: req.body.requestId } });
    await FriendRequest.findByIdAndDelete(request._id);
    res.status(201).json("Successfully cancel your request");
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.unfriend = (req, res) => {
  User.findByIdAndUpdate(
    req.body.id,
    { $pull: { friends: { user: req.body.friendId } } },
    { useFindAndModify: true },
    (err) => {
      if (err) return res.status(400).json("Unable to find this person in your friendlist");
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

exports.getFriendList = async (req, res) => {
  const user = await User.findById(req.params.id)
    .populate({
      path: "friends.user",
      model: "User",
    })
    .exec();
  if (!user) {
    return res.status(400).json("Unable to get friend list");
  }
  const friendList = await Promise.all(
    user.friends.map(async ({ user }) => {
      let friend = {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar,
        friendCount: user.friends.length,
      };
      let status = "Nothing";
      let requestUser = await User.populate(req.user, "friendRequests");
      if (user.friends.filter((friend) => friend.user === req.body.id).length === 1) status = "Friend";
      else if (requestUser.friendRequests.filter((request) => request.user === user._id).length === 1) {
        friend.request = requestUser.friendRequests.find((request) => request.user === user._id);
        status = "Wait";
      } else if (user.friendRequests.filter((request) => request.user === req.body.id).length > 0) {
        friend.request = user.friendRequests.find((request) => request.user === req.body.id);
        status = "Pending";
      }

      friend.status = status;

      return friend;
    })
  );

  res.json(friendList);
};
