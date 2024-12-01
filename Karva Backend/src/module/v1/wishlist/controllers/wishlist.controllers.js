const wishServices = require('../services/wishlist.services');
const { errorResponse, successResponse } = require('../../../../helpers/http-response');

const wishGet = async (req, res) => {
    try {
        const wish = await wishServices.wishGet(req.user);
        successResponse({ res, message: 'Wishlist Fetched Succesfully', data: wish });
    } catch (err) {
        errorResponse(res, err);
    }
}

const wishAdd = async (req, res) => {
    try {
        await wishServices.wishAdd(req.body, req.user);
        successResponse({ res, message: 'Product added in wishlist succesfully' });
    } catch (err) {
        errorResponse(res, err);
    }
}

const wishDelete = async (req, res) => {
    try {
        const wish = await wishServices.wishDelete(req.user, req.body);
        successResponse({ res, message: 'Product removed from wishlist succesfully', data: wish });
    } catch (err) {
        errorResponse(res, err);
    }
}


module.exports = { wishGet, wishAdd, wishDelete };