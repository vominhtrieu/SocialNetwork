require("dotenv").config();

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) res.status(401).json("Unauthorized");
  else {
    jwt.verify(token, process.env.JWT_SECRET, function (err, data) {
      if (err) {
        res.status(401).json("Invalid token");
      } else {
        req.body.id = data.id;
        next();
      }
    });
  }
};
