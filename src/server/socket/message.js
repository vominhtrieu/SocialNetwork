const ChatRoom = require("../models/ChatRoom");
const Message = require("../models/Message");

module.exports = (io, socket) => {
  socket.on("joinRoom", ({ roomId }) => {
    socket.join("r/" + roomId);
  });

  socket.on("leaveRoom", ({ roomId }) => {
    socket.leave("r/" + roomId);
  });

  socket.on("message", (data) => {
    if (data.textContent === "") {
      return;
    }
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

            //Because user sent this message, user must read this message
            //==> Number of messages this user seen = number of messages in rooms
            room.participants.forEach((participant) => {
              if (participant.user === socket.userId) {
                participant.messageSeen = room.messages.length;
              }
            });
            room.save().then(() => {
              const respondData = {
                ...message.toObject(),
                roomId: room._id,
              };

              const updateData = {
                roomId: room._id,
              };

              room.participants.forEach((participant) => {
                if (participant.user !== socket.userId) io.to("u/" + participant.user).emit("newMessage", updateData);
                io.to("u/" + participant.user).emit("message", respondData);
              });
              io.to("u/", socket.userId).emit("seen", updateData);
            });
          })
          .catch((err) => console.log(err));
      }
    });
  });

  socket.on("typing", ({ roomId }) => {
    socket.to("r/" + roomId).emit("typing", {
      sender: socket.userId,
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
          io.to("u/" + socket.userId).emit("seen", { roomId: roomId });
          socket.to(`r/${roomId}`).emit("seenMessage", { user: socket.userId, messageSeen });
        }
      }
    );
  });
};
