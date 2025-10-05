require("dotenv").config();
const User = require("../models/User");
const StaffProfile = require("../models/StaffProfile");

async function handleUserRegister(req, res) {
  if (!req.body?.email || !req.body?.password || !req.body?.role) {
    return res.status(400).json({
      status: false,
      jsonData: null,
      errorMessage: "Email, password, and role are required",
      data: null,
    });
  }

  const existingUser = await User.findOne({ email: req.body?.email });
  if (existingUser) {
    return res.status(409).json({
      status: false,
      jsonData: null,
      errorMessage: "User already exists",
      data: null,
    });
  }

  if (req.user.role !== "ADMIN") {
    return res.status(403).json({
      status: false,
      jsonData: null,
      errorMessage: "Only admins can add a user",
      data: null,
    });
  }

  const newUser = new User({
    firstName: req.body?.firstName,
    lastName: req.body?.lastName,
    email: req.body?.email,
    password: req.body?.password,
    role: req.body?.role,
  });
  await newUser.save();

  const newStaffProfile = new StaffProfile({
    user: newUser._id,
  });
  await newStaffProfile.save();

  return res.status(201).json({
    status: true,
    jsonData: "New user registered successfully",
    errorMessage: null,
    data: {
      user: newUser,
      staffProfile: newStaffProfile,
    },
  });
}

async function getUsersList(req, res) {
  const { role } = req.user;
  if (role !== "ADMIN") {
    return res.status(403).json({
      status: false,
      jsonData: null,
      errorMessage: "Only admins can view the user list",
      data: null,
    });
  }
  const users = await User.find({}, "-password");
  if (!users) {
    return res.status(404).json({
      status: false,
      jsonData: null,
      errorMessage: "No users found",
      data: null,
    });
  }

  return res.status(200).json({
    status: true,
    jsonData: null,
    errorMessage: null,
    data: users,
  });
}

async function getUserById(req, res) {
  const userId = req.params.id;
  if (!userId) {
    return res.status(400).json({
      status: false,
      jsonData: null,
      errorMessage: "User ID is required",
      data: null,
    });
  }
  const user = await User.findById(userId, "-password");
  if (!user) {
    return res.status(404).json({
      status: false,
      jsonData: null,
      errorMessage: "User not found",
      data: null,
    });
  }
  return res.status(200).json({
    status: true,
    jsonData: null,
    errorMessage: null,
    data: user,
  });
}

async function updateUser(req, res) {
  const { _id, firstName, lastName, email, phoneNumber, role } = req.body;
  const userId = _id || req.user._id;

  if (!email) {
    return res.status(400).json({
      status: false,
      jsonData: null,
      errorMessage: "Email is required",
      data: null,
    });
  }

  if (!userId) {
    return res.status(400).json({
      status: false,
      jsonData: null,
      errorMessage: "User ID is required",
      data: null,
    });
  }

  const user = await User.findByIdAndUpdate(
    userId,
    {
      firstName,
      lastName,
      email,
      phoneNumber,
      role,
    },
    { new: true }
  );

  if (!user) {
    return res.status(404).json({
      status: false,
      jsonData: null,
      errorMessage: "User not found",
      data: null,
    });
  }

  return res.status(200).json({
    status: true,
    jsonData: "User Updated Successfully",
    errorMessage: null,
    data: null,
  });
}

async function deactivateUser(req, res) {
  const userId = req.params.id;
  if (!userId) {
    return res.status(400).json({
      status: false,
      jsonData: null,
      errorMessage: "User ID is required",
      data: null,
    });
  }

  const user = await User.findByIdAndUpdate(
    userId,
    { isActive: false },
    { new: true }
  );
  if (!user) {
    return res.status(404).json({
      status: false,
      jsonData: null,
      errorMessage: "User not found",
      data: null,
    });
  }

  return res.status(200).json({
    status: true,
    jsonData: "User deactivated successfully",
    errorMessage: null,
    data: null,
  });
}

async function createStaffProfile(req, res) {
  const { userId, department, speciality, availability, isManager } = req.body;

  if (!userId || !department || !speciality) {
    return res.status(400).json({
      status: false,
      jsonData: null,
      errorMessage: "userId, department, and speciality are required",
      data: null,
    });
  }

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({
      status: false,
      jsonData: null,
      errorMessage: "User not found",
      data: null,
    });
  }

  const existingProfile = await StaffProfile.findOne({ user: userId });
  if (existingProfile) {
    return res.status(409).json({
      status: false,
      jsonData: null,
      errorMessage: "Staff profile already exists for this user",
      data: null,
    });
  }

  // Count staff in department
  const count = await StaffProfile.countDocuments({ department });
  const employeeId = `${department}${String(count + 1).padStart(3, "0")}`;

  const staffProfile = new StaffProfile({
    user: userId,
    employeeId,
    department,
    speciality,
    availability,
    isManager,
  });

  await staffProfile.save();

  return res.status(201).json({
    status: true,
    jsonData: "Staff profile created successfully",
    errorMessage: null,
    data: staffProfile,
  });
}

async function getStaffProfileList(req, res) {
  const { role } = req.user;
  if (role !== "ADMIN" && role !== "MANAGER") {
    return res.status(403).json({
      status: false,
      jsonData: null,
      errorMessage: "Only admins and managers can view staff profiles",
      data: null,
    });
  }

  const staffProfiles = await StaffProfile.find().populate("user", "-password").populate("department");
  if (!staffProfiles || staffProfiles.length === 0) {
    return res.status(404).json({
      status: false,
      jsonData: null,
      errorMessage: "No staff profiles found",
      data: null,
    });
  }

  return res.status(200).json({
    status: true,
    jsonData: null,
    errorMessage: null,
    data: staffProfiles,
  });
}

async function getStaffProfileById(req, res) {
  const staffId = req.params.id;
  if (!staffId) {
    return res.status(400).json({
      status: false,
      jsonData: null,
      errorMessage: "Staff ID is required",
      data: null,
    });
  }
  const staff = await StaffProfile.findOne({ user: staffId }).populate("user");
  if (!staff) {
    return res.status(404).json({
      status: false,
      jsonData: null,
      errorMessage: "Staff not found",
      data: null,
    });
  }
  return res.status(200).json({
    status: true,
    jsonData: null,
    errorMessage: null,
    data: staff,
  });
}

async function updateStaffProfile(req, res) {
  const {
    _id,
    department,
    isManager,
    availability,
    phoneNumber,
    gender,
    role
  } = req.body;
  const staff = await StaffProfile.findByIdAndUpdate(_id, {
    department,
    isManager,
    availability,
    phoneNumber,
    gender,
    role
  }, {new: true});
  if (!staff) {
    return res.status(404).json({
      status: false,
      jsonData: null,
      errorMessage: "Staff not found",
      data: null,
    });
  }
  return res.status(200).json({
    status: true,
    errorMessage: null,
    jsonData: "Staff profile updated successfully",
    data: null,
  });
}

module.exports = {
  handleUserRegister,
  getUsersList,
  getUserById,
  updateUser,
  deactivateUser,
  createStaffProfile,
  getStaffProfileList,
  updateStaffProfile,
  getStaffProfileById,
};
