const express = require("express");
const Usercontroller = require("../controller/usercontroller")
const Sendmails = require('../cron')

const router = express.Router();
router.get("/getuser",Usercontroller.index)
router.post("/adduser",Usercontroller.store);
// router.get("/sendmails",Sendmails.sendMailAllUser);

module.exports = router;