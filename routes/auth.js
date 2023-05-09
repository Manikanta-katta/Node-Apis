const express = require("express");
const router = express.Router();
const authenticationController = require("../contollers/authController");
router.post("/register", authenticationController.registerUser);
router.post("/login", authenticationController.login);
module.exports = router;
