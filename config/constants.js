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
    code: 200,
    data: {},
  },

  error: {
    message: STRINGS.someThingwrong,
    status: STRINGS.error,
    code: 400
  },
};
//responseCodes
const responseCodes = {
  //to be used when no new record is inserted but to display success message
  "successCode": 200,
  //to be used when new record is inserted
  "newResourceCreated": 201,
  //to be used if database query return empty record
  "nocontent": 204,
  //to be used if the request is bad e.g. if we pass record id which does not exits
  "badRequest": 400,
  //"jwtTokenExpired": 401,

  //to be used when the user is not authorized to access the API e.g. invalid access token
  "unAuthorizedUser": 401,

  //to be used when access token is not valid
  "forbidden": 403,
  //to be used if something went wrong
  "failureCode": 404,
  //to be used when error occured while accessing the API
  "internalServerError": 500,
  //to be used if record already axists
  "conflictCode": 409,

}


module.exports = {
  __collections: __collections,
  __db: __db,
  locals: response,
  STRINGS,
  responseCodes
};

