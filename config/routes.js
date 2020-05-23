const express = require("express"),
    router = express.Router();
// load site map
router.get('/sitemap.xml', function (req, res) {
    res.sendFile(`${ROOT_DIR}/public/sitemap.xml`);
});

router.get('/done', function (req, res) {
    const { spawn } = require('child_process');
    const child = spawn('git pull');
    // use child.stdout.setEncoding('utf8'); if you want text chunks
    child.stdout.on('data', (chunk) => {
        res.send(chunk);
        // data from the standard output is here as buffers
    });
    // since these are streams, you can pipe them elsewhere
    child.stderr.pipe(dest);
    child.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
        res.send(code);
    });
    // exec('git pull', (err, stdout, stderr) => {
    //     if (err) {
    //         //some err occurred
    //         console.error(err)
    //     } else {
    //         // the *entire* stdout and stderr (buffered)
    //         console.log(`stdout: ${stdout}`);
    //         console.log(`stderr: ${stderr}`);
    //         res.send(stderr);
    //     }
    // });

})
// load defualt for redirect
router.use("/", require(ROOT_DIR + '/controllers/default'))

// // laod middlewares
router.use("/v", require(ROOT_DIR + '/middlewares/base'))
router.use("/v", require(ROOT_DIR + '/middlewares/auth'))

router.use("/v", require(ROOT_DIR + '/controllers/user/admin'))


router.use("/api", require(ROOT_DIR + '/controllers/api/user/admin'))

module.exports = router;