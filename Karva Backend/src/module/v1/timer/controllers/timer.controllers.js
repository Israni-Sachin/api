const timerServices = require('../services/timer.services');
const { successResponse, errorResponse } = require('../../../../helpers/http-response');

const timerGet = async (req, res) => {
     try{
        const result = await timerServices.timerGet();
        successResponse({res, message: 'Success', data: result});
     } catch (err){
        errorResponse(res,err);
     }
}

const timerSet = async (req, res) => {
    try{
        const result = await timerServices.timerSet(req.body);
        successResponse({res, message: 'Updated successfully', data: result});
     } catch (err){
        errorResponse(res,err);
     }
}

module.exports = { timerGet, timerSet }