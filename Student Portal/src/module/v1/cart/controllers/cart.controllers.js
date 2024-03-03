const cartServices = require('../services/cart.services');
const { errorResponse, successResponse } = require('../../../../helpers/http-response');

const cartGet = async (req, res) => {
    try {
        const cart = await cartServices.cartGet(req.user);
        successResponse({ res, message: 'Success', data: cart });
    } catch (err) {
        errorResponse(res, err);
    }
}

const cartAdd = async (req, res) => {
    try {
        await cartServices.cartAdd(req.body, req.user);
        successResponse({ res, message: 'Success'});
    } catch (err) {
        errorResponse(res, err);
    }
}

const cartDelete = async (req, res) => {
    try {
        const cart = await cartServices.cartDelete(req.user, req.body);
        successResponse({ res, message: 'Success', data: cart });
    } catch (err) {
        errorResponse(res, err);
    }
}


module.exports = { cartGet, cartAdd, cartDelete };