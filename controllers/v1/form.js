const { isEmpty } = require("lodash");
const { STRINGS } = require("../../config/constants");
const express = require("express"),
  router = express.Router();
const { locals } = CONFIG;
const forms = require("../../modals/forms");

router.get("/list", async (req, res) => {
  try {
    let response = locals.error;

    const { id: brandId } = CONFIG.brandInfo;

    const { data } = await forms.fetch({ brandId });
    if (isEmpty(data)) {
      response = locals.error;
      response.message = STRINGS.notFound;
      response.body = data;
      return res.json(response);
    }
    response = locals.success;
    response.message = "Your forms";
    response.body = data;
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    let response = locals.error;
    response.message = STRINGS.someThingwrong;
    res.status(error.code || 500).json(response);
  }
});

router.get("/:id", async (req, res) => {
  try {
    let response = locals.error;

    //   fetch brand Id from config
    const { id: brandId } = CONFIG.brandInfo;
    const { params } = req;
    const { id } = params;
    if (!id) throw { code: 403, message: "Empty Request" };

    const { data } = await forms.fetch({ _id: id, brandId });
    if (isEmpty(data)) {
      response = locals.error;
      response.message = STRINGS.notFound;
      response.body = data;
      return res.json(response);
    }
    const [matched] = data;
    // console.log("data", data);
    response = locals.success;
    response.message = "Form Details";
    response.body = matched;
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    let response = locals.error;
    response.message = STRINGS.someThingwrong;
    res.status(error.code || 500).json(response);
  }
});

// add new forms route

router.post("/add", async (req, res) => {
  try {
    const { body } = req;
    const { id } = CONFIG.brandInfo;
    if (isEmpty(body)) throw { code: 403, message: "Empty Request" };
    let response = locals.error;
    const { mode, name, fields, onSubmit } = body;
    if (!mode || !name || !fields || !onSubmit)
      throw { code: 403, message: "Empty Request" };
    const result = await forms.insert({
      brandId: id,
      mode,
      name,
      fields,
      onSubmit,
    });

    response = locals.success;
    response.message = "Your forms";
    response.body = result;
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    let response = locals.error;
    response.message = error.message || STRINGS.someThingwrong;
    res.status(error.code || 500).json(response);
  }
});

module.exports = router;
