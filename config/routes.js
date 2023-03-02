const express = require("express"),
  router = express.Router();

// load defualt for redirect and static content
router.use("/", require("../controllers"));

module.exports = router;
