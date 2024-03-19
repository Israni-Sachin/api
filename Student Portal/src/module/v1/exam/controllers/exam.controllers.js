
const examServices = require('../services/exam.services');

const { successResponse, errorResponse } = require('../../../../helpers/http-response');

const examGet = async (req, res) => {
    try {
        let result = await examServices.examGet(req.user);
        successResponse({ res, message: 'exam fetched successfully', data: result });

    } catch (err) {
        errorResponse(res, err);
    }
}

const examGetAll = async (req, res) => {
    try {
        let result = await examServices.examGetAll(req.user);
        successResponse({ res, message: 'exam fetched successfully', data: result });

    } catch (err) {
        errorResponse(res, err);
    }
}

const examAdd = async (req, res) => {
    try {
        await examServices.examAdd(req.body);
        successResponse({ res, message: "exam added successfully" });

    } catch (err) {
        errorResponse(res, err);
    }
}

const examUpdate = async (req, res) => {
    try {
        let body = req.body;
        await examServices.examUpdate(body);
        successResponse({ res, message: "exam updated successfully" });

    } catch (error) {
        errorResponse(res, err);
    }
}

const examDelete = async (req, res) => {
    try {
        let body = req.body;
        await examServices.examDelete(body);
        successResponse({ res, message: "exam deleted successfully" });

    } catch (error) {
        errorResponse(res, err);
    }
}

module.exports = { examGet, examAdd, examUpdate, examDelete, examGetAll };