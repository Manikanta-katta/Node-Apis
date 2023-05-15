const express = require("express");
const multer = require("multer");
const router = express.Router();
const upload = require("../middleware/upload");
const Audiofile = require("../contollers/audio-to-text");
const { Deepgram } = require("@deepgram/sdk");

// The API key we created in step 3
const deepgramApiKey = "ce9847614f31392337e8f41c6220039f8c5b91b0";

// Hosted sample file
// const audioUrl =
//   "https://nodejsprctc.s3.ap-south-1.amazonaws.com/%5BiSongs.info%5D-05---Travelling-Soldier.mp3";

// Initializes the Deepgram SDK
const deepgram = new Deepgram(deepgramApiKey);

router.post("/upload", Audiofile.store);

const gettext = (req, res) => {
  const audioUrlId = req.body.audioUrlId;
  Audiofile.findById(audioUrlId)
    .then(
      deepgram.transcription
        .preRecorded(
          { url: audioUrlId },
          { punctuate: true, model: "nova", language: "en-IN" }
        )
        .then((transcription) => {
          console.dir(transcription.results.channels, { depth: null });
          res.json({
            transcription,
          });
        })
    )

    .catch((err) => {
      console.log(err);
    });
};

router.get("/getaudio", gettext);
module.exports = router;
