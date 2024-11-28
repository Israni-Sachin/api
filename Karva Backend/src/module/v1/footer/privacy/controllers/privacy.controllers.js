const privacyServices = require('../services/privacy.services');
const { successResponse, errorResponse } = require('../../../../../helpers/http-response');

const privacyGet = async (req, res) => {
    try {
        let result = await privacyServices.privacyGet();
        successResponse({ res, message: 'Privacy Policy fetched successfully', data: result });
    } catch (err) {
        errorResponse(res, err);
    }
}

const privacyAdd = async (req, res) => {
    try {
        await privacyServices.privacyAdd(req.body);
        successResponse({ res, message: "Privacy Policy updated successfully" });
    } catch (err) {
        errorResponse(res, err);
    }
}

module.exports = { privacyGet, privacyAdd };