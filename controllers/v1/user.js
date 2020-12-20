const { isEmpty } = require("lodash");
const { STRINGS } = require("../../config/constants");
const brands = require("../../modals/brands");
const express = require("express"),
  router = express.Router();
const { locals } = CONFIG;

const { userlogout } = require("../../libraries/auth");

router.get("/currentUser", async (req, res) => {
  try {
    const { id } = CONFIG.brandInfo;

    const { data } = await brands.fetch({ _id: id });

    let response = locals.error;

    if (isEmpty(data)) {
      response = locals.error;
      response.message = STRINGS.loginIncorrect;
      return res.status(203).json(response);
    } else {
      const [matched] = data;
      const { name, brandName, email, mobile, role = "admin" } = matched;
      //after login action performed inn this method
      const finalData = { name, brandName, email, mobile, role };
      response = locals.success;
      response.message = "User Details";
      response.body = finalData;
    }
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    let response = locals.error;
    response.message = STRINGS.someThingwrong;
    res.status(error.code || 500).json(response);
  }
});

router.get("/logout", async (req, res) => {
  try {
    userlogout(req, res);
    response = locals.success;
    response.message = STRINGS.logouted;
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    let response = locals.error;
    response.message = STRINGS.someThingwrong;
    res.status(error.code || 500).json(response);
  }
});

module.exports = router;
