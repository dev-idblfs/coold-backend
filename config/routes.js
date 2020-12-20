const express = require("express"),
  router = express.Router();

// load defualt for redirect and static content
router.use("/", require(ROOT_DIR + "/controllers"));

// laod middlewares

router.use("/auth", require(ROOT_DIR + "/middlewares/auth"));
router.use("/auth", require(ROOT_DIR + "/middlewares/base"));

router.use("/auth/v1", require("../controllers/v1"));

router.use("/api/brands", require("../controllers/api/auth"));

module.exports = router;
