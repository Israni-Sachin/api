const joi = require('joi');

const productGetSchema = joi.object({
    limit: joi.number().min(1).max(20).required()
        .messages({
            'number.base': 'limit must be a number',
            'number.min': 'limit must be greater than 0',
            'number.max': 'limit must be less than 20',
            'any.required': 'limit is required'
        }),
    page: joi.number().min(1).required()
        .messages({
            'number.base': 'page must be a number',
            'number.min': 'page must be greater than 0',
            'any.required': 'page is required'
        }),
    search: joi.string().allow(null, '').optional()
        .messages({
            'string.base': 'search must be a string'
        })
});

module.exports = productGetSchema;