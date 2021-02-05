// const aws = require('aws-sdk');
// const fs = require('fs');

// aws.config.update({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   region: process.env.AWS_REGION,
// });

// const s3 = new aws.S3();

// exports.uploadImage = (file, next) => {
//   fs.readFile(file.path, (err, data) => {
//     if (err) {
//       next(err);
//     } else {
//       const readStream = fs.createReadStream(file);
//       const transform = sharp
//     }
//   });
// };

const multer = require('multer');
const sharp = require('sharp');

module.exports = multer({
  storage: multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, '../images');
    },
    filename: function (_req, file, callback) {
      callback(null, file.fieldname + '-' + Date.now());
    },
  }),
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    return callback(null, ext === '.png' || ext === '.jpg' || ext === '.jpeg');
  },
});
