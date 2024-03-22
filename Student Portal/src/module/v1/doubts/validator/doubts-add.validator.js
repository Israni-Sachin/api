const joi = require('joi');

const doubtsAddSchema = joi.object({
    _id: joi.string().optional(),
    dt_topic: joi.string().required()
        .messages({
            'string.base': 'id must be a string'
        }),
    dt_desc: joi.string().required()
        .messages({
            'string.base': 'id must be a string'
        }),
});

module.exports = doubtsAddSchema;