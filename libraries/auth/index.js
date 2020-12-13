const { generateAccessToken, setCookies } = require("../utils");

const afterLogin = (req, res, id) => {
  const token = generateAccessToken(id);
  const result = setCookies(req, res, "token", token);
  return result;
};

module.exports = { afterLogin };
