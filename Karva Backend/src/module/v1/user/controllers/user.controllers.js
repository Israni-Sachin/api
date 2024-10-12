const userServices = require('../services/user.services');
const { successResponse, errorResponse } = require('../../../../helpers/http-response');

const userGet = async (req, res) => {

    try {

        let data = await userServices.userGet(req.user);
        successResponse({ res, message: "User fetched successfully", data });

    } catch (err) {
        errorResponse(res, err);
    }

}

const userUpdate = async (req, res) => {
    try {

        await userServices.userUpdate(req.body, req.user);
        successResponse({ res, message: "User updated successfully" });

    } catch (err) {
        errorResponse(res, err);
    }
}

module.exports = { userUpdate, userGet }