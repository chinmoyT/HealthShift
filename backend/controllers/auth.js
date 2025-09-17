const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();
const setPermissions = require('../utility/permissions');

async function handleUserSignup(req, res){}

async function handleLogin(req, res) {
    const {email, password} = req.body
    const user = await User.findOne({email: email, password: password});
    if(!user) {
        return res.status(401).json({
            status: false,
            jsonData: null,
            errorMessage: "Invalid email or password",
            data: null
        });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    const { password: pwd, ...userData } = user.toObject();

    return res.status(200).json({
        status: true,
        jsonData: token,
        errorMessage: null,
        data: userData
    });
}

async function handleAccess(req, res) {
    const {role} = req.query;
    if (!role) {
        return res.status(400).json({
            status: false,
            jsonData: null,
            errorMessage: "Role is required",
            data: null
        });
    }
    const permissionsList = setPermissions(role)
    return res.status(200).json({
        status: true,
        jsonData: null,
        errorMessage: null,
        data: permissionsList
    });
}

module.exports = {
    handleLogin,
    handleAccess
}