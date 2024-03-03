const Users = require("../../../../models/user.model");
const { createToken } = require("../../../../middlewares/token");
const { hashPassword, comparePassword } = require("../../../../common/hash-password");
require('dotenv').config();
// const mailer = require("../../../../common/mailer");
// const {gererateLink, decryptLink} = require("../../../../common/resetpasslink");

const register = async (data) => {
        await hashPassword(data);

        let check = await Users.findOne({ user_email: data.user_email });
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
        let encodedData = createToken({ id: user._id, role: user.user_role });

        return { userData, encodedData };
}


module.exports = { login, register };

/* const resetPassLinkMailer = async (data) => {
        let user = await Users.findOne({ user_email: data.user_email });
        if (!user) return "NotFound";
        let link = await gererateLink({...data, iat: Date.now(), exp: Date.now() + 600000});
        mailer(user.user_email, link);
}

const resetPass = async (data) => {
        const decodedData = await decryptLink(data.token);
        console.log(decodedData);
        if(Date.now() > decodedData.exp) return "LinkExpired";
        await hashPassword(data);
        await Users.findOneAndUpdate({user_email: decodedData.user_email}, {user_pass: data.user_pass});
}
 */
