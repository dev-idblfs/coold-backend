const { generateAccessToken, setCookies, removeCookies, getCookies } = require("../utils");

const afterLogin = (req, res, id) => {
  const token = generateAccessToken(id);
  setCookies(req, res, "token", token);
  console.table(req.cookies)
};

const userlogout = (req, res) => {
  removeCookies(req, res, "token");
};

module.exports = { afterLogin, userlogout };
