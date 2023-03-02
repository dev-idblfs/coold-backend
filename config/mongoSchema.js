const { Schema, Mongoose } = require("mongoose");
const { __collections } = CONFIG;

const resume = new Schema(
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
  { collection: __collections.ONXCY.resumes }
);

const subcribers_email = new Schema(
  {
    email: String,
    isSubcribed: Number,
  },
  { collection: __collections.ONXCY.subcribers_email }
);

// mongoose user Schema

const users = {
  _id: { type: String },
  name: { type: String, required: true },
  brandName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: Number, required: true, unique: true },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true },
  verified: { type: Boolean, default: true },
  otp: { type: Number },
};

const userSchema = new Schema(users, {
  collection: __collections.ONXCY.brands,
  timestamps: true,
});

// mongoose reimbursh Schema

// const fields = new Schema({
//   label: { type: String, required: true },
//   name: { type: String, required: true },
//   required: { type: Boolean, required: true },
//   type: {
//     type: String,
//     required: true,
//     enum: [
//       "checkbox",
//       "date",
//       "email",
//       "file",
//       "number",
//       "password",
//       "radio",
//       "range",
//       "reset",
//       "text",
//     ],
//   },
// });

const fields = {
  label: { type: String, required: true },
  name: { type: String, required: true },
  required: { type: Boolean, required: true },
  type: {
    type: String,
    required: true,
    enum: [
      "checkbox",
      "date",
      "email",
      "file",
      "number",
      "password",
      "radio",
      "range",
      "reset",
      "text",
    ],
  },
  option: { type: Array },
};

const form = {
  brandId: { type: Schema.Types.ObjectId, required: true, ref: "users" },
  mode: { type: Number, required: true },
  name: { type: String, required: true },
  fields: [fields],
  onSubmit: { type: String, required: true }
};

const formSchema = new Schema(form, {
  collection: __collections.ONXCY.FORMS,
});

formSchema.path("fields").validate((fields) => {
  console.log("validate", fields);
  if (!fields) {
    return false;
  } else if (fields.length === 0) {
    return false;
  }
  return true;
}, "Fields needs to have at least one feature");

module.exports = {
  resumes: resume,
  subcribers_email: subcribers_email,
  userSchema,
  formSchema,
};
