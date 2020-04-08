require("dotenv").config();

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

mongoose.set("useCreateIndex", true);
const saltRound = 10;

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  registerDate: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre("save", function (next) {
  console.log("here");
  if (this.isNew || this.isModified("password")) {
    const document = this;
    bcrypt.hash(document.password, saltRound, function (err, hash) {
      if (err) next(err);
      else {
        document.password = hash;
        next();
      }
    });
  }
});

UserSchema.methods.validatePassword = function (password, callback) {
  bcrypt.compare(password, this.password, function(err, same) {
    if(err)
      callback(err)
    else
      callback(err, same);
  })
};

module.exports = mongoose.model("User", UserSchema);
