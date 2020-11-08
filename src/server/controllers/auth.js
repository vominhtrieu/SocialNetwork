const User = require('../models/User');
const jwt = require('jsonwebtoken');

function validateEmail(email) {
  return /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email);
}

function validatePassword(password) {
  return /[A-Za-z\d@$!%*#?&]{8,60}$/.test(password);
}

exports.signUp = (req, res) => {
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
        res.json('Email is registered');
      } else {
        const newUser = new User({
          firstName,
          lastName,
          email,
          password,
        });
        newUser.save().then((user) => res.json('Successfully registered'));
      }
    });
  } else res.status(400).json('Refuse data');
};

exports.signIn = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email }, function (err, user) {
    if (err) {
      res.status(500).json('Internal error');
    } else if (!user) {
      res.status(400).json('Incorrect email or password');
    } else {
      user.validatePassword(password, function (err, same) {
        if (err) {
          res.status(500).json('Internal error');
        } else if (!same) {
          res.status(400).json('Incorrect email or password');
        } else {
          const payload = { id: user._id };
          const token = jwt.sign(payload, process.env.JWT_TOKEN_SECRET);

          res
            .cookie('token', token, { httpOnly: true })
            .status(200)
            .json('Successfully Login');
        }
      });
    }
  });
};

exports.signOut = (req, res) => {
  const token = req.cookies.token;
  res
    .cookie('token', token + 'alo test', { httpOnly: true, maxAge: 100 })
    .sendStatus(200);
};
