const Users = require("../../../../models/user.model");
const { createToken } = require("../../../../middlewares/token");
const { hashPassword, comparePassword } = require("../../../../common/hash-password");
require('dotenv').config();
const mailer = require("../../../../common/mailer");
const {gererateLink, decryptLink} = require("../../../../common/reset-pass-link");

const register = async (data) => {
        await hashPassword(data);
        let check;
        try {
                check = await Users.findOne({ user_email: data.user_email });
        }
        catch (e) {
                console.log(e);
        }
        if (check) throw new Error("ALREADY_EXISTS")

        await Users.create(data);

        const user = await Users.findOne({ user_email: data.user_email });

        let userData = { ...user._doc, user_pass: undefined };
        let encodedData = createToken({ id: user._id, role: user.user_role });

        return { userData, encodedData };
}

const login = async (data) => {
        let user = await Users.findOne({ user_email: data.user_email });

        if (!user) throw new Error("INVALID_CREDENTIALS");

        let check = await comparePassword(data.user_pass, user.user_pass);
        if (!check) throw new Error("INVALID_CREDENTIALS");

        let userData = { ...user._doc, user_pass: undefined };
        let encodedData;
        try {
                encodedData = createToken({ id: user._id, role: user.user_role });
        }
        catch (e) {
                console.log(e);
        }

        return { userData, encodedData };
}

const resetPassLinkMailer = async (data) => {

        let user = await Users.findOne({ user_email: data.user_email });
        if (!user) throw new Error("USER_NOT_FOUND")

        let link = await gererateLink({ ...data, iat: Date.now(), exp: Date.now() + 600000 });
        //fe link / reset-pass / token
        mailer(user.user_email, link); // pending front end link will be added and sent
}

const resetPass = async (data) => {
        const decodedData = await decryptLink(data.token);
        console.log(decodedData);
        if (Date.now() > decodedData.exp) return "LinkExpired";
        await hashPassword(data);
        await Users.findOneAndUpdate({ user_email: decodedData.user_email }, { user_pass: data.user_pass });
        passChangeMail(decodedData.user_email) // pending front end link will be added and sent
}

const changePass = async (data) => {
        let user = await Users.findOne({ _id: data.id });
        if (!user) throw new Error("DATA_NOT_FOUND");

        let check = await comparePassword(data.cur_password, user.user_pass);
        if (!check) throw new Error("INVALID_PASSWORD");

        // if (Date.now() > data.exp) return "LinkExpired";

        new_pass = await hashPassword({ user_pass: data.new_password });
        console.log(data);

        console.log("data");
        console.log(new_pass);

        let a = await Users.findOneAndUpdate({ _id: data.id }, { user_pass: new_pass.user_pass });
        console.log(a);

}

module.exports = { register, login, resetPass, resetPassLinkMailer, changePass };
