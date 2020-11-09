const socketAuth = require('../middlewares/socketAuth');
const User = require('../models/User');
const redisClient = require('../services/redisClient');

module.exports = (io) => {
  io.use(socketAuth);
  io.on('connection', (socket) => {
    socket.join('u/' + socket.userId);
    redisClient.get(socket.userId, (err, clientCount) => {
      if (!err && clientCount) {
        //Emit to all friend online event
        User.findById(socket.userId, (err, user) => {
          if (!err && user) {
            const onlineUserList = [];

            user.friends.forEach((friend, index) => {
              redisClient.get(friend.user, (err, friendClientCount) => {
                if (!err && friendClientCount && friendClientCount > 0) {
                  io.to('u/' + friend.user).emit('online', socket.userId);
                  onlineUserList.push(friend.user);

                  if (index === user.friends.length - 1) {
                    console.log(onlineUserList);
                    io.to(socket.id).emit('onlineList', onlineUserList);
                  }
                }
              });
            });
            redisClient.set(socket.userId, 1);
          }
        });
      } else {
        redisClient.set(socket.userId, clientCount + 1);
      }
    });

    require('./friend')(io, socket);
    require('./message')(io, socket);
    require('./post')(io, socket);

    socket.on('disconnect', () => {
      redisClient.get(socket.userId, (err, clientCount) => {
        if (err || clientCount === null) return;
        redisClient.set(socket.userId, clientCount - 1);
        if (clientCount == 1) {
          User.findById(socket.userId, (err, user) => {
            if (!err && user) {
              user.friends.forEach((friend) => {
                io.to('u/' + friend.user).emit('offline', socket.userId);
              });
            }
          });
        }
      });
    });
  });
};
