const express = require("express"),
  router = express.Router();

// load site map yo
router.get("/sitemap.xml", (req, res) => {
  res.sendFile(`${ROOT_DIR}/public/sitemap.xml`);
});

router.get("/.well-known/pki-validation/381DFBF545A4310FA90B07DF58DFEB66.txt", (req, res) => {
  res.sendFile(`${ROOT_DIR}/public/381DFBF545A4310FA90B07DF58DFEB66.txt`);
});

router.use("/", require(ROOT_DIR + "/controllers/site"));

module.exports = router;
