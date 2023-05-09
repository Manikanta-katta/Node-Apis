const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Auth = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    phonenumber: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  { timestamps: true }
);

const Authentication = mongoose.model("authenticaton", Auth);
module.exports = Authentication;
