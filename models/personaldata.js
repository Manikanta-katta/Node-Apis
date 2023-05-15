const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const personalData = new Schema({
  name: {
    type: String,
  },
  mobile: {
    type: String,
  },
});

const PersonalData = mongoose.model("personalData", personalData);
module.exports = PersonalData;
