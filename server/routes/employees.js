// modules required for routing
let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

// define the employee model
let employee = require("../models/employees");

/* GET employee List page. READ */
router.get("/", (req, res, next) => {
  // find all employee in the employee_detail collection
  employee.find((err, employees) => {
    if (err) {
      return console.error(err);
    } else {
      res.render("employees/index", {
        title: "Employees",
        employees: employees,
      });
    }
  });
});

//  GET the Employee Details page in order to add a new employee
router.get("/add", (req, res, next) => {
  res.render("employees/add", { title: "Add Employee", employees: employee });
});

// POST process the Employee Details page and create a new Employee - CREATE
router.post("/add", (req, res, next) => {
  
});

// GET the Employee Details page in order to edit an existing Employee
router.get("/:id", (req, res, next) => {
  let id = req.params.id;

  employee.findById(id, (err, employeeDetail) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.render('employees/details', { title: 'Employee Details', employees: employeeDetail });
    }
  });
});

// POST - process the information passed from the details form and update the document
router.post("/:id", (req, res, next) => {
  let id = req.params.id;

  let updatedEmployee = employee({
    _id: id,
    Employeeid: req.body.Employeeid,
    Employeename: req.body.Employeename,
    Department: req.body.Department,
    Designation: req.body.Designation,
    Salary: eq.body.Salary
  });

  contact.updateOne({ _id: id }, updatedEmployee, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.redirect("/employees");
    }
  });
});

// GET - process the delete by specific employeename
router.get("/delete/:employeename", (req, res, next) => {
  let name = req.params.employeename;

  contact.remove({ Employeename: name }, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.redirect("/employees");
    }
  });
});

module.exports = router;
