require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const DataId = require("./IdRecord");

mongoose.set("useCreateIndex", true);
const saltRound = 10;

const FriendRelationshipSchema = new mongoose.Schema(
  {
    user: {
      type: Number,
      ref: "User",
    },
    type: {
      type: String,
      default: "Normal",
    },
    since: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const UserSchema = new mongoose.Schema({
  _id: Number,
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
  friends: [FriendRelationshipSchema],
  friendRequests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FriendRequest",
    },
  ],
  avatar: {
    type: Number,
    ref: "Image",
  },
  cover: {
    type: Number,
    ref: "Image",
  },
  posts: [
    {
      type: Number,
      ref: "Post",
    },
  ],
  chatRooms: [
    {
      type: Number,
      ref: "ChatRoom",
    },
  ],
  images: [
    {
      type: Number,
      ref: "Image",
    },
  ],
});

UserSchema.pre("save", function (next) {
  if (this.isNew) {
    const document = this;
    DataId.findOneAndUpdate(
      { model: "User" },
      { $inc: { recentId: 1 } },
      { new: true, useFindAndModify: false },
      (err, data) => {
        if (err) next(err);
        else {
          document._id = data.recentId;
          bcrypt.hash(document.password, saltRound, function (err, hash) {
            if (err) next(err);
            else {
              document.password = hash;
              next();
            }
          });
        }
      }
    );
  } else if (this.isModified("password")) {
    bcrypt.hash(document.password, saltRound, function (err, hash) {
      if (err) next(err);
      else {
        document.password = hash;
        next();
      }
    });
  } else {
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
