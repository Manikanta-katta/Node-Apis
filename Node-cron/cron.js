const User = require("./model/usersmodel");
const config = require("./config/config");
const nodemailer = require("nodemailer");
const cron = require("node-cron");

const sendMailToAllUsers = async (emailObj,res) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    requireTLS: true,  
    auth: {
      user: config.emailUser,
      pass: config.emailPassword,
    },
    debug:true
  });

  const mailOptions = {
    from: "Node Practise <manikantakatta476@gmail.com>",
    to: emailObj,
    subject: "Cron Test Mail",
    html: `<p> Hi ${emailObj} welcome  </p>`,
    attachments: [
      {
        filename: 'karthikeya.pdf',
        path: "C:/Users/ManikantaKat_bgos7rp/Node js practices/Node-cron/karthikeya-2.pdf",
        contentType: 'application/pdf'
        
      },
    ],
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
      res.json({
        message: "An error occured",
        error,
      });
    } else {
      console.log("Mail has  sent", info.response);
      res.json({
        message: "Mail has sent Successfully",
      });
    }
  });
};
async function sendMailAllUser() {
  try {
    cron.schedule("*/10 * * * * *", async function () {
      var usersData = await User.find({});
      if (usersData.length > 0) {
        var email = [];
        usersData.map((key) => {
          email.push([key.email]);
        });

        console.log(email);
        sendMailToAllUsers(email);
      }
    });
  } catch (error) {
    console.log("An error Occured", error);
  }
}

module.exports = { sendMailAllUser };
