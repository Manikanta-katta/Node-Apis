const UsersData = require("../model/usersmodel");

const index = async (req, res, next) => {
  await UsersData.find()
    .then((response) => {
      res.json({
        message: "Users ",
        response,
      });
    })
    .catch((error) => {
      res.json({
        message: "An error occured",
        error,
      });
    });
};

const store = (req, res, next) => {
  const User = new UsersData({
    name: req.body.name,
    email: req.body.email,
    mobile: req.body.mobile,
  });
  User.save()
    .then((response) => {
      res.json({
        message: "user added successfully",
        response,
      });
    })
    .catch((error) => {
      res.json({
        message: "An error occured ",
        error,
      });
    });
};

module.exports = { store, index };