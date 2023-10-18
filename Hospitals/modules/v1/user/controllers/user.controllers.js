const userServices = require('../services/user.services')
const user = require('../../../../db/user.json')
const { successResponse, errorResponse } = require('../../../../helper/http_response')

const userGet = async (req,res) => {
    try {
        let result = await userServices.userGet();
        successResponse(res, 'User fetched successfully', result);
    } catch (error) {
        console.log(error);
        errorResponse(res, 'Error while fetching user', error.status);
    }
}
const userGetById = async (req, res) => {
    try {
        let userId = Number(req.params.id)
        let includes = user.some(v => v.id === userId)
        if (includes) {
            let result = await userServices.userGetById(userId);
            successResponse(res, 'User fetched successfully', result);
        }
        else res.send({ status: 404, message: 'User Not Found' });
    } catch (error) {
        console.log(error);
        errorResponse(res, 'Error while fetching user', error.status);
    }
}

const userAdd = async (req, res) => {
    try {
        let body = req.body;
        if (body.length == 0) {
            res.send({ status: 202, message: 'Body should not be empty' });
        }
        else {
            let result = await userServices.userAdd(body);
            successResponse(res, 'User added successfully');
        }
    } catch (error) {
        console.log(error);
        errorResponse(res, 'Error while adding user', error.status);
    }
}
const userUpdate = async (req, res) => {
    try {
        let userId = Number(req.params.id)
        let body = req.body;
        let includes = user.some(v => v.id === userId);
        if (includes) {
            let result = await userServices.userUpdate(userId, body);
            successResponse(res, 'User updated successfully');
        }
        else res.send({ status: 404, message: 'User Not Found' });
    } catch (error) {
        console.log(error);
        errorResponse(res, 'Error while updating user', error.status);
    }
}
const userDelete = async (req, res) => {
    try {
        let userId = Number(req.params.id);
        let includes = user.some(v => v.id === userId);
        if (includes) {
            let result = await userServices.userDelete(userId);
            successResponse(res, 'User deleted successfully');
        }
        else res.send({ status: 404, message: 'User Not Found' });

    } catch (error) {
        console.log(error);
        errorResponse(res, 'Error while deleting user', error.status);
    }
}

module.exports = { userGetById, userUpdate, userDelete, userAdd, userGet }