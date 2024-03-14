const attendenceServices = require('../services/attendence.services');
const { errorResponse, successResponse } = require('../../../../helpers/http-response');

const attendenceGet = async (req, res) => {
    try {
        const attendence = await attendenceServices.attendenceGet(req.user);
        successResponse({ res, message: 'Success', data: attendence });
    } catch (err) {
        errorResponse(res, err);
    }
}

const attendenceAdd = async (req, res) => {
    try {
        await attendenceServices.attendenceAdd(req.body, req.user);
        successResponse({ res, message: 'Success' });
    } catch (err) {
        errorResponse(res, err);
    }
}

const attendenceUpdate = async (req, res) => {
    try {
        await attendenceServices.attendenceUpdate(req.body, req.user);
        successResponse({ res, message: 'Success' });
    } catch (err) {
        errorResponse(res, err);
    }
}

const attendenceDelete = async (req, res) => {
    try {
        const attendence = await attendenceServices.attendenceDelete(req.user, req.body);
        successResponse({ res, message: 'Success', data: attendence });
    } catch (err) {
        errorResponse(res, err);
    }
}


module.exports = { attendenceGet, attendenceAdd, attendenceUpdate, attendenceDelete };