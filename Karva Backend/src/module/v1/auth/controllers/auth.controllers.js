const authServices = require('../services/auth.services');
const { successResponse, errorResponse } = require('../../../../helpers/http-response');

const register = async (req, res) => {
    try {
        let result = await authServices.register(req.body);

        successResponse({
            res, message: 'Registered successfully',
            data: result.userData, token: result.encodedData
        });

    } catch (err) {
        errorResponse(res, err);
    }
}

const login = async (req, res) => {
    try {
        let result = await authServices.login(req.body);

        successResponse({
            res, data: result.userData,
            message: "Logged in successfully", token: result.encodedData
        });

    } catch (err) {
        errorResponse(res, err);
    }
}


const resetPassLinkMailer = async (req, res) => {
    try {

        if (!req.body) return errorResponse({ res, message: "Request body is required", status: 400 });

        let result = await authServices.resetPassLinkMailer(req.body);

        successResponse({ res, message: "Success", data: result });

    } catch (error) {
        console.log(error);
        // errorResponse({ res, message: 'Internal server error', status: 500 });
        errorResponse(res, error);

    }
}

const resetPass = async (req, res) => {
    try {
        if (!req.body) return errorResponse({ res, message: "Request body is required", status: 400 });
        const result = await authServices.resetPass({ ...req.body, token: req.params.token });
        if (result == "LinkExpired") return errorResponse({ res, message: "Link expired", status: 400 });
        successResponse({ res, message: "Success" });
    } catch (error) {
        console.log(error);
        errorResponse(res, error);
    }
}

const changePass = async (req, res) => {
    try {
        if (!req.body) return errorResponse({ res, message: "Request body is required", status: 400 });

        const result = await authServices.changePass({ ...req.body, ...req.user });

        successResponse({ res, message: "Success" });

    } catch (err) {

        errorResponse(res, err);
    }
}

module.exports = { register, login, resetPassLinkMailer, resetPass, changePass };