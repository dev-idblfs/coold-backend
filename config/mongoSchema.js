const { Schema } = require("mongoose");
const { __collections } = CONFIG;

const resume = Schema(
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
  name: { type: String, required: true },
  brandName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: Number, required: true, unique: true },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true },
  verified: { type: Boolean, default: true },
  otp: { type: Number },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date },
};

const userSchema = Schema(users, {
  collection: __collections.ONXCY_BRANDS.brands,
});

module.exports = {
  resumes: resume,
  subcribers_email: subcribers_email,
  userSchema,
};
