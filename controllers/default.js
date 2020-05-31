const express = require("express"),
    router = express.Router();
const path = require('path')
var ejs = require('ejs');
const resume = require(ROOT_DIR + '/modals/resumes');
const s3 = require(ROOT_DIR + '/utils/s3')
const request = require('request-promise');
const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'resumes')
    },
    filename: function (req, file, cb) {
        console.log(file);
        cb(null, Date.now() + '-' + file.originalname)
    }
})

var upload = multer({ storage: storage }).single('file')

const mail = (email, code) => {
    return new Promise(async (resolve, reject) => {
        const options = {
            method: 'POST',
            uri: 'https://idblfs-email-sending.herokuapp.com/sendmail',
            body: {
                from: "Onxcy HR <hr@onxcy.com>",
                to: email,
                subject: "Onxcy - Verify Email",
                body_html: `
                    <!DOCTYPE html>
                    <html>
                    <head>
                    </head>
                    <body>
                    <p style="text-align: left;"><span style="font-family: georgia, palatino;">Hey <strong>${email.split('@')[0]}!</strong>,</span></p><br/><br/><br/>
                    <p style="text-align: left;"><span style="font-family: georgia, palatino;">!<strong>Verify your email - Just one more step!</strong> </span><br /><br /><span style="font-family: georgia, palatino;">Kindly enter this "<strong>${code}</strong>" verification code to proceed further. </span></p>
                    <p style="text-align: left;"><span style="font-family: georgia, palatino;">We are on a mission of finding the best suitable option for job seekers, intern seekers &amp; freelancer and make your life simpler, more productive &amp; effective. This should be easy.</span><br /><br /><span style="font-family: georgia, palatino;">To get started, first, you need to verify the email address.&nbsp;</span></p>
                    <p style="text-align: left;"><br /><span style="font-family: georgia, palatino;">Thanks &amp; Regards,</span></p>
                    <p style="text-align: left;"><span style="font-family: georgia, palatino;">Onxcy HR&nbsp;</span></p>
                    </body>
                    </html>`
            },
            json: true,
        }
        request(options).then((body) => {
            if (body) {
                console.log(body);
                resolve({ status: 200, message: body })
            }
        }).catch((err) => {
            reject({ status: 304, message: "Please try Again" })
        });
    });

}

const _loadJS = () => {
    let js = {
        a: CONFIG.BASE_URL + "public/js/jquery.min.js",
        b: CONFIG.BASE_URL + "public/js/bootstrap.min.js",
        c: CONFIG.BASE_URL + "public/js/slick.min.js",
        d: CONFIG.BASE_URL + "public/js/venobox.min.js",
        e: CONFIG.BASE_URL + "public/js/gmap.js",
        f: CONFIG.BASE_URL + "public/js/fuse.min.js",
        g: CONFIG.BASE_URL + "public/js/mark.js",
        h: CONFIG.BASE_URL + "public/js/search.js",
        i: CONFIG.BASE_URL + "public/js/ddj.js",
        j: CONFIG.BASE_URL + "public/js/script.min.js",
        k: CONFIG.BASE_URL + "public/js/sweetAlerts.js",
        brandIcon: CONFIG.BASE_URL + 'public/images/icon/icon.png'
    }
    return js;
}

const _loadCSS = () => {
    let css = {
        a: CONFIG.BASE_URL + "public/scss/bootstrap.min.css",
        b: CONFIG.BASE_URL + "public/scss/slick.css",
        c: CONFIG.BASE_URL + "public/scss/font-awesome.min.css",
        d: CONFIG.BASE_URL + "public/scss/venobox.css",
        e: CONFIG.BASE_URL + "public/scss/ddj.css",
        f: CONFIG.BASE_URL + "public/scss/style.min.css",
        brandIcon: CONFIG.BASE_URL + 'public/images/icon/icon.png',
        loader: CONFIG.BASE_URL + 'public/images/preloader.gif'
    }
    return css
}
// request to get all the users
router.get("/", async function (req, res) {
    var header = await ejs.renderFile('views/header.ejs', { css: _loadCSS(), base_url: CONFIG.BASE_URL });
    var footer = await ejs.renderFile('views/footer.ejs', { js: _loadJS(), base_url: CONFIG.BASE_URL });
    var body = await ejs.renderFile('views/index.ejs');
    res.render('body', { header: header, body: body, footer: footer });
})

// request to get all the users by userName
router.get("/about", async function (req, res) {
    var header = await ejs.renderFile('views/header.ejs', { css: _loadCSS(), base_url: CONFIG.BASE_URL });
    var footer = await ejs.renderFile('views/footer.ejs', { js: _loadJS(), base_url: CONFIG.BASE_URL });
    var body = await ejs.renderFile('views/about/index.ejs');

    res.render('body', { header: header, body: body, footer: footer });

})
router.get("/services", async function (req, res) {
    var header = await ejs.renderFile('views/header.ejs', { css: _loadCSS(), base_url: CONFIG.BASE_URL });
    var footer = await ejs.renderFile('views/footer.ejs', { js: _loadJS(), base_url: CONFIG.BASE_URL });
    var body = await ejs.renderFile('views/service/index.ejs');

    res.render('body', { header: header, body: body, footer: footer });

})

router.get("/contact", async function (req, res) {
    var header = await ejs.renderFile('views/header.ejs', { css: _loadCSS(), base_url: CONFIG.BASE_URL });
    var footer = await ejs.renderFile('views/footer.ejs', { js: _loadJS(), base_url: CONFIG.BASE_URL });
    var body = await ejs.renderFile('views/contact/index.ejs');

    res.render('body', { header: header, body: body, footer: footer });

})

router.get("/resume", async function (req, res) {
    var header = await ejs.renderFile('views/header.ejs', { css: _loadCSS(), base_url: CONFIG.BASE_URL });
    var footer = await ejs.renderFile('views/footer.ejs', { js: _loadJS(), base_url: CONFIG.BASE_URL });
    var body = await ejs.renderFile('views/resume/index.ejs');

    res.render('body', { header: header, body: body, footer: footer });

})

router.post("/resume", async (req, res) => {
    try {
        if (Object.keys(req.body).length > 0) {
            let params = req.body;
            if (params.email && params.step && params.step == 1) {
                if (['example@domain.com'].includes(params.email)) {
                    return res.send({ status: 200, message: "Verification mail has been sent to your Email" })
                }
                delete params.step;
                isfound = await resume.fetch({ email: params.email })
                if (isfound.body.length > 0) {
                    return res.send({ status: 304, message: "Email Already Exists" });;
                }
                params.isVerified = 0;
                // generatting otp for verification
                params.otp = Math.floor(100000 + Math.random() * 900000);
                // sending mail using API
                await mail(params.email, params.otp);

                result = await resume.insert(params);

                if (result.status == 200) {
                    res.send({ status: 200, message: "Verification mail has been sent to your Email" });
                }
                else res.send({ status: 200, message: "Something Went Wrong please try again" });

            } else if (params.otp && params.email && params.step && params.step == 2) {
                if (['example@domain.com'].includes(params.email)) {
                    if (params.otp != 000000) {
                        return res.send({ status: 500, message: "Wrong OTP Entered" });
                    }
                    return res.send({ status: 200, message: "Email verified" })
                }
                delete params.step;
                filter = {
                    email: params.email
                }
                let list = await resume.fetch(filter)
                if (list.body[0].otp == params.otp && list.body[0].email == params.email) {
                    result = await resume.update({ isVerified: 1 }, { _id: list.body[0]._id });
                    if (result.status == 200) {
                        return res.send({ status: 200, message: "Email Varified" });
                    }
                } else {
                    return res.send({ status: 500, message: "Wrong OTP Entered" });
                }
            }
        } else {
            upload(req, res, async (err) => {
                if (err instanceof multer.MulterError) {
                    return res.status(500).send(err)
                } else if (err) {
                    return res.status(500).send(err)
                }
                let params = req.body;
                if (params.email && params.step && params.step == 3) {
                    if (['example@domain.com'].includes(params.email)) {
                        return res.send({ status: 200, message: "Thank you For Subbmitted" })
                    }
                    delete params.step;
                    filter = {
                        email: params.email
                    }
                    // setting file for upload resume for unqiue identification
                    // append email
                    let filename = `${params.email}-${req.file.filename}`
                    var result = await s3.putObject(res.file, filename);
                    if (result.status == 200) {
                        let list = await resume.fetch(filter)
                        params.filename = filename;
                        result = await resume.update(params, { _id: list.body[0]._id });
                        if (result.status == 200) {
                            return res.send({ status: 200, message: "Thank you For Subbmitted" });
                        }
                    } else {
                        return res.send({ status: 500, message: "Unable to upload Your resume" });
                    }
                } else {
                    return res.send({ status: 500, message: "Email Not Found" });
                }
            })
        }
    } catch (error) {
        result = error;
        console.log(result);
        res.send({ status: 304, message: "plases try again" });
    }
})

router.get("/policy", async function (req, res) {
    var header = await ejs.renderFile('views/header.ejs', { css: _loadCSS(), base_url: CONFIG.BASE_URL });
    var footer = await ejs.renderFile('views/footer.ejs', { js: _loadJS(), base_url: CONFIG.BASE_URL });
    var body = await ejs.renderFile('views/policy/index.ejs');

    res.render('body', { header: header, body: body, footer: footer });

})

const services = ['hr', 'payroll', 'performance', 'recruit', 'timesheet'];

router.get("/services/:service", async function (req, res, next) {
    console.log(req.params);
    if (Object.keys(req.params).length > 0 && services.includes(req.params.service)) {
        var header = await ejs.renderFile('views/header.ejs', { css: _loadCSS(), base_url: CONFIG.BASE_URL });
        var footer = await ejs.renderFile('views/footer.ejs', { js: _loadJS(), base_url: CONFIG.BASE_URL });
        var body = await ejs.renderFile('views/service/aio-index.ejs', { index: services.indexOf(req.params.service) + 1, base_url: CONFIG.BASE_URL });
        // console.log(services.indexOf(req.params.service));
        res.render('body', { header: header, body: body, footer: footer });
    } else {
        res.send(req.hostname);
    }

})

module.exports = router;