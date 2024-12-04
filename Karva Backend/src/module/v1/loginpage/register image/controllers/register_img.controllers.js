const registerImgServices = require('../services/register_img.services');
const { successResponse, errorResponse } = require('../../../../../helpers/http-response');

const registerImgGet = async (req, res) => {
    try {
        let result = await registerImgServices.registerImgGet();
        successResponse({ res, message: 'Register Image fetched successfully', data: result });
    } catch (err) {
        errorResponse(res, err);
    }
}

const registerImgAdd = async (req, res) => {
    try {
        await registerImgServices.registerImgAdd(req.body);
        successResponse({ res, message: "Register Image updated successfully" });
    } catch (err) {
        errorResponse(res, err);
    }
}

module.exports = { registerImgGet, registerImgAdd };