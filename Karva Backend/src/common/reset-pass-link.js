require('dotenv').config();
const jwt = require('jsonwebtoken');

const gererateLink = async (data) => {

    const token = jwt.sign(data, process.env.SECRET_KEY);
    links = {
        fe_link: `${process.env.RESET_PASS_URL}/${token}`,
        local_link:`${process.env.RESET_PASS_URL_LOCAL}/${token}`
    }
    return links;
}

const decryptLink = async (token) => {

    const decodedData = jwt.verify(token, process.env.SECRET_KEY);

    return decodedData;
}

module.exports = { gererateLink, decryptLink };

