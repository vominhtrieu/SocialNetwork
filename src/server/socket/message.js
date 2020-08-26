const ChatRoom = require("../models/ChatRoom");
const Message = require("../models/Message");

module.exports = (io, socket) => {
  socket.on("joinChatRoom", (data) => {
    ChatRoom.findOne({
      id: data.roomId,
      $elemMatch: {
        user: socket.userId,
      },
    }, (err, room) => {
      if(!err && room) {
        socket.join("r/" + roomId);
      }
    });
  });
  
  socket.on("message", (data) => {
    ChatRoom.findById(data.roomId, (err, room) => {
      if (!err && room) {
        const message = new Message({
          sender: socket.userId,
          textContent: data.textContent,
        });
        message
          .save()
          .then(() => {
            room.messages.push(message);
            room.participants.forEach((participant) => {
              if (participant.user === socket.userId) {
                participant.messageSeen = room.messages.length;
              }
            });
            room.save().then(() => {
              const respondData = {
                senderId: socket.userId,
                senderAvatar: socket.user.avatar,
                senderFirstName: socket.user.firstName,
                senderLastName: socket.user.lastName,
                textContent: data.textContent,
              };
              io.sockets.in(data.roomId).emit("message", respondData);

              room.participants.forEach((participant) => {
                io.to("m/" + participant.user).emit("newMessage", respondData);

              });
            });
          })
          .catch((err) => console.log(err));
      }
    });
  });

  socket.on("seen", ({ roomId, messageSeen }) => {
    ChatRoom.updateOne(
      { _id: roomId, "participants.user": socket.userId },
      {
        $set: {
          "participants.$.messageSeen": messageSeen,
        },
      },
      (err) => {
        if (!err) {
          socket
            .to(roomId)
            .emit("seen", { user: socket.userId, messageSeen: messageSeen });
        }
      }
    );
  });
};
