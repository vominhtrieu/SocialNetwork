const User = require("../models/User");
const CallingRoom = require("../models/CallingRoom");

module.exports = async (io, socket) => {
  socket.on("createNewCallingRoom", async (data) => {
    try {
      const user = await User.findById(socket.userId);
      //Validate valid participants
      const friendList = user.friends.map(({ user }) => user);

      data.participants.forEach((participant) => {
        if (!friendList.includes(participant)) {
          throw new Error("Invalid participant(s)");
        }
      });

      data.participants.push(socket.userId);

      const room = new CallingRoom({
        participants: data.participants,
      });

      await room.save();

      room.participants.forEach((participant) => {
        if (participant === socket.userId) return;
        io.to(`u/${participant}`).emit("call", { roomId: room._id });
      });

      socket.emit("roomCreated", {
        roomId: room._id,
        caller: {
          _id: user._id,
          lastName: user.lastName,
          avatar: user.avatar,
        },
      });
    } catch (e) {
      socket.emit("error", e);
    }
  });

  socket.on("joinCallingRoom", async ({ roomId }) => {
    try {
      const room = await CallingRoom.findById(roomId);
      if (!room) {
        return socket.emit("error", "Room not found");
      }

      if (!room.participants.includes(socket.userId)) {
        return socket.emit("error", "You are not invited to join this room");
      }

      io.to(roomId).emit("userJoined", { userId: socket.userId });
      socket.join(roomId);
    } catch (err) {
      socket.emit("error", err.message);
    }
  });

  socket.on("cancelCall", ({ roomId }) => {});
};
