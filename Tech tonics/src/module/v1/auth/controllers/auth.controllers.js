const authServices = require('../services/auth.services');
const { successResponse, errorResponse } = require('../../../../helpers/http-response');

const register = async (req, res) => {
    try {
        let result = await authServices.register(req.body);

        successResponse({ res, message: 'Registered successfully', data: result.userData, token: result.encodedData });

    } catch (err) {
        errorResponse(res, err);
    }
}

const login = async (req, res) => {
    try {
        let result = await authServices.login(req.body);

        successResponse({ res, data: result.userData, message: "Logged in successfully", token: result.encodedData });

    } catch (err) {
        errorResponse(res, err);
    }
}

module.exports = { register, login};
