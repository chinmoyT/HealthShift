const User = require('./User')
const mongoose = require('mongoose')

const staffProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    employeeId: {
        type: Number
    },
    department: {
        // type: String,
        // enum: ['CARDIOLOGY', 'NEUROLOGY', 'ORTHOPEDICS', 'RADIOLOGY', 'EMERGENCY', 'PEDIATRICS', 'ONCOLOGY', 'GYNECOLOGY', 'UROLOGY',
        //     'DERMATOLOGY', 'OPHTHALMOLOGY', 'ENT', 'ANESTHESIOLOGY', 'PATHOLOGY', 'PSYCHIATRY'
        // ]
        // // required: true
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department'
    },
    phoneNumber: {
        type: Number,
        // required: true
    },
    // speciality: {
    //     type: String,
    //     // required: true
    // },
    availability: {
        type: Boolean
    },
    isManager: {
        type: Boolean
    },
    gender: {
        type: String,
        enum: ['MALE', 'FEMALE']
    },
    role: {
        type: String,
        enum: ['HEAD_OF_DEPARTMENT', 'ATTENDING_PHYSICIAN', 'RESIDENT', 'INTERN', 'SPECIALIST_DOCTOR', 'NURSE',
            'PHYSICIAN_ASSISTANT', 'LABORATORY_TECHNICIAN', 'PHARMACIST', 'RADIOLOGIST', 'ANESTHESIOLOGIST',
            'SURGEON', 'HOSPITAL_ADMINISTRATOR', 'RECEPTIONIST', 'SUPPORT_STAFF'
        ]
    }
}, {timestamps: true})

const StaffProfile = mongoose.model('StaffProfile', staffProfileSchema);
module.exports = StaffProfile;
