const productsServices = require('../services/product.services');
const { successResponse, errorResponse } = require('../../../../helpers/http-response');

const productGet = async (req, res) => {
    try {
        let result = await productsServices.productGet(req.body,req.user);
        successResponse({ res, message: 'Product fetched successfully', data: result });

    } catch (err) {
        errorResponse(res, err);
    }
}

const productAdd = async (req, res) => {
    try {
        await productsServices.productAdd(req.body);
        successResponse({ res, message: "Product added successfully" });

    } catch (err) {
        errorResponse(res, err);
    }
}

const productUpdate = async (req, res) => {
    try {
        let body = req.body;
        await productsServices.productUpdate(body);
        successResponse({ res, message: "Product updated successfully" });

    } catch (error) {
        errorResponse(res, err);
    }
}

const productDelete = async (req, res) => {
    try {
        let body = req.body;
        await productsServices.productDelete(body);
        successResponse({ res, message: "Product deleted successfully" });

    } catch (error) {
        errorResponse(res, err);
    }
}

module.exports = { productGet, productAdd, productUpdate, productDelete };