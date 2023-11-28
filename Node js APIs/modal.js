const mongoose = require("mongoose");

const CompanyName = mongoose.Schema({
  companyname: {
    type: String,
    required: true,
    unique: true,
  },
  data: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("companyname", CompanyName);
