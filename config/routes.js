const express = require("express"),
  router = express.Router();

// load defualt for redirect and static content
router.use("/", require(ROOT_DIR + "/controllers"));

// laod middlewares
router.use("/v1", require(ROOT_DIR + "/middlewares/base"));
router.use("/v1", require(ROOT_DIR + "/middlewares/auth"));

router.use("/v1", require("../controllers/brands"));

router.use("/api/brands", require("../controllers/api/brands"));

module.exports = router;
