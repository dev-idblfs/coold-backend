const express = require("express"),
  router = express.Router();
const assets = require(`${ROOT_DIR}//controllers/site/load_base`);
const ejs = require("ejs");

router.get("/", async (req, res) => {
  var header = await ejs.renderFile("views/header.ejs", {
    css: assets.loadCSS(),
    base_url: CONFIG.BASE_URL,
  });
  var footer = await ejs.renderFile("views/footer.ejs", {
    js: assets.loadJS(),
    base_url: CONFIG.BASE_URL,
  });
  var body = await ejs.renderFile("views/service/index.ejs", {
    base_url: CONFIG.BASE_URL,
  });

  res.render("body", { header: header, body: body, footer: footer });
});

router.get("/hr", async (req, res) => {
  var header = await ejs.renderFile("views/header.ejs", {
    css: assets.loadCSS(),
    base_url: CONFIG.BASE_URL,
  });
  var footer = await ejs.renderFile("views/footer.ejs", {
    js: assets.loadJS(),
    base_url: CONFIG.BASE_URL,
  });
  var body = await ejs.renderFile("views/service/hr.ejs", {
    base_url: CONFIG.BASE_URL,
  });
  // console.log(services.indexOf(req.params.service));
  res.render("body", { header: header, body: body, footer: footer });
});
router.get("/payroll", async (req, res) => {
  var header = await ejs.renderFile("views/header.ejs", {
    css: assets.loadCSS(),
    base_url: CONFIG.BASE_URL,
  });
  var footer = await ejs.renderFile("views/footer.ejs", {
    js: assets.loadJS(),
    base_url: CONFIG.BASE_URL,
  });
  var body = await ejs.renderFile("views/service/payroll.ejs", {
    base_url: CONFIG.BASE_URL,
  });
  // console.log(services.indexOf(req.params.service));
  res.render("body", { header: header, body: body, footer: footer });
});
router.get("/performance", async (req, res) => {
  var header = await ejs.renderFile("views/header.ejs", {
    css: assets.loadCSS(),
    base_url: CONFIG.BASE_URL,
  });
  var footer = await ejs.renderFile("views/footer.ejs", {
    js: assets.loadJS(),
    base_url: CONFIG.BASE_URL,
  });
  var body = await ejs.renderFile("views/service/performance.ejs", {
    base_url: CONFIG.BASE_URL,
  });
  // console.log(services.indexOf(req.params.service));
  res.render("body", { header: header, body: body, footer: footer });
});
router.get("/recruit", async (req, res) => {
  var header = await ejs.renderFile("views/header.ejs", {
    css: assets.loadCSS(),
    base_url: CONFIG.BASE_URL,
  });
  var footer = await ejs.renderFile("views/footer.ejs", {
    js: assets.loadJS(),
    base_url: CONFIG.BASE_URL,
  });
  var body = await ejs.renderFile("views/service/recruit.ejs", {
    base_url: CONFIG.BASE_URL,
  });
  // console.log(services.indexOf(req.params.service));
  res.render("body", { header: header, body: body, footer: footer });
});
router.get("/timesheet", async (req, res) => {
  var header = await ejs.renderFile("views/header.ejs", {
    css: assets.loadCSS(),
    base_url: CONFIG.BASE_URL,
  });
  var footer = await ejs.renderFile("views/footer.ejs", {
    js: assets.loadJS(),
    base_url: CONFIG.BASE_URL,
  });
  var body = await ejs.renderFile("views/service/timesheet.ejs", {
    base_url: CONFIG.BASE_URL,
  });
  // console.log(services.indexOf(req.params.service));
  res.render("body", { header: header, body: body, footer: footer });
});

module.exports = router;
