const express = require("express"),
  router = express.Router();

// load site map yo
router.get("/sitemap.xml", (req, res) => {
  res.sendFile(`${ROOT_DIR}/public/sitemap.xml`);
});

router.get("/.well-known/pki-validation/381DFBF545A4310FA90B07DF58DFEB66.txt", (req, res) => {
  res.sendFile(`${ROOT_DIR}/public/381DFBF545A4310FA90B07DF58DFEB66.txt`);
});



// laod middlewares

router.use("/auth", require("../middlewares/auth"));
router.use("/auth", require("../middlewares/base"));

router.use("/auth/v1", require("../controllers/v1"));

router.use("/api/brands", require("../controllers/api/auth"));


module.exports = router;
