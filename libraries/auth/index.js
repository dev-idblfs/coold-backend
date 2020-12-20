const { generateAccessToken, setCookies, removeCookies } = require("../utils");

const afterLogin = (req, res, id) => {
  const token = generateAccessToken(id);
  setCookies(req, res, "token", token);
};

const userlogout = (req, res) => {
  removeCookies(req, res, "token");
};

module.exports = { afterLogin, userlogout };
