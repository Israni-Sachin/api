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

const mailer = (email, links) => {

    const mailOptions = {
        from: 'testchhe994@gmail.com',
        to: email,
        subject: 'Reset Password',
        html: `<h4> Reset Password Link </h4> <p> Frontend - ${links.fe_link} </p><p> localhost - ${links.local_link}</p>`
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
        from: 'testchhe994@gmail.com',
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

const OrderSuccessMail = (email,htmlcontent)=>{
    const mailOptions = {
        from: 'testchhe994@gmail.com',
        to: email,
        subject: 'Order Successfully',
        html: htmlcontent
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = { mailer, passChangeMail ,OrderSuccessMail};