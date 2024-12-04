const loginImgServices = require('../services/login_img.services');
const { successResponse, errorResponse } = require('../../../../../helpers/http-response');

const loginImgGet = async (req, res) => {
    try {
        let result = await loginImgServices.loginImgGet();
        successResponse({ res, message: 'Login Image fetched successfully', data: result });
    } catch (err) {
        errorResponse(res, err);
    }
}

const loginImgAdd = async (req, res) => {
    try {
        await loginImgServices.loginImgAdd(req.body);
        successResponse({ res, message: "Login Image updated successfully" });
    } catch (err) {
        errorResponse(res, err);
    }
}

module.exports = { loginImgGet, loginImgAdd };