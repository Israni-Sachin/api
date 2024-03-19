const doubtsServices = require('../services/doubts.services');
const { errorResponse, successResponse } = require('../../../../helpers/http-response');

const doubtsGet = async (req, res) => {
    try {
        const doubts = await doubtsServices.doubtsGet(req.user);
        successResponse({ res, message: 'Success', data: doubts });
    } catch (err) {
        errorResponse(res, err);
    }
}

const doubtsGett = async (req, res) => {
    try {
        const doubts = await doubtsServices.doubtsGett(req.user);
        successResponse({ res, message: 'Success', data: doubts });
    } catch (err) {
        errorResponse(res, err);
    }
}

const doubtsAdd = async (req, res) => {
    try {
        await doubtsServices.doubtsAdd(req.body, req.user);
        successResponse({ res, message: 'Success' });
    } catch (err) {
        errorResponse(res, err);
    }
}

const doubtsAddt = async (req, res) => {
    try {
        await doubtsServices.doubtsAddt(req.body, req.user);
        successResponse({ res, message: 'Success' });
    } catch (err) {
        errorResponse(res, err);
    }
}

const doubtsUpdate = async (req, res) => {
    try {
        await doubtsServices.doubtsUpdate(req.body, req.user);
        successResponse({ res, message: 'Success' });
    } catch (err) {
        errorResponse(res, err);
    }
}

const doubtsUpdatet = async (req, res) => {
    try {
        await doubtsServices.doubtsUpdatet(req.body, req.user);
        successResponse({ res, message: 'Success' });
    } catch (err) {
        errorResponse(res, err);
    }
}

module.exports = { doubtsGet, doubtsGett, doubtsAdd, doubtsAddt, doubtsUpdate, doubtsUpdatet };