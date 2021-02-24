const path = require("path");
const fs = require("fs");
const IdRecord = require("../models/IdRecord");
const multer = require("multer");

//Create images folder if not existed
if (!fs.existsSync(path.join(__dirname, "../images"))) {
  fs.mkdirSync(path.join(__dirname, "../images"));
}

module.exports = multer({
  storage: multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, path.join(__dirname, "../images"));
    },
    filename: async function (_req, file, callback) {
      try {
        const data = await IdRecord.findOneAndUpdate(
          { model: "Image" },
          { $inc: { recentId: 1 } },
          { new: true, useFindAndModify: false }
        );

        callback(null, data.recentId.toString());
      } catch (err) {
        callback(err);
      }
    },
  }),
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    return callback(null, ext === ".png" || ext === ".jpg" || ext === ".jpeg");
  },
});
