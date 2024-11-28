const followServices = require('../services/follow.services');
const { successResponse, errorResponse } = require('../../../../../helpers/http-response');

const followGet = async (req, res) => {
    try {
        let result = await followServices.followGet();
        successResponse({ res, message: 'Follow Us fetched successfully', data: result });
    } catch (err) {
        errorResponse(res, err);
    }
}

const followAdd = async (req, res) => {
    try {
        await followServices.followAdd(req.body);
        successResponse({ res, message: "Follow Us updated successfully" });
    } catch (err) {
        errorResponse(res, err);
    }
}

module.exports = { followGet, followAdd };