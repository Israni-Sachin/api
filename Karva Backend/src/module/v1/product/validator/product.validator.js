const joi = require('joi');

const productGetSchema = joi.object({
    category: joi.string().allow(null, '').optional()
        .messages({
            'string.base': 'search must be a string'
        }),
    prd_name: joi.string().allow(null, '').optional()
        .messages({
            'string.base': 'search must be a string'
        }),
    sub_category: joi.string().allow(null, '').optional()
        .messages({
            'string.base': 'search must be a string'
        })
});

module.exports = productGetSchema;