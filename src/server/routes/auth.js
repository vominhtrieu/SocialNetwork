const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

function validateEmail(email) {
  return /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email);
}

function validatePassword(password) {
  return /[A-Za-z\d@$!%*#?&]{8,60}$/.test(password);
}

router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email }, function (err, user) {
    if (err) {
      res.status(500).json("Internal error");
    } else if (!user) {
      res.status(400).json("Incorrect email or password 1");
    } else {
      user.validatePassword(password, function (err, same) {
        if (err) {
          res.status(500).json("Internal error");
        } else if (!same) {
          res.status(400).json("Incorrect email or password");
        } else {
          const payload = { id: user._id };
          const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1h",
          });
          
          res.cookie("token", token, { httpOnly: true, maxAge: 10*3600000 }).status(200).json("Successfully Login");
        }
      });
    }
  });
});

router.post("/signup", (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (
    firstName &&
    lastName &&
    email &&
    password &&
    validateEmail(email) &&
    validatePassword(password)
  ) {
    //Accept data
    User.findOne({ email: email }).then((user) => {
      if (user) {
        res.json("Email is registered");
      } else {
        const newUser = new User({
          firstName,
          lastName,
          email,
          password,
        });
        newUser.save().then((user) => res.json("Successfully registered"));
      }
    });
  } else res.status(400).json("Refuse data");
});

module.exports = router;
