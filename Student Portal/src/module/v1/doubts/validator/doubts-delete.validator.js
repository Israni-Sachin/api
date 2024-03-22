const joi = require('joi');

const doubtsDelSchema = joi.object({
    _id: joi.string().required().messages({
        'string.base': '_id must be a string'
    })
});

module.exports = doubtsDelSchema;