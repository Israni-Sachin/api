const joi = require('joi');

const productUpdateSchema = joi.object({
    prd_id: joi.string().required()
        .messages({
            'string.empty': `prd_id cannot be an empty field`,
            'string.base': `prd_id must be string`,
            'any.required': 'prd_id is required'
        }),
    prd_name: joi.string().required()
        .messages({
            'string.empty': `prd_name cannot be an empty field`,
            'any.required': 'prd_name is required'
        }),
    prd_price: joi.number().min(1).required()
        .messages({
            'number.base': 'prd_price must be a number',
            'number.empty': 'prd_price cannot be an empty field',
            'number.min': 'prd_price must be greater than 0'
        }),
    prd_img: joi.string().allow(null, '').optional()
        .messages({
            'string.base': 'img must be a string'
        }),
    prd_is_visible: joi.boolean().required()
        .messages({

            'boolean.base': `prd_is_visible must be a boolean`,
            'any.required': 'prd_is_visible is required'
        })
});

module.exports = productUpdateSchema;