const Employee = require("../models/employee");

//Show the list of Employees

const index = (req, res, next) => {
  Employee.find()
    .then((response) => {
      res.json({
        response,
      });
    })
    .catch((err) => {
      res.json({
        message: "An error Occured!",
      });
    });
};

//show single employee details
const show = (req, res, next) => {
  let employeeID = req.body.employeeID;
  Employee.findById(employeeID)
    .then((response) => {
      res.json({
        response,
      });
    })
    .catch((err) => {
      res.json({
        message: "An error occured",
      });
    });
};
// store employee details
const store = (req, res, next) => {
  let employee = new Employee({
    name: req.body.name,
    designation: req.body.designation,
    email: req.body.email,
    phone: req.body.phone,
    age: req.body.age,
  });
  if (req.file) {
    employee.avatar = req.file.path;
  }

  employee
    .save()
    .then((response) => {
      res.json({
        message: "Employee added successfully!",
      });
    })
    .catch((err) => {
      res.json({
        message: " An error Occured!",
      });
    });
};
// update employee details
const update = (req, res, next) => {
  let employeeID = req.body.employeeID;
  let updatedData = {
    name: req.body.name,
    designation: req.body.designation,
    email: req.body.email,
    phone: req.body.phone,
    age: req.body.age,
  };

  Employee.findByIdAndUpdate(employeeID, { $set: updatedData })
    .then((response) => {
      res.json({
        message: "Employee updated successfully!",
      });
    })
    .catch((err) => {
      res.json({
        message: " An error Occured!",
      });
    });
};

// delete an employee

const destroy = (req, res, next) => {
  let employeeID = req.body.employeeID;
  Employee.findByIdAndDelete(employeeID)
    .then(() => {
      res.json({
        message: "Employee deleted Succesfully!",
      });
    })
    .catch((err) => {
      req.json({
        message: "An error occured!",
      });
    });
};
module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
