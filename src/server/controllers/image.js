const User = require("../models/User");
const Image = require("../models/Image");
const mime = require("mime-types");
const multer = require("multer");
const path = require("path");

exports.getImage = function (req, res) {
  Image.findById(Number(req.params.id), (err, img) => {
    if (err) res.status(400).json("Image not found");
    else {
      if (img.privacy != 0) res.status(400).json("Unauthorization");
      else
        res.sendFile(
          path.join(
            __dirname,
            "../public/images",
            req.params.id + "." + img.extension
          )
        );
    }
  });
};

exports.uploadAvatar = function (req, res) {
  const user = req.body.user;
  if (user.avatar) {
    Image.deleteOne({ _id: user.avatar }, (err) => {
      if (err) console.log(err);
    });
  }
  let img = null;

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/images");
    },
    filename: async function (req, file, cb) {
      img = new Image({
        user: Number(user.id),
        extension: mime.extension(file.mimetype),
      });
      await img.save();
      cb(null, String(img._id) + "." + img.extension);
    },
  });

  const imageUploader = multer({ storage });
  const uploader = imageUploader.single("avatar");
  uploader(req, res, function (err) {
    if (err) res.status(500).json("Unable to upload");
    else {
      user.avatar = img._id;
      user
        .save()
        .then(() => {
          res.json("Successfully upload");
        })
        .catch(() => {
          res.status(500).json("Unable to upload");
        });
    }
  });
};

exports.uploadCover = function (req, res) {
  const user = req.body.user;
  if (user.cover) {
    Image.deleteOne({ _id: user.cover }, (err) => {
      if (err) console.log(err);
    });
  }
  let img = null;

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/images");
    },
    filename: async function (req, file, cb) {
      img = new Image({
        user: Number(user.id),
        extension: mime.extension(file.mimetype),
      });
      await img.save();
      cb(null, String(img._id) + "." + img.extension);
    },
  });

  const imageUploader = multer({ storage });
  const uploader = imageUploader.single("cover");
  uploader(req, res, function (err) {
    if (err) res.status(500).json("Unable to upload");
    else {
      user.cover = img._id;
      user
        .save()
        .then(() => {
          res.json("Successfully upload");
        })
        .catch(() => {
          res.status(500).json("Unable to upload");
        });
    }
  });
};