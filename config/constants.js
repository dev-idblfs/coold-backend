const STRINGS = {
  success: "success",
  error: "error",
  created: "Created Successfully!",
  updated: "Updated Successfully!",
  deleted: "Deleted Successfully!",
  notFound: "No Data Found!",
  verified: "Verified Successfully!",
  loggedIn: "Login Successfully!",
  logouted: "Logout Successfully!",
  otpsent: "OTP sent!",
  otpVerified: "OTP verified!",
  someThingwrong: "Somthing Went Wrong!",
  loginIncorrect: `Email or Password donen't match!`,
};

const __db = {
  ONXCY: "onxcy",
  ONXCY: "onxcy",
};

const __collections = {
  ONXCY: {
    subcribers_email: "subcribers_email",
    resumes: "resumes",
  },
  ONXCY: {
    brands: "onxcy_brands",
    REIMBURS: "onxcy_reimburs",
    FORMS: "onxcy_forms",
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
