const Image = require('../models/Image');
const { s3 } = require('../services/fileUpload');
const imageResizer = require('../services/imageResize');

exports.getImage = function (req, res) {
  if (req.params.id === 'undefined') {
    return res.json(null);
  }
  Image.findById(Number(req.params.id), (err, img) => {
    if (err) return res.status(400).json('Image not found');
    s3.getObject(
      {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: img.key,
      },
      (err, data) => {
        if (err) {
          return res.status(500).json('Image seem to be lost');
        }
        res.writeHead(200, { 'Content-Type': 'image/jpeg' });
        res.write(data.Body, 'binary');
        res.end(null, 'binary');
      }
    );
  });
};

exports.uploadAvatar = function (req, res) {
  imageResizer.resize(req.files.file, (err, url, shortUrl) => {
    if (err) return res.status(500);

    const image = new Image({
      user: Number(req.user.id),
      type: 'avatar',
      key: req.file.key,
      privacy: 0,
    });

    image.save((err) => {
      if (err) {
        return res.status(500);
      }
      req.user.avatar = image._id;
      req.user.save((err) => {
        if (err) return res.status(500).json(err);
        return res.status(200);
      });
    });
  });
};

exports.uploadCover = function (req, res) {
  const image = new Image({
    user: Number(req.user.id),
    type: 'cover',
    key: req.file.key,
    privacy: 0,
  });
  image.save((err) => {
    if (err) {
      return res.status(500);
    }
    req.user.cover = image._id;
    req.user.save((err) => {
      if (err) return res.status(500);
      return res.status(200);
    });
  });
};
