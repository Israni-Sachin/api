const orderService = require('../services/order.services');
const { successResponse, errorResponse } = require('../../../../helpers/http-response');

const orderAll = async (req, res) => {
    try {
        const orders = await orderService.orderAll();
        successResponse({ res, message: 'Success', data: orders });
    }
    catch (err) {
        errorResponse(res, err);
    }
}

const orderAdd = async (req, res) => {
    try {
        await orderService.orderAdd(req.user);
        successResponse({ res, message: 'Success' });
    }
    catch (err) {
        errorResponse(res, err);
    }
}
const orderUpdate = async (req, res) => {
    try {
        let data = await orderService.orderUpdate(req.body);
        successResponse({ res, message: 'Success updated', data });
    }
    catch (err) {
        errorResponse(res, err);
    }
}

module.exports = { orderAll, orderAdd, orderUpdate }