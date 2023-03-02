const { getCookies } = require("../libraries/utils");
const jwt = require("jsonwebtoken");
const { responseCodes } = require("../config/constants");

const { TOKEN_SECRET } = process.env;

module.exports = async (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (authHeader) {
    const token = authHeader;
    if (token === null)
      return res.json({
        code: responseCodes.unAuthorizedUser,
        message: "Unauthorised Access",
        status: "error",
        body: [],
      }); // if there isn't any token

    jwt.verify(token, TOKEN_SECRET, (err, user) => {
      if (err)
        return res.json({
          code: responseCodes.forbidden,
          message: "Unauthorised Access",
          status: "Unauthorised",
          data: [],
        });
      CONFIG = { ...CONFIG, brandInfo: { ...user } };
      next(); // pass the execution off to whatever request the client intended
    });
  } else
    return res.json({
      code: responseCodes.unAuthorizedUser,
      message: "Unauthorised Access",
      status: "error",
      data: [],
    });
};
