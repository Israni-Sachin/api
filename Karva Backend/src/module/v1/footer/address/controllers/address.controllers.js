const addressServices = require('../services/address.services');
const { successResponse, errorResponse } = require('../../../../../helpers/http-response');

const addressGet = async (req, res) => {
    try {
        let result = await addressServices.addressGet();
        successResponse({ res, message: 'Address fetched successfully', data: result });
    } catch (err) {
        errorResponse(res, err);
    }
}

const addressAdd = async (req, res) => {
    try {
        await addressServices.addressAdd(req.body);
        successResponse({ res, message: "Address updated successfully" });
    } catch (err) {
        errorResponse(res, err);
    }
}

module.exports = { addressGet, addressAdd };