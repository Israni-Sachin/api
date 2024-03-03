const services = require('../services/order-history.services');
const {successResponse, errorResponse} = require('../../../../helpers/http-response');

const orderHistoryGet = async (req, res) => {
    try {
        const orderhistory = await services.orderHistoryGet(req.body,req.user);
        successResponse({res, data: orderhistory, message: 'Success'});
    } catch (err) {
       errorResponse(res,err);
    }
}

module.exports = { orderHistoryGet };