const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AudioSchema = new Schema({
  name: {
    type: String,
  },
  audiofile: {
    type: String,
  },
});
const Audiofile = mongoose.model("Audiofile", AudioSchema);
module.exports = Audiofile;
