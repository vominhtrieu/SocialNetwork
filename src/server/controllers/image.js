const Image = require("../models/Image");
const path = require("path");

exports.getImage = function (req, res) {
  if (req.params.id === "undefined") {
    return res.json(null);
  }
  res.sendFile(path.join(__dirname, `../images/${req.params.id}`));
};

exports.uploadAvatar = async function (req, res) {
  try {
    const image = new Image({
      _id: req.file.filename,
      user: Number(req.user.id),
      type: "avatar",
      privacy: 0,
    });
    await image.save();
    req.user.avatar = image._id;
    await req.user.save();
    res.json({ imageId: image._id });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.uploadCover = async function (req, res) {
  try {
    const image = new Image({
      _id: req.file.filename,
      user: Number(req.user.id),
      type: "cover",
      privacy: 0,
    });
    await image.save();
    req.user.cover = image._id;
    await req.user.save();
    res.json({ imageId: image._id });
  } catch (err) {
    res.status(500).json(err);
  }
};
