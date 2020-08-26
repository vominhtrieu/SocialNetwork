const User = require("../models/User");
const ChatRoom = require("../models/ChatRoom");
const Message = require("../models/Message");
const Post = require("../models/Post");
const socketAuth = require("../middlewares/socketAuth");
const { post } = require("../routes/auth");

module.exports = (io) => {
  io.use(socketAuth);
  io.on("connection", (socket) => {
    socket.join("u/" + socket.userId);

    require("./friend")(io, socket);
    require("./message")(io, socket);
    require("./post")(io, socket);

    socket.on("disconnect", () => {
      socket.leave("u/" + socket.userId);
    });
  });
};
111