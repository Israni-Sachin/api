const contactServices = require('../services/contact.services');
const { successResponse, errorResponse } = require('../../../../../helpers/http-response');

const contactGet = async (req, res) => {
    try {
        let result = await contactServices.contactGet();
        successResponse({ res, message: 'Contact us forms fetched successfully', data: result });
    } catch (err) {
        errorResponse(res, err);
    }
}

const contactAdd = async (req, res) => {
    try {
        await contactServices.contactAdd(req.body);
        successResponse({ res, message: "Contact us form sended successfully" });
    } catch (err) {
        errorResponse(res, err);
    }
}

const contactUpdate = async (req, res) => {
    try {
        await contactServices.contactUpdate(req.body);
        successResponse({ res, message: "Contact us form updated successfully" });
    } catch (err) {
        errorResponse(res, err);
    }
}

module.exports = { contactGet, contactAdd, contactUpdate };