const regis = require('../services/register.services');
const { successResponse, errorResponse } = require('../../../../helpers/http_response')


const register = async (req, res) => {
    try {
        let data = req.body;
        if (Object.entries(data).length == 0) res.status(204).json("Body is empty");
        let result = await regis(data);
        successResponse(res, "Registration Successfully completed");
    } catch (error) {
        console.log(error);
        errorResponse(res, { sysmsg: error.message, msg: "Error while registering" }, error.status);
    }
}

module.exports = register;