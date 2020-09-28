const socketAuth = require("../middlewares/socketAuth");

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