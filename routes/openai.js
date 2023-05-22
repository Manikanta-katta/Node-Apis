const express = require("express");
const multer = require("multer");
const router = express.Router();
const upload = require("../middleware/upload");
const Audiofile = require("../contollers/audio-to-text");
const audio = require("../models/audio-to-text");
const controller = require("../contollers/s3controller");
const { Deepgram } = require("@deepgram/sdk");

// The API key we created in step 3
const deepgramApiKey = "19c0faa4995755f6d82bd7b191c5f370e6162c1f";

// Hosted sample file

// Initializes the Deepgram SDK
const deepgram = new Deepgram(deepgramApiKey);
router.post("/upload", Audiofile.store);

const gettext = (req, res) => {
  const audioUrlId = req.body.audioUrlId;
  console.log(audioUrlId);
  audio
    .findById(audioUrlId)
    .then((response) => {
      deepgram.transcription
        .preRecorded(
          { url: response.audiofile },
          { punctuate: true, model: "nova", language: "en-IN" }
        )
        .then((transcription) => {
          console.dir(transcription.results.channels, { depth: null });
          res.json({
            transcription,
          });
        })
        .catch((err) => {
          res.json({
            message: err,
          });
        });
      // res.json(response.audiofile)
    })
    .catch((err) => {
      console.log(err);
    });
};
router.post("/uploadfile", upload.single("audiofile"), controller.upload),
  router.post("/getaudio", gettext);
router.get("/getaudios", Audiofile.index);
module.exports = router;
