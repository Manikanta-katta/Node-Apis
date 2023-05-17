const express = require("express");
const PersonData = require("../contollers/personaldata");
const route = express.Router();
route.post("/personal", PersonData.store);
module.exports = route;
