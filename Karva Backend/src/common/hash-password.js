const bcrypt = require("bcryptjs");

const hashPassword = async (data) => {
    let salt = await bcrypt.genSalt(10);

    user_pass = await bcrypt.hash(data.user_pass, salt);

    return user_pass;
}

const comparePassword = async (data, hash) => {

    return await bcrypt.compare(data, hash);
}

module.exports = { hashPassword, comparePassword };