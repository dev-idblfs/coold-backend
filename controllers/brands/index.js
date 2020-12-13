var express = require("express"),
  router = express.Router();
const brands = require("../../modals/brands");
const { locals } = CONFIG;

// request to get all the users
router.post("/create", async (req, res) => {
  try {
    if (Object.keys(req.body).length > 0) {
      result = await brands.insert(req.body);
      let response = locals.success;
      response.body = result.body;
      response.message = "created";
      res.status(201).json(response);
    }
  } catch (error) {
    let response = locals.error;
    response.message = error.message;
    res.status(error.code).json(response);
  }
});

router.patch("/create", async (req, res) => {
  try {
    if (Object.keys(req.body).length > 0) {
      const { email, otp } = req.body;
      result = await brands.update({ email }, { otp });
      let response = locals.success;
      response.body = result.body;
      response.message = "created";
      res.status(201).json(response);
    }
  } catch (error) {
    let response = locals.error;
    response.message = error.message || "Uncought Error";
    res.status(error.code || 500).json(response);
  }
});

// request to get all the users by userName
module.exports = router;
