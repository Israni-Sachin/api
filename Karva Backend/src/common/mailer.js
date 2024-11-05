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

const mailer = (email, link) => {

    const mailOptions = {
        from: 'sachinisrani56@gmail.com',
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

const passChangeMail = (email) => {

    const mailOptions = {
        from: 'sachinisrani56@gmail.com',
        to: email,
        subject: 'Password Changed',
        text: `Your password has been changed.If not you please change your password again`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = { mailer, passChangeMail };