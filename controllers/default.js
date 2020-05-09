var express = require("express"),
    router = express.Router();
var path = require('path')
var ejs = require('ejs');
const multer = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public')
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
                from: "Onxcy <no-reply@onxcy.com>",
                to: email,
                subject: "Onxcy - Verify Email",
                body_html: `Hey ${email.split('@')[0]}!</br></br>
    
                <strong>Verify your email - Just one more step!</strong>
                <br><br>
                We’re on a mission to let you make chat bots and make your working life simpler, more pleasant and more productive. This should be easy.
                <br><br>
                To get started, first you need to verify the email address 
                <br><br>
                enter this Verification code on the Verification Page ${code}
                <br><br>
                <br><br>
                
                Thanks,
                Onxcy Team`
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
        a: "public/js/jquery.min.js",
        b: "public/js/bootstrap.min.js",
        c: "public/js/slick.min.js",
        d: "public/js/venobox.min.js",
        e: "public/js/gmap.js",
        f: "public/js/fuse.min.js",
        g: "public/js/mark.js",
        h: "public/js/search.js",
        i: "public/js/ddj.js",
        j: "public/js/script.min.js",
        brandIcon: 'public/images/icon/icon.png'
    }
    return js;
}

const _loadCSS = () => {
    let css = {
        a: "public/scss/bootstrap.min.css",
        b: "public/scss/slick.css",
        c: "https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css",
        d: "public/scss/venobox.css",
        e: "public/scss/ddj.css",
        f: "public/scss/style.min.css",
        brandIcon: 'public/images/icon/icon.png',
        loader: 'public/images/preloader.gif'
    }
    return css
}
// request to get all the users
router.get("/", async function (req, res) {
    var header = await ejs.renderFile('views/header.ejs', { css: _loadCSS() });
    var footer = await ejs.renderFile('views/footer.ejs', { js: _loadJS() });
    var body = await ejs.renderFile('views/index.ejs');
    res.render('body', { header: header, body: body, footer: footer });
})

// request to get all the users by userName
router.get("/about", async function (req, res) {
    var header = await ejs.renderFile('views/header.ejs', { css: _loadCSS() });
    var footer = await ejs.renderFile('views/footer.ejs', { js: _loadJS() });
    var body = await ejs.renderFile('views/about/index.ejs');

    res.render('body', { header: header, body: body, footer: footer });

})
router.get("/service", async function (req, res) {
    var header = await ejs.renderFile('views/header.ejs', { css: _loadCSS() });
    var footer = await ejs.renderFile('views/footer.ejs', { js: _loadJS() });
    var body = await ejs.renderFile('views/service/index.ejs');

    res.render('body', { header: header, body: body, footer: footer });

})
router.get("/contact", async function (req, res) {
    var header = await ejs.renderFile('views/header.ejs', { css: _loadCSS() });
    var footer = await ejs.renderFile('views/footer.ejs', { js: _loadJS() });
    var body = await ejs.renderFile('views/contact/index.ejs');

    res.render('body', { header: header, body: body, footer: footer });

})

router.get("/resume", async function (req, res) {
    var header = await ejs.renderFile('views/header.ejs', { css: _loadCSS() });
    var footer = await ejs.renderFile('views/footer.ejs', { js: _loadJS() });
    var body = await ejs.renderFile('views/resume/index.ejs');

    res.render('body', { header: header, body: body, footer: footer });

})

router.post("/resume", async (req, res) => {
    if (Object.keys(req.body).length > 0) {
        let params = req.body;
        console.log(req.files);
        try {
            if (params.email && params.step && params.step == 1) {
                delete params.step;
                isfound = await resume.fetch({ email: params.email })
                if (isfound.body.length > 0) {
                    return res.send({ status: 304, message: "Email Already Exists" });;
                }
                params.isVerified = 0;
                params.otp = Math.floor(100000 + Math.random() * 900000);
                await mail(params.email, params.otp);
                result = await resume.insert(params);
                if (result.status == 200) {
                    res.send({ status: 200, message: "Varify Your Email" });
                } else res.send({ status: 200, message: "not Inserted" });
            } else if (params.otp && params.email && params.step && params.step == 2) {
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
                    return res.send({ status: 200, message: "Wrong OTP Entered" });
                }
            } else if (params.email && params.step && params.step == 3) {
                delete params.step;
                filter = {
                    email: params.email
                }
                let list = await resume.fetch(filter)
                result = await resume.update(params, { _id: list.body[0]._id });
                if (result.status == 200) {
                    return res.send({ status: 200, message: "Thankyou For Subbmitted" });
                }
                // upload(req, res, async (err) => {
                //     if (err instanceof multer.MulterError) {
                //         return res.status(500).send(err)
                //     } else if (err) {
                //         return res.status(500).send(err)
                //     }
                //     console.log(req.file);
                //     var result = await s3.putObject(res.file, req.file.filename);
                //     if (result.body == 200) {
                //         result
                //     }
                // })
            }
        } catch (error) {
            result = error;
            res.send({ status: 304, message: "plases try again" });
        }

    }
})

module.exports = router;