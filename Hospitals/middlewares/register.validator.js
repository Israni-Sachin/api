const Joi = require('joi');
const { successResponse, errorResponse } = require('../helpers/http_response');

const validation = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body, { abortEarly: false });

        if (error) {
            console.log(error);
            errorResponse(res, { sysmsg: error, msg: "Error while registering" }, error.status);
        }
        else {
            next();
        }
    }
}
module.exports = validation