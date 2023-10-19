const regis = require('../services/register.services');
const { successResponse, errorResponse } = require('../../../../helpers/http_response')
const path = require('path');
let users = require(path.resolve('./db/user.json'))


const register = async (req, res) => {
    try {

        let data = req.body;
        if (Object.entries(data).length == 0) res.status(204).json("Body is empty");

        let checkEmail = await users.some(e => e.user_email == data.user_email);
        let checkPhone = await users.some(e => e.user_phone == data.user_phone)
        if (checkPhone) errorResponse(res, "Phone number already exists.", 400);
        else if (checkEmail) errorResponse(res, "Email address already exists.", 400);
        else {
            let result = await regis(data);
            successResponse(res, "Registration Successfully completed");
        }

    } catch (error) {
        console.log(error);
        errorResponse(res, { sysmsg: error.message, msg: "Error while registering" }, error.status);
    }
}

module.exports = register;