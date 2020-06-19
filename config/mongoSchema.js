

const { Schema } = require('mongoose');
const { __collections } = require('./constants');

let resume = Schema({
    name: String,
    email: String,
    mobile: Number,
    isVerified: Number,
    otp: Number,
    apply_for: Number,
    current_ctc: Number,
    current_designation: String,
    current_location: String,
    currently_working: String,
    department: String,
    expected_ctc: Number,
    expected_location: String,
    expected_role: String,
    experience: Array,
    experience_in: String,
    filename: String,
    gender: String,
    am_type: Number,
    skills: String,
    xcompany: String,
    createdAt: Date,
    updatedAt: Date,
    isCompleted: Number,
    termsChecked: {
        type: Number,
        required: true
    }
});

let subcribers_email = Schema({
    email: String,
    isSubcribed: Number
}, { collection: __collections.ONXCY_RESUME.subcribers_email });

module.exports = {
    resumes: resume,
    subcribers_email: subcribers_email
}