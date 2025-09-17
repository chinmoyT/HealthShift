const mongoose = require('mongoose');
const { STATUS } = require('../utility/constants');

const shiftSchema = new mongoose.Schema({
    staff: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'StaffProfile',
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
    },
    startTime: {
        type: Date,
    },
    endTime: {
        type: Date,
    },
    status: {
        type: String,
        enum: STATUS,
        default: "SCHEDULED"
    },
    notes: {
        type: String
    }
}, {timestamps: true})

const shift = mongoose.model('Shift', shiftSchema);
module.exports = shift;