const STRINGS = {
  success: "success",
  error: "error",
  created: "Created Successfully!",
  updated: "Updated Successfully!",
  deleted: "Deleted Successfully!",
  verified: "Verified Successfully!",
  loggedIn: "Login Successfully!",
  logouted: "Logout Successfully!",
  otpsent: "OTP sent!",
  otpVerified: "OTP verified!",
  someThingwrong: "Somthing Went Wrong!",
  loginIncorrect: `Email or Password donen't match!`,
};

const __db = {
  ONXCY_RESUME: "onxcy_resume",
  ONXCY_BRANDS: "onxcy_brands",
};

const __collections = {
  ONXCY_RESUME: {
    subcribers_email: "subcribers_email",
    resumes: "resumes",
  },
  ONXCY_BRANDS: {
    brands: "brands",
  },
};

const response = {
  success: {
    message: "ok",
    status: STRINGS.success,
    body: {},
  },

  error: {
    message: STRINGS.someThingwrong,
    status: STRINGS.error,
  },
};

module.exports = {
  __collections: __collections,
  __db: __db,
  locals: response,
  STRINGS,
};
