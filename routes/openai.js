const express = require("express");
const multer = require("multer");
const router = express.Router();
const upload = require("../middleware/upload");
const Audiofile = require("../contollers/audio-to-text");
const audio = require("../models/audio-to-text");
const { Deepgram } = require("@deepgram/sdk");

// The API key we created in step 3
const deepgramApiKey = "94ab1b371af1da9aace0e741680fa23dc306181b";

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

router.post("/getaudio", gettext);
router.get("/getaudios", Audiofile.index);
module.exports = router;
