const promoServices = require('../services/promo.services');
const { successResponse, errorResponse } = require('../../../../helpers/http-response');

const promoGet = async (req, res) => {

    try {

        let data = await promoServices.promoGet();
        successResponse({ res, message: "Promo Codes fetched successfully", data });

    } catch (err) {
        errorResponse(res, err);
    }

}

const promoGetById = async (req, res) => {

    try {

        let data = await promoServices.promoGetById(req.params.id);
        successResponse({ res, message: "Promo Code fetched successfully", data });

    } catch (err) {
        errorResponse(res, err);
    }

}

const promoUpdate = async (req, res) => {
    try {

        await promoServices.promoUpdate(req.body);
        successResponse({ res, message: "Promo Code updated successfully" });

    } catch (err) {
        errorResponse(res, err);
    }
}

const applyPromo = async (req, res) => {
    try {

        await promoServices.applyPromo(req.body);
        successResponse({ res, message: "Promo Code applied successfully" });

    } catch (err) {
        errorResponse(res, err);
    }
}

const promoDelete = async (req, res) => {
    try {

        await promoServices.promoDelete(req.body);
        successResponse({ res, message: "Promo Code updated successfully" });

    } catch (err) {
        errorResponse(res, err);
    }
}

const promoAdd = async (req, res) => {
    try {

        let r = await promoServices.promoAdd(req.body);
        successResponse({ res, message: "Promo Code added successfully", data: r });

    } catch (err) {
        errorResponse(res, err);
    }
}

module.exports = { promoUpdate, promoGet, promoAdd, promoDelete, promoGetById, applyPromo }