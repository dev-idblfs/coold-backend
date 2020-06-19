const mail = require(`${ROOT_DIR}/libraries/utils/mail`);


const sendMail = async () => {
    let response;
    let html = `<!DOCTYPE html>
    <html>
    <head>
    </head>
    <body>
    <p style="text-align: left;"><span style="font-family: georgia, palatino;">Hey <strong>garg2509</strong>,</span></p>
    <p style="text-align: left;"><span style="font-family: georgia, palatino;">!<strong>Verify your email - Just one more step!</strong> </span><br /><br /><span style="font-family: georgia, palatino;">Kindly enter this "<strong>123r435</strong>" verification code to proceed further. </span></p>
    <p style="text-align: left;"><span style="font-family: georgia, palatino;">We are on a mission of finding the best suitable option for job seekers, intern seekers &amp; freelancer and make your life simpler, more productive &amp; effective. This should be easy.</span><br /><br /><span style="font-family: georgia, palatino;">To get started, first, you need to verify the email address.&nbsp;</span></p>
    <p style="text-align: left;"><br /><span style="font-family: georgia, palatino;">Thanks &amp; Regards,</span></p>
    <p style="text-align: left;"><span style="font-family: georgia, palatino;">Onxcy HR&nbsp;</span></p>
    </body>
    </html> `;

    var mailOptions = {
        from: 'Onxcy HR <hr@onxcy.com>',
        to: ['anshudivvy@gmail.com'],
        subject: 'subject',
        html: html,
        sender: "anshu <hr@onxcy.com>",
        replyTo: 'Onxcy <hr@onxcy.com>',
    };
    try {
        response = await mail.sendMail(mailOptions);
        return response;
    } catch (error) {
        console.log("erroor", error);
        return error;
    }
}


const rand = () => {
    return Math.floor(100000 + Math.random() * 900000);
}


module.exports = {
    sendMail: sendMail,
    getOtp: rand
}