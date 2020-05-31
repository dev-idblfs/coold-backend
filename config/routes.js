const express = require("express"),
    router = express.Router();
// load site map yo
router.get('/sitemap.xml', (req, res) => {
    res.sendFile(`${ROOT_DIR}/public/sitemap.xml`);
});

router.get('/done', async (req, res) => {
    // console.log(req.body);
    const { exec } = require('child_process');
    try {
        const bat = exec('bat.bat');
        var output = '';
        bat.stdout.on('data', (data) => {
            console.log(data.toString());
            output += data;
        });

        bat.stderr.on('data', (data) => {
            console.error(data.toString());
            console.log('hello');
            res.end(data);
        });

        bat.on('exit', (code) => {
            console.log(`Child exited with code ${code}`);
            res.send(output || "ok");
        });
        res.send(req.body || 'pl');
    } catch (error) {
        res.send(error);
    }
})
// load defualt for redirect
router.use("/", require(ROOT_DIR + '/controllers/default'))

// // laod middlewares
router.use("/v", require(ROOT_DIR + '/middlewares/base'))
router.use("/v", require(ROOT_DIR + '/middlewares/auth'))

router.use("/v", require(ROOT_DIR + '/controllers/user/admin'))


router.use("/api", require(ROOT_DIR + '/controllers/api/user/admin'))

module.exports = router;
