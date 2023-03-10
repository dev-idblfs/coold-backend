const express = require("express"),
    router = express.Router();
const request = require("request-promise");
const nodemailer = require("nodemailer");

const mailAPI = (data, code) => {
    return new Promise(async (resolve, reject) => {
        const { name, email } = data;
        const options = {
            method: "POST",
            uri: "https://idblfs-email-sending.herokuapp.com/sendmail",
            body: {
                from: "Coold HR <hr@coold.com>",
                to: email,
                subject: "Coold - Verify Email",
                body_html: `
										<!DOCTYPE html>
										<html>
										<head>
										</head>
										<body>
										<p style="text-align: left;"><span style="font-family: georgia, palatino;">Hey <strong>${
                                            name.split(" ")[0] || ""
                                        }!</strong>,</span></p><br>
										<p style="text-align: left;"><span style="font-family: georgia, palatino;"><strong>Verify your email - Just one more step!</strong> </span><br><br><span style="font-family: georgia, palatino;">Kindly enter this "<strong>${code}</strong>" verification code to proceed further. </span></p>
										<p style="text-align: left;"><span style="font-family: georgia, palatino;">We are on a mission of finding the best suitable option for job seekers, intern seekers &amp; freelancer and make your life simpler, more productive &amp; effective. This should be easy.</span><br><br><span style="font-family: georgia, palatino;">To get started, first, you need to verify the email address.&nbsp;</span></p>
										<p style="text-align: left;"><span style="font-family: georgia, palatino;">Thanks &amp; Regards,</span></p>
										<p style="text-align: left;"><span style="font-family: georgia, palatino;">Coold HR&nbsp;</span></p>
										</body>
										</html>`,
            },
            headers: {
                Origin: "https://www.coold.com",
            },
            json: true,
        };
        request(options)
            .then((body) => {
                if (body) {
                    console.log(body);
                    resolve({ status: 200, message: body });
                }
            })
            .catch((err) => {
                console.log(err);
                reject({ status: 500, message: "Please try Again" });
            });
    });
};

const mail = () => {
    console.log(CONFIG.MAIL_AUTH.auth);
    return nodemailer.createTransport({
        service: "Godaddy",
        secureConnection: true,
        auth: CONFIG.MAIL_AUTH.auth,
    });
};

const sendMail = (options) => {
    return new Promise((resolve, reject) => {
        var transporter = mail();
        transporter.sendMail(options, (error, info) => {
            if (error) {
                console.log("send mail error", error);
                response = error;
                // res.send(response);
                console.log(error);
                reject({ code: 500, message: error });
            } else {
                console.log("Email sent: " + info.response);
                response = info;
                // res.send(response);
                console.log(info);
                resolve({ code: 200, message: info });
            }
        });
    });
};

module.exports = {
    sendMail: sendMail,
    mailAPI: mailAPI,
};
