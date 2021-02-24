require("dotenv").config();

var cookie = require("cookie");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

module.exports = (socket, next) => {
  if (!socket.request.headers.cookie) return;
  const { token } = cookie.parse(socket.request.headers.cookie);

  if (!token) next(new Error("Token is not existed"));
  else {
    jwt.verify(token, process.env.JWT_TOKEN_SECRET, function (err, data) {
      if (err) {
        next(err);
      } else {
        socket.userId = data.id;
        User.findById(data.id, (err, user) => {
          if (err || !user) {
            next(new Error("Not found user"));
          } else {
            socket.user = user;
            next();
          }
        });
      }
    });
  }
};
