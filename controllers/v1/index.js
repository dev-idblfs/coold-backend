
const express = require("express"),
  router = express.Router();

router.use("/user", require("./user"));
router.use("/reimburs", require("./reimburs"));
router.use("/form", require("./form"));

module.exports = router;
