const { isEmpty } = require("lodash");
const { STRINGS } = require("../../config/constants");
const brands = require("../../modals/brands");
const express = require("express"),
  router = express.Router();
const { locals } = CONFIG;

const { userlogout } = require("../../libraries/auth");

router.get("/list", async (req, res) => {
  try {
    const { id } = CONFIG.brandInfo;

    let response = locals.error;

    response = locals.success;
    response.message = "Your Reimburshment";
    response.body = [];
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    let response = locals.error;
    response.message = STRINGS.someThingwrong;
    res.status(error.code || 500).json(response);
  }
});

router.post("/create", async (req, res) => {
  try {
    const { body } = reql;
    const { id } = CONFIG.brandInfo;
    if (isEmpty(body)) throw { code: 403, message: "Empty Request" };

    let response = locals.error;

    response = locals.success;
    response.message = "Your Reimburshment";
    response.body = [];
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    let response = locals.error;
    response.message = STRINGS.someThingwrong;
    res.status(error.code || 500).json(response);
  }
});

module.exports = router;
