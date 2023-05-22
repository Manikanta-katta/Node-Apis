const multer = require("multer");
// const { s3 } = require("../s3_bucket/s3_bucketConfig");
const fs = require("fs");

const storage = multer.memoryStorage({});

const upload = multer({
  storage: storage,
});

module.exports = upload;
