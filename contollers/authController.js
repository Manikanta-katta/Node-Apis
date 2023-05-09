const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, function (err, hashedpass) {
    if (err) {
      res.json({
        error: err,
      });
    }
    let user = new User({
      name: req.body.name,
      email: req.body.email,
      phonenumber: req.body.phonenumber,
      password: hashedpass,
    });
    user
      .save()
      .then((response) => {
        res.json({
          message: "Registered sucessfully",
        });
      })
      .catch(() => {
        res.json({
          message: "error occured !",
        });
      });
  });
};

const login = (req, res, next) => {
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({ $or: [{ email: username }, { phone: username }] }).then(
    (user) => {
      if (user) {
        bcrypt.compare(password, user.password, function (err, result) {
          if (err) {
            res.json({
              error: err,
            });
          }
          if (result) {
            let token = jwt.sign({ name: user.name }, "verySecretValue", {
              expiresIn: "1h",
            });
            res.json({
              message: "Login succesfull !",
              token,
            });
          } else {
            res.json({
              message: "password does not mached !",
            });
          }
        });
      } else {
        res.json({
          message: "No user found !",
        });
      }
    }
  );
};

module.exports = { registerUser, login };
