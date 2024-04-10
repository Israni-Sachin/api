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

const changePass = async (req, res) => {
    try {

        // if (!req.body) return errorResponse({ res, message: "Request body is required", status: 400 });
        if (!req.body) throw new Error("BODY_IS_EMPTY")

        const result = await authServices.changePass({ ...req.body, ...req.user });

        successResponse({ res, message: "Success" });

    } catch (error) {

        console.log(error);

        errorResponse(res, error);

    }
}

module.exports = { register, login, changePass };
