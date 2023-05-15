const Audiofile = require("../models/audio-to-text");

const store = (req, res, next) => {
  let audiofile = new Audiofile({
    name: req.body.name,
    audiofile: req.body.audiofile,
  });
  // if (req.file) {
  //   audiofile.file = req.file.path;
  // }
  audiofile
    .save()
    .then((response) => {
      res.json({
        message: "Audio added successfully!",
      });
    })
    .catch((err) => {
      res.json({
        message: " An error Occured!",
      });
    });
  console.log(audiofile);
};
module.exports = { store };
