const joi = require('joi');

const productAddSchema = joi.object({
    prd_name: joi.string().required()
        .messages({
            'string.empty': `Product name  cannot be an empty field`,
            'any.required': 'Product name is required'
        }), 
    prd_price: joi.number().min(1).required()
        .messages({
            'number.base': 'price must be a number',
            'number.min': 'price must be greater than 0',
            'any.required': 'price is required'
        }),
    prd_img: joi.string().allow(null,'').optional()
        .messages({
            'string.base': 'img must be a string'
        })
});

module.exports = productAddSchema;