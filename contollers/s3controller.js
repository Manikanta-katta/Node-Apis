const s3 = require("../s3Config");

const upload = (req, res) => {
  const params = {
    Bucket: s3.config.bucketname,
    Key: req.file.originalname.replace(/\s+/g, "-"),
    Body: req.file.buffer,
  };

  s3.config.clientaccess.upload(params, (err, data) => {
    if (err) {
      res.status(500).json({
        message: err,
      });
    } else {
      res.status(200).json({
        message: "file uploaded successfully",
        Oject_url: `${data.Location}`,
      });
    }
  });
};
module.exports = { upload };
