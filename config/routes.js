const express = require("express"),
    router = express.Router();


    // load defualt for redirect and static content
router.use("/", require(ROOT_DIR + '/controllers/default'))

// laod middlewares
router.use("/v1", require(ROOT_DIR + '/middlewares/base'))
router.use("/v1", require(ROOT_DIR + '/middlewares/auth'))

router.use("/v1", require(ROOT_DIR + '/controllers/user/admin'))


router.use("/api", require(ROOT_DIR + '/controllers/api/user/admin'))

module.exports = router;
