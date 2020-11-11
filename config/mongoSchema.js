const { Schema } = require("mongoose");
const { __collections } = CONFIG;

let resume = Schema(
    {
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
        iam_type: Number,
        skills: String,
        xcompany: String,
        createdAt: Date,
        updatedAt: Date,
        isCompleted: Number,
        termsChecked: {
            type: Number,
            required: true,
        },
    },
    { collection: __collections.ONXCY_RESUME.resumes }
);

const subcribers_email = Schema(
    {
        email: String,
        isSubcribed: Number,
    },
    { collection: __collections.ONXCY_RESUME.subcribers_email }
);

const users = {
    name: String,
    email: String,
    mobile: String,
    password: String,
    createdAt: Date,
    updatedAt: Date,
};

module.exports = {
    resumes: resume,
    subcribers_email: subcribers_email,
    users,
};
