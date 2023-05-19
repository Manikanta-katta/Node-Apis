const path = require("path");
const multer = require("multer");
const multer_s3 = require("multer-s3");
const { s3 } = require("../s3_bucket/s3_bucketConfig");
const fs = require("fs");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, callback) => {
    // if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "audio/mp3") {
    callback(null, true);
    // } else {
    console.log("only jpg & png file supported!");
    callback(null, false);
    // }
  },
  limits: {
    fileSize: 1024 * 1024 * 1024 * 3,
  },
});

// var s3upload = multer-s3.memoryStorage({

// })

module.exports = upload;
