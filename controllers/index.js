const express = require("express"),
  router = express.Router();

// load site map yo
router.get("/sitemap.xml", (req, res) => {
  res.sendFile(`${ROOT_DIR}/public/sitemap.xml`);
});

router.use("/", require(ROOT_DIR + "/controllers/site"));

module.exports = router;
