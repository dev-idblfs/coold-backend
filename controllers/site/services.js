
const express = require("express"),
    router = express.Router();
const assets = require(`${ROOT_DIR}//controllers/site/load_base`);
const ejs = require('ejs');



router.get("/", async function (req, res) {
    var header = await ejs.renderFile('views/header.ejs', { css: assets.loadCSS(), base_url: CONFIG.BASE_URL });
    var footer = await ejs.renderFile('views/footer.ejs', { js: assets.loadJS(), base_url: CONFIG.BASE_URL });
    var body = await ejs.renderFile('views/service/index.ejs');

    res.render('body', { header: header, body: body, footer: footer });

})

router.get("/:service", async function (req, res) {
    console.log(req.params);
    var services = ['hr', 'payroll', 'performance', 'recruit', 'timesheet'];

    if (Object.keys(req.params).length > 0 && services.includes(req.params.service)) {
        var header = await ejs.renderFile('views/header.ejs', { css: assets.loadCSS(), base_url: CONFIG.BASE_URL });
        var footer = await ejs.renderFile('views/footer.ejs', { js: assets.loadJS(), base_url: CONFIG.BASE_URL });
        var body = await ejs.renderFile('views/service/aio-index.ejs', { index: services.indexOf(req.params.service) + 1, base_url: CONFIG.BASE_URL });
        // console.log(services.indexOf(req.params.service));
        res.render('body', { header: header, body: body, footer: footer });
    } else {
        res.sendStatus(404);
    }

});

module.exports = router;