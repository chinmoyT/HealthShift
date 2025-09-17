require('dotenv').config();
const User = require("../models/User")
const StaffProfile = require('../models/StaffProfile')
const Department = require('../models/Department')
const Shift = require('../models/Shift')

async function getStaffWithDepartment(req, res) {
  try {
    // Populate HOD, staff, and staff in shifts
    const departments = await Department.find({})
      .populate("hod") // HOD details
      .lean();         // return plain objects, not mongoose docs

    if (!departments || departments.length === 0) {
      return res.status(404).json({
        status: false,
        data: null,
        errorMessage: "No Departments found",
      });
    }

    const departmentData = await Promise.all(
      departments.map(async (dept) => {
        // find staff belonging to this department
        const staff = await StaffProfile.find({ department: dept._id })
          .populate("user")   // include user details if needed
          .lean();

        // find shifts for this department and include staff
        const shifts = await Shift.find({ department: dept._id })
          .populate({
            path: "staff",
            populate: { path: "user" } // nested populate for staff's user
          })
          .lean();

        return {
          ...dept,
          staff,
          shifts,
        };
      })
    );

    return res.status(200).json({
      status: true,
      data: departmentData,
      errorMessage: null,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      data: null,
      errorMessage: err.message,
    });
  }
}


async function createDepartment(req, res) {
    try{
        const {name, code } = req.body;
        const existingDept = await Department.findOne({name: name})
        if(existingDept) {
            return res.status(409).json({
            status: false,
            jsonData: null,
            errorMessage: 'Departments already exists',
            data: null
            })
        }
        const newDept = new Department({
            name: name,
            code: code
        })
        await newDept.save()
        return res.status(201).json({
            status: true,
            jsonData: "Department added successfully",
            errorMessage: null,
            data: newDept
        })    
    } catch(err) {
        return res.status(500).json({
            status: false,
            data: null,
            errorMessage: err.message
        });
    }
}

async function getDepartmentsList(req, res) {
  try {
    const departments = await Department.find("-password")
    .populate({
      path: 'hod',
      model: 'StaffProfile',
      populate: {
        path: 'user',
        model: 'User'
      }
    })

    return res.status(200).json({
      status: true,
      data: departments,
      jsonData: 'Departments fetched successfully',
      errorMessage: null,
    });
  } catch(err) {
    return res.status(500).json({
      status: false,
      jsonData: null,
      data: null,
      errorMessage: "Failed to fetch departments",
    });
  }
}

async function getDepartmentById(req, res) {
  const deptId = req.params.id;
  if (!deptId) {
    return res.status(400).json({
      status: false,
      jsonData: null,
      errorMessage: "Department ID is required",
      data: null,
    });
  }
  const department = await Department.findById(deptId, "-password")
  .populate({
      path: 'hod',
      model: 'StaffProfile',
      populate: {
        path: 'user',
        model: 'User'
      }
    })
    if (!department) {
    return res.status(404).json({
      status: false,
      jsonData: null,
      errorMessage: "Department not found",
      data: null,
    });
  }
  return res.status(200).json({
    status: true,
    jsonData: null,
    errorMessage: null,
    data: department,
  });
}

module.exports = {
    getStaffWithDepartment,
    createDepartment,
    getDepartmentsList,
    getDepartmentById
}