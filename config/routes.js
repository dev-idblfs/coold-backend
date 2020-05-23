const express = require("express"),
    router = express.Router();
// load site map
router.get('/sitemap.xml', function (req, res) {
    res.sendFile(`${ROOT_DIR}/public/sitemap.xml`);
});

router.get('/ok', function (req, res) {
    const { exec } = require('child_process');
    exec('git pull', (err, stdout, stderr) => {
        if (err) {
            //some err occurred
            console.error(err)
        } else {
            // the *entire* stdout and stderr (buffered)
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
            res.send(stderr);
        }
    });
})
// load defualt for redirect
router.use("/", require(ROOT_DIR + '/controllers/default'))

// // laod middlewares
router.use("/v", require(ROOT_DIR + '/middlewares/base'))
router.use("/v", require(ROOT_DIR + '/middlewares/auth'))

router.use("/v", require(ROOT_DIR + '/controllers/user/admin'))


router.use("/api", require(ROOT_DIR + '/controllers/api/user/admin'))

module.exports = router;