const termServices = require('../services/term.services');
const { successResponse, errorResponse } = require('../../../../../helpers/http-response');

const termGet = async (req, res) => {
    try {
        let result = await termServices.termGet();
        successResponse({ res, message: 'Term & Conditions fetched successfully', data: result });
    } catch (err) {
        errorResponse(res, err);
    }
}

const termAdd = async (req, res) => {
    try {
        await termServices.termAdd(req.body);
        successResponse({ res, message: "Term & Conditions updated successfully" });
    } catch (err) {
        errorResponse(res, err);
    }
}

module.exports = { termGet, termAdd };