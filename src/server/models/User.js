require("dotenv").config();

const mongoose = require("mongoose");
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
  friendRelationships: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FriendRelationship",
    },
  ],
  friendRequests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FriendRequest",
    },
  ],
});

UserSchema.pre("save", function (next) {
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
  else {
    next();
  }
});

UserSchema.methods.validatePassword = function (password, callback) {
  bcrypt.compare(password, this.password, function (err, same) {
    if (err) callback(err);
    else callback(err, same);
  });
};

module.exports = mongoose.model("User", UserSchema);
