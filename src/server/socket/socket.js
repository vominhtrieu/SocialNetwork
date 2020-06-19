const User = require("../models/User");
const ChatRoom = require("../models/ChatRoom");
const Message = require("../models/Message");
const socketAuth = require("../middlewares/socketAuth");
let connectedUser = {};

module.exports = (io) => {
  io.use(socketAuth);
  io.on("connection", (socket) => {
    if (connectedUser[socket.userId]) {
      connectedUser[socket.userId].push(socket.id);
    } else {
      connectedUser[socket.userId] = [socket.id];
    }

    socket.on("sendFriendRequest", (data) => {
      User.findById(data.friendId, (err, user) => {
        if (!err && user) {
          const connectedSockets = connectedUser[data.friendId];
          connectedSockets.forEach((socketId) => {
            io.to(socketId).emit("newFriendRequest", {
              newFriendRequest: user.friendRequests.length,
            });
          });
        }
      });
    });

    socket.on("respondFriendRequest", () => {
      const connectSocket = connectedUser[socket.userId];
      User.findById(socket.userId, (err, user) => {
        if (user) {
          connectSocket.forEach((socketId) => {
            io.to(socketId).emit("newFriendRequest", {
              newFriendRequest: user.friendRequests.length,
            });
          });
        }
      });
    });

    socket.on("joinRoom", (data) => {
      ChatRoom.findById(data.roomId, (err, room) => {
        if (room && room.participants.indexOf(socket.userId) !== -1) {
          socket.join(data.roomId);
        }
      });
    });

    socket.on("leaveRoom", (data) => {
      socket.leave(data.roomId);
    });

    socket.on("message", (data) => {
      ChatRoom.findById(data.roomId, (err, room) => {
        if (room) {
          const message = new Message({
            sender: socket.userId,
            textContent: data.textContent,
          });
          message.save().then(()=>{
            room.chatHistory.push(message);
            room.save().then(() => {
              io.sockets.in(data.roomId).emit("message", {
                senderId: socket.userId,
                senderAvatar: socket.user.avatar,
                senderFirstName: socket.user.firstName,
                senderLastName: socket.user.lastName,
                textContent: data.textContent,
              });
            })
          }).catch(err => console.log);
        }
      });
    });

    socket.on("disconnect", () => {});
  });
};
