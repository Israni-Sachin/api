const brandServices = require('../services/brand.services');
const { successResponse, errorResponse } = require('../../../../helpers/http-response');

const brandGet = async (req, res) => {
    try {
        let result = await brandServices.brandGet();
        successResponse({ res, message: 'brand fetched successfully', data: result });

    } catch (err) {
        errorResponse(res, err);
    }
}

const brandGetBySlug = async (req, res) => {
    try {
        let result = await brandServices.brandGetBySlug(req.params);
        successResponse({ res, message: 'brand fetched successfully', data: result });

    } catch (err) {
        errorResponse(res, err);
    }
}

const brandAdd = async (req, res) => {
    try {
        await brandServices.brandAdd(req.body);
        successResponse({ res, message: "brand added successfully" });

    } catch (err) {
        errorResponse(res, err);
    }
}

const brandUpdate = async (req, res) => {
    try {
        let body = req.body;
        await brandServices.brandUpdate(body, req.params);
        successResponse({ res, message: "brand updated successfully" });

    } catch (err) {
        errorResponse(res, err);
    }
}

const brandDelete = async (req, res) => {
    try {
        let body = req.params;
        await brandServices.brandDelete(body);
        successResponse({ res, message: "brand deleted successfully" });

    } catch (err) {
        errorResponse(res, err);
    }
}

module.exports = { brandGet, brandAdd, brandGetBySlug, brandUpdate, brandDelete };