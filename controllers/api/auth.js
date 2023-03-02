var express = require("express"),
  router = express.Router();
const { isEmpty } = require("lodash");
const { responseCodes } = require("../../config/config");
const { STRINGS } = require("../../config/constants");
const { afterLogin } = require("../../libraries/auth");
const { generateAccessToken } = require("../../libraries/utils");
const brands = require("../../modals/brands");

const { locals } = CONFIG;

// request to get all the users
router.post("/signup", async (req, res) => {
  const { body } = req;

  try {
    if (isEmpty(body)) throw { code: 403, message: "Empty Request" };
    const { name, brandName, email, mobile, password, confirmPassword } = body;

    const result = await brands.insert({
      name,
      brandName,
      email,
      mobile,
      password,
      confirmPassword,
    });

    let response = locals.success;
    response.body = result.body;
    response.message = STRINGS.created;
    response.code = responseCodes.newResourceCreated;
    res.json(response);
  } catch (error) {
    console.log(error);
    let response = locals.error;
    response.message = error.message ? error.message : "Uncaught Error";
    response.code = responseCodes.failureCode;
    res.json(response);
  }
});

router.post("/login", async (req, res) => {
  const { body } = req;
  try {
    if (isEmpty(body)) throw { code: 403, message: "Empty Request" };
    const { email, password } = body;
    const { data } = await brands.fetch({ email, password });
    console.log('data', data);
    let response = locals.error;

    if (isEmpty(data)) {
      response = locals.error;
      response.message = STRINGS.loginIncorrect;
      response.code = responseCodes.nocontent;
      return res.json(response);
    } else {
      const [matched] = data;
      const { _id: id } = matched;
      //after login action performed inn this method
      // afterLogin(req, res, id);
      const token = generateAccessToken(id);
      response = locals.success;
      response.message = STRINGS.loggedIn;
      response.code = responseCodes.successCode;
      response.code = responseCodes.successCode;
      response.data = { token };

    }
    return res.json({ ...response });
  } catch (error) {
    console.log("log", error);
    let response = locals.error;
    // response.message = error.stack || "Uncought Error";
    response.code = responseCodes.failureCode;
    return res.json(response);
  }
});

module.exports = router;
