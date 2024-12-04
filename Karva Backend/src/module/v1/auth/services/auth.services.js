const Users = require("../../../../models/user.model");
const { createToken } = require("../../../../middlewares/token");
const { hashPassword, comparePassword } = require("../../../../common/hash-password");
require('dotenv').config();
const { mailer, passChangeMail } = require("../../../../common/mailer");
const { gererateLink, decryptLink } = require("../../../../common/reset-pass-link");

const login = async (data) => {
        let user = await Users.findOne({ user_email: data.user_email });

        if (!user)
                throw new Error("EMAIL_NOT_FOUND");

        let check = await comparePassword(data.user_pass, user.user_pass);

        if (!check)
                throw new Error("INVALID_CREDENTIALS");

        let userData = { ...user._doc, user_pass: undefined };

        let encodedData = createToken({ id: user._id, role: user.user_role });

        return { userData, encodedData };
}

const register = async (data) => {
        let check = await Users.findOne({ user_email: data.user_email });
        let check2 = await Users.findOne({ user_phone: data.user_phone });
        if (check)
                throw new Error("ALREADY_EXISTS_EMAIL")

        if (check2)
                throw new Error("ALREADY_EXISTS_NUMBER")

        data.user_pass = await hashPassword(data);
        await Users.create(data);

        const user = await Users.findOne({ user_email: data.user_email });

        let userData = { ...user._doc, user_pass: undefined };
        let encodedData = createToken({ id: user._id, role: user.user_role }); // by default user role: customer

        return { userData, encodedData };
}


const resetPassLinkMailer = async (data) => {

        let user = await Users.findOne({ user_email: data.user_email });
        if (!user) throw new Error("USER_NOT_FOUND")

        let links = await gererateLink({ ...data, iat: Date.now(), exp: Date.now() + 600000 });
        //fe link / reset-pass / token
        mailer(user.user_email, links); // pending front end link will be added and sent
}

const resetPass = async (data) => {
        const decodedData = await decryptLink(data.token);
        console.log(decodedData);
        if (Date.now() > decodedData.exp) return "LinkExpired";
        data.user_pass = await hashPassword(data);
        await Users.findOneAndUpdate({ user_email: decodedData.user_email }, { user_pass: data.user_pass });
        passChangeMail(decodedData.user_email) // pending front end link will be added and sent
}

const changePass = async (data) => {

        let user = await Users.findOne({ _id: data.id });
        if (!user) throw new Error("DATA_NOT_FOUND");

        let check = await comparePassword(data.cur_password, user.user_pass);
        if (!check) throw new Error("INVALID_CREDENTIALS");

        new_pass = await hashPassword({ user_pass: data.new_password });
        // console.log(new_pass);

        await Users.findOneAndUpdate({ _id: data.id }, { user_pass: new_pass });

}

module.exports = { login, register, resetPassLinkMailer, resetPass, changePass };