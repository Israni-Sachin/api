const aboutUsServices = require('../services/about-us.services');
const { successResponse, errorResponse } = require('../../../../../helpers/http-response');

const aboutUsGet = async (req, res) => {
    try {
        let result = await aboutUsServices.aboutUsGet();
        successResponse({ res, message: 'About Us fetched successfully', data: result });
    } catch (err) {
        errorResponse(res, err);
    }
}

const aboutUsAdd = async (req, res) => {
    try {
        await aboutUsServices.aboutUsAdd(req.body);
        successResponse({ res, message: "About Us updated successfully" });
    } catch (err) {
        errorResponse(res, err);
    }
}

module.exports = { aboutUsGet, aboutUsAdd };