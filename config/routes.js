const express = require("express"),
    router = express.Router();
// load site map
router.get('/sitemap.xml', function (req, res) {
    res.sendFile(`${ROOT_DIR}/public/sitemap.xml`);
});

router.get('/done', (req, res) => {
    const { spawn } = require('child_process');
    const bat = spawn('cmd.exe', ['/c', 'bat.sh']);
    var resp;
    bat.stdout.on('data', (data) => {
        console.log(data.toString());
    });

    bat.stderr.on('data', (data) => {
        console.error(data.toString());
    });

    bat.on('exit', (code) => {
        console.log(`Child exited with code ${code}`);
    });
    res.send('ok');
})
// load defualt for redirect
router.use("/", require(ROOT_DIR + '/controllers/default'))

// // laod middlewares
router.use("/v", require(ROOT_DIR + '/middlewares/base'))
router.use("/v", require(ROOT_DIR + '/middlewares/auth'))

router.use("/v", require(ROOT_DIR + '/controllers/user/admin'))


router.use("/api", require(ROOT_DIR + '/controllers/api/user/admin'))

module.exports = router;