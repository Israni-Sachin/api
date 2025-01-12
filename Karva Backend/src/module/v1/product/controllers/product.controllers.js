const productsServices = require('../services/product.services');
const { successResponse, errorResponse } = require('../../../../helpers/http-response');

const productGet = async (req, res) => {
    try {
        let result = await productsServices.productGet(req.body, req.user);
        successResponse({ res, message: 'Products fetched successfully', data: result });

    } catch (err) {
        errorResponse(res, err);
    }
}

const productGetById = async (req, res) => {
    try {
        let result = await productsServices.productGetById(req.params.id);
        successResponse({ res, message: 'Product fetched successfully', data: result });

    } catch (err) {
        errorResponse(res, err);
    }
}

const ratingGet = async (req, res) => {
    try {
        let result = await productsServices.ratingGet();
        successResponse({ res, message: 'Ratings fetched successfully', data: result });

    } catch (err) {
        errorResponse(res, err);
    }
}

const ratingGetByVisible = async (req, res) => {
    try {
        let result = await productsServices.ratingGetByVisible();
        successResponse({ res, message: 'Ratings fetched successfully', data: result });

    } catch (err) {
        errorResponse(res, err);
    }
}

const ratingUpdateByVisible = async (req, res) => {
    try {
        let result = await productsServices.ratingUpdateByVisible(req.body);
        successResponse({ res, message: 'Ratings visibility updated successfully', data: result });

    } catch (err) {
        errorResponse(res, err);
    }
}

const ratingUpdate = async (req, res) => {
    try {
        let result = await productsServices.ratingUpdate(req.params.id, req.body);
        successResponse({ res, message: 'Rating updated successfully', data: result });

    } catch (err) {
        errorResponse(res, err);
    }
}

const ratingDelete = async (req, res) => {
    try {
        let result = await productsServices.ratingDelete(req.params.id, req.body);
        successResponse({ res, message: 'Rating deleted successfully', data: result });

    } catch (err) {
        errorResponse(res, err);
    }
}

const ratingGetById = async (req, res) => {
    try {
        let result = await productsServices.ratingGetById(req.params.id);
        successResponse({ res, message: 'Rating fetched successfully', data: result });

    } catch (err) {
        errorResponse(res, err);
    }
}

const ratingAdd = async (req, res) => {
    try {
        let result = await productsServices.ratingAdd(req.body, req.user);
        successResponse({ res, message: 'Rating added successfully', data: result });

    } catch (err) {
        console.log("this is rating error", err)
        errorResponse(res, err);
    }
}

const productGetBySearch = async (req, res) => {
    try {
        let result = await productsServices.productGetBySearch(req.body);
        successResponse({ res, message: 'Product fetched successfully', data: result });

    } catch (err) {
        errorResponse(res, err);
    }
}

const productSuggest = async (req, res) => {
    try {
        let result = await productsServices.productSuggest(req.body);
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
        await productsServices.productUpdate(body, req.params);
        successResponse({ res, message: "Product updated successfully" });

    } catch (err) {
        errorResponse(res, err);
    }
}

const productDelete = async (req, res) => {
    try {
        let body = req.params;
        await productsServices.productDelete(body);
        successResponse({ res, message: "Product deleted successfully" });

    } catch (err) {
        errorResponse(res, err);
    }
}

const productBulkDelete = async (req, res) => {
    try {
        let result = await productsServices.productBulkDelete(req.body);
        successResponse({ res, message: "Products deleted successfully", data: result });

    } catch (err) {
        errorResponse(res, err);
    }
}

module.exports = {
    productGet, productGetById, productAdd, productUpdate, productDelete, productGetBySearch, productSuggest, productBulkDelete,
    ratingGet, ratingAdd, ratingGetById, ratingUpdate, ratingDelete, ratingGetByVisible, ratingUpdateByVisible
};