const Users = require("../../../../models/user.model");
const { createToken } = require("../../../../middlewares/token");
const { hashPassword, comparePassword } = require("../../../../common/hash-password");
require('dotenv').config();

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
        let encodedData = createToken({ id: user._id, role: user.user_email });

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

module.exports = { register, login};
