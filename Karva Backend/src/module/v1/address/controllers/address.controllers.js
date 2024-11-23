const addressServices = require('../services/address.services');
const { successResponse, errorResponse } = require('../../../../helpers/http-response');

const addressGet = async (req, res) => {

    try {

        let data = await addressServices.addressGet(req.user);
        successResponse({ res, message: "All User fetched successfully", data });

    } catch (err) {
        errorResponse(res, err);
    }

}

// const addressGiveAdminAccess = async (req, res) => {

//     try {

//         let data = await addressServices.addressGiveAdminAccess(req.body);
//         successResponse({ res, message: "User Role Updated successfully", data });

//     } catch (err) {
//         errorResponse(res, err);
//     }

// }

// const addressGet = async (req, res) => {

//     try {

//         let data = await addressServices.addressGet(req.address);
//         successResponse({ res, message: "User fetched successfully", data });

//     } catch (err) {
//         errorResponse(res, err);
//     }

// }

const addressUpdate = async (req, res) => {
    try {

        await addressServices.addressUpdate(req.body, req.user);
        successResponse({ res, message: "Address updated successfully" });

    } catch (err) {
        errorResponse(res, err);
    }
}

const addressDelete = async (req, res) => {
    try {

        await addressServices.addressDelete(req.body, req.user);
        successResponse({ res, message: "Address updated successfully" });

    } catch (err) {
        errorResponse(res, err);
    }
}

const addressAdd = async (req, res) => {
    try {

        let r = await addressServices.addressAdd(req.body, req.user);
        successResponse({ res, message: "Address added successfully", data: r });

    } catch (err) {
        errorResponse(res, err);
    }
}

module.exports = { addressUpdate, addressGet, addressAdd, addressDelete }