const express = require("express"),
    router = express.Router();

router.use("/", require(ROOT_DIR + '/controllers/site/site'))
router.use("/services", require(ROOT_DIR + '/controllers/site/services'))

module.exports = router;