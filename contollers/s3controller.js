const s3 = require("../s3Config");
const Audiofile = require("../models/audio-to-text");

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
      const audiofiles = new Audiofile({
        name: req.body.name,
        audiofile: `${data.Location}`,
      });
      audiofiles
        .save()
        .then((response) => {
          res.status(200).json({
            message: "Audio added successfully!",
            response,
          });
        })
        .catch((err) => {
          res.json({
            message: " An error Occured!",
          });
        });
    }
  });
};
module.exports = { upload };
