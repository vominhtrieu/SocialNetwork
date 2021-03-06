require('dotenv').config();

const User = require('../models/User');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) res.status(401).json('Unauthorized');
  else {
    jwt.verify(token, process.env.JWT_TOKEN_SECRET, function (err, data) {
      if (err) {
        res.status(401).json('Invalid token');
      } else {
        req.body.id = data.id;
        User.findById(req.body.id, (err, user) => {
          if (err || !user) {
            res.json('Not found user');
          } else {
            req.body.user = user;
            req.user = user;
            next();
          }
        });
      }
    });
  }
};
