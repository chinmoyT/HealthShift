require("dotenv").config();
const User = require("../models/User");
const StaffProfile = require("../models/StaffProfile");
const Shift = require("../models/Shift");

async function getShiftWithDepartment(req, res) {
  // const deptId = req.params.id;
  // if(!deptId) {
  //     return res.status(400).json({
  //         status: false,
  //         jsonData: null,
  //         errorMessage: "Department id not found"
  //     })
  // }

  const department = req.body.department.id;
}

async function addShift(req, res) {
  try {
    const { staff, department, startTime, endTime, status, notes } = req.body;
    if (!staff || !department || !startTime || !endTime) {
      return res.status(400).json({
        status: false,
        errorMessage: "staff, department, startTime and endTime are required",
        data: null,
      });
    }
    const newShift = new Shift({
      staff,
      department,
      startTime,
      endTime,
      status: status || "SCHEDULED",
      notes,
    });
    const savedShift = await newShift.save();

    return res.status(201).json({
      status: true,
      errorMessage: null,
      data: savedShift,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      data: null,
      errorMessage: err.message,
    });
  }
}

module.exports = {
    addShift
}