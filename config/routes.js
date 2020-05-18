const express = require("express"),
    router = express.Router();
// load site map
router.get('/sitemap.xml', function (req, res) {
    res.sendFile(`${ROOT_DIR}/public/sitemap.xml`);
});

// load defualt for redirect
router.use("/", require(ROOT_DIR + '/controllers/default'))

// // laod middlewares
router.use("/v", require(ROOT_DIR + '/middlewares/base'))
router.use("/v", require(ROOT_DIR + '/middlewares/auth'))

router.use("/v", require(ROOT_DIR + '/controllers/user/admin'))


router.use("/api", require(ROOT_DIR + '/controllers/api/user/admin'))

module.exports = router;