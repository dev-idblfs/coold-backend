const express = require("express"),
    router = express.Router();
const path = require('path')
var ejs = require('ejs');
const resume = require(ROOT_DIR + '/modals/resumes');
const s3 = require(ROOT_DIR + '/libraries/utils/s3')
const request = require('request-promise');
const multer = require('multer');
const assets = require(`${ROOT_DIR}//controllers/site/load_base`);
const mail = require(`${ROOT_DIR}/libraries/utils/mail`);
const mailuitls = require(`${ROOT_DIR}/libraries/utils/utils`);


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



// request to get all the users
router.get("/", async (req, res) => {
    var header = await ejs.renderFile('views/header.ejs', { css: assets.loadCSS(), base_url: CONFIG.BASE_URL });
    var footer = await ejs.renderFile('views/footer.ejs', { js: assets.loadJS(), base_url: CONFIG.BASE_URL });
    var body = await ejs.renderFile('views/index.ejs');
    res.render('body', { header: header, body: body, footer: footer });
})

// request to get all the users by userName
router.get("/about", async (req, res) => {
    var header = await ejs.renderFile('views/header.ejs', { css: assets.loadCSS(), base_url: CONFIG.BASE_URL });
    var footer = await ejs.renderFile('views/footer.ejs', { js: assets.loadJS(), base_url: CONFIG.BASE_URL });
    var body = await ejs.renderFile('views/about/index.ejs');

    res.render('body', { header: header, body: body, footer: footer });

})

router.get("/contact", async (req, res) => {
    var header = await ejs.renderFile('views/header.ejs', { css: assets.loadCSS(), base_url: CONFIG.BASE_URL });
    var footer = await ejs.renderFile('views/footer.ejs', { js: assets.loadJS(), base_url: CONFIG.BASE_URL });
    var body = await ejs.renderFile('views/contact/index.ejs');

    res.render('body', { header: header, body: body, footer: footer });

})

router.get("/resume", async (req, res) => {
    var header = await ejs.renderFile('views/header.ejs', { css: assets.loadCSS(), base_url: CONFIG.BASE_URL });
    var footer = await ejs.renderFile('views/footer.ejs', { js: assets.loadJS(), base_url: CONFIG.BASE_URL });
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
                await mail.mailAPI(params.email, params.otp);

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

router.get("/policy", async (req, res) => {
    var header = await ejs.renderFile('views/header.ejs', { css: assets.loadCSS(), base_url: CONFIG.BASE_URL });
    var footer = await ejs.renderFile('views/footer.ejs', { js: assets.loadJS(), base_url: CONFIG.BASE_URL });
    var body = await ejs.renderFile('views/policy/index.ejs');

    res.render('body', { header: header, body: body, footer: footer });
})

module.exports = router;