var express = require("express"),
  router = express.Router();
const { isEmpty } = require("lodash");
const { STRINGS } = require("../../config/constants");
const { afterLogin } = require("../../libraries/auth");
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
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    let response = locals.error;
    response.message = error.message ? error.message : "Uncaught Error";
    res.status(error.code || 500).json(response);
  }
});

router.post("/login", async (req, res) => {
  const { body } = req;
  try {
    if (isEmpty(body)) throw { code: 403, message: "Empty Request" };
    const { email, password } = body;
    const { data } = await brands.fetch({ email, password });
    let response = locals.error;

    if (isEmpty(data)) {
      response = locals.error;
      response.message = STRINGS.loginIncorrect;
      return res.status(203).json(response);
    } else {
      const [matched] = data;
      const { _id: id } = matched;
      //after login action performed inn this method
      afterLogin(req, res, id);
      response = locals.success;
      response.message = STRINGS.loggedIn;
    }
    return res.status(200).json(response);
  } catch (error) {
    console.log("log", error);
    let response = locals.error;
    response.message = error.message || "Uncought Error";
    return res.status(error.code || 500).json(response);
  }
});

module.exports = router;
