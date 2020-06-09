const express = require("express"),
    router = express.Router();


// load site map yo
router.get('/sitemap.xml', (req, res) => {
    res.sendFile(`${ROOT_DIR}/public/sitemap.xml`);
});

router.post('/done', async (req, res) => {
    console.log(req.body || "body");
    const { exec } = require('child_process');
    try {
        const bat = exec('bat.bat');
        var output = '';
        bat.stdout.on('data', (data) => {
            console.log(data.toString() || 'data');
            output += data;
        });

        bat.stderr.on('data', (data) => {
            console.error(data.toString() || 'data2');
            console.log('hello');
            res.end(data);
        });

        bat.on('exit', (code) => {
            console.log(`Child exited with code ${code}`);
            res.send(output || "ok");
        });
        res.send(req.body || 'pl');
    } catch (error) {
        console.log('eeror');
        res.send(error);
    }
})

router.use("/", require(ROOT_DIR + '/controllers/site/controller'))

module.exports = router;