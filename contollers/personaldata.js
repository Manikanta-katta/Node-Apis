const personalData = require("../models/personaldata");

const store = (req, res, next) => {
  const personal = new personalData({
    name: req.body.name,
    mobile: req.body.mobile,
  });

  personal
    .save()
    .then((response) => {
      res.json({
        message: "addded successfully",
      });
    })
    .catch((err) => {
      res.json({
        message: err,
      });
    });
};

module.exports = { store };
