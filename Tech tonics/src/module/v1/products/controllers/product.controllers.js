const productServices = require('../services/product.services');
const { successResponse, errorResponse } = require('../../../../helpers/http-response');

const productGet = async (req, res) => {
    try {
        let result = await productServices.productGet();

        successResponse({ res, message: 'Product Fetch successfully', data: result });

    } catch (err) {
        errorResponse(res, err);
    }
}

const productGetById = async (req, res) => {
    try {
        let result = await productServices.productGetById(req.params);

        successResponse({ res, message: "Product Fetch successfully", data: result });

    } catch (err) {
        errorResponse(res, err);
    }
}

const productAdd = async (req, res) => {
    try {
        let result = await productServices.productAdd(req.body);

        successResponse({ res, message: 'Product Added successfully', data: result });

    } catch (err) {
        errorResponse(res, err);
    }
}

const productUpdate = async (req, res) => {
    try {
        let result = await productServices.productUpdate({ ...req.body, ...req.params });

        successResponse({ res, message: 'Product Updated successfully', data: result });

    } catch (err) {
        errorResponse(res, err);
    }
}

const productDelete = async (req, res) => {
    try {
        let result = await productServices.productDelete(req.params);

        successResponse({ res, message: 'Products Deleted successfully', data: result });

    } catch (err) {
        errorResponse(res, err);
    }
}

const productDeleteMany = async (req, res) => {
    try {
        let result = await productServices.productDeleteMany(req.body);

        successResponse({ res, message: 'Product Deleted successfully', data: result });

    } catch (err) {
        errorResponse(res, err);
    }
}

module.exports = { productGet, productGetById, productDelete, productUpdate, productAdd, productDeleteMany };
