const mongoose = require('mongoose')

const departmentSchema = new mongoose.Schema({
    name: {
        type: String
    },
    code: {
        type: 'String',
        unique: true  
    },
    hod: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "StaffProfile",
    },
    hodOffice: {
        type: String
    }
})

const Department = mongoose.model('Department', departmentSchema);
module.exports = Department