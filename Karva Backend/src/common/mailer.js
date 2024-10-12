const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        // type: 'OAuth2',
        user: process.env.USER,
        pass: process.env.PASS,
        // clientId: process.env.CLIENTID,
        // clientSecret: process.env.CLIENTSECRET,
        // refreshToken: process.env.REFRESHTOKEN,
    }
});

const mailer = (email,link) =>{

    const mailOptions = {
        from: 'orderify143@gmail.com',
        to: email,
        subject: 'Reset Password',
        text: `Reset Password Link - ${link}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
module.exports = mailer;