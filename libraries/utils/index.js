const jwt = require("jsonwebtoken");

const { TOKEN_SECRET } = process.env;

const setCookies = (req = {}, res = {}, name = "", value = "") => {
  let key = name;
  let val = value;
  res.cookie(key, val, { maxAge: 8640000, httpOnly: true }); // expaire after  10 mins
};

const getCookies = (req = {}, res = {}, name = "") => {
  let key = name;
  if (req.cookies[key]) {
    return req.cookies[key];
  }
  return false;
};

const removeCookies = (req = {}, res = {}, name = "") => {
  let key = name;
  let val = getCookies(req, res, name);
  if (val) {
    res.cookie(key, val, { maxAge: 0, httpOnly: true });
  }
};

const generateAccessToken = (id) => {
  return jwt.sign({ id }, TOKEN_SECRET, { expiresIn: "86400s" });
};

const getAlreadyExits = (key) => {
  return `${Object.keys(key)} - ${Object.values(key)}, is Already exist.`;
};

module.exports = {
  getAlreadyExits,
  setCookies,
  getCookies,
  removeCookies,
  generateAccessToken,
};
