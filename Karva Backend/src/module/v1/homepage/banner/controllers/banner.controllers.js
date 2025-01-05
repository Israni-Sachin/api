const bannerServices = require('../services/banner.services');
const { successResponse, errorResponse } = require('../../../../../helpers/http-response');

const bannerGet = async (req, res) => {
    try {
        let result = await bannerServices.bannerGet();
        successResponse({ res, message: 'Banner fetched successfully', data: result });
    } catch (err) {
        errorResponse(res, err);
    }
}

const bannerGetById = async (req, res) => {
    try {
        let result = await bannerServices.bannerGetById(req.params);
        successResponse({ res, message: 'Banner fetched successfully', data: result });
    } catch (err) {
        errorResponse(res, err);
    }
}

const bannerAdd = async (req, res) => {
    try {
        await bannerServices.bannerAdd(req.body);
        successResponse({ res, message: "Banner added successfully" });
    } catch (err) {
        errorResponse(res, err);
    }
}

const bannerUpdate = async (req, res) => {
    try {
        await bannerServices.bannerUpdate(req.body, req.params);
        successResponse({ res, message: "Banner updated successfully" });
    } catch (err) {
        errorResponse(res, err);
    }
}

const bannerPlace = async (req, res) => {
    try {
        await bannerServices.bannerPlace(req.body);
        successResponse({ res, message: "Banners place updated successfully" });
    } catch (err) {
        errorResponse(res, err);
    }
}

const bannerDelete = async (req, res) => {
    try {
        await bannerServices.bannerDelete(req.params);
        successResponse({ res, message: "Banner deleted successfully" });
    } catch (err) {
        errorResponse(res, err);
    }
}

module.exports = { bannerGet, bannerGetById, bannerAdd, bannerUpdate, bannerDelete, bannerPlace };