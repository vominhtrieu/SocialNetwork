const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    metadata: function (_req, file, cb) {
      cb(null, { fieldname: file.fieldname });
    },
    key: function (_req, file, cb) {
      cb(
        null,
        //Some random number for preventing duplicate name
        `${Date.now().toString()}-${file.originalname}-${Math.floor(
          Math.random() * 1000
        )}`
      );
    },
  }),
});

module.exports = {
  s3,
  upload,
};
