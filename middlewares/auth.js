const { getCookies } = require("../libraries/utils");
const jwt = require("jsonwebtoken");

const { TOKEN_SECRET } = process.env;

module.exports = async (req, res, next) => {
  const authHeader = getCookies(req, res, "token");
  if (authHeader) {
    const token = authHeader;
    if (token === null)
      return res.status(401).json({
        message: "Unauthorised Access",
        status: "error",
        body: [],
      }); // if there isn't any token

    jwt.verify(token, TOKEN_SECRET, (err, user) => {
      if (err)
        return res.status(401).json({
          message: "Unauthorised Access",
          status: "Unauthorised",
          data: [],
        });
      const { id } = user;

      CONFIG = { ...CONFIG, brandInfo: { id } };
      next(); // pass the execution off to whatever request the client intended
    });
  } else
    return res.status(401).json({
      message: "Unauthorised Access",
      status: "error",
      data: [],
    });
};
