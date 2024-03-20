const joi = require('joi');

const cartDelSchema = joi.object({
    cart_items: joi.array().items(joi.string().required().messages({
        'string.base': 'cart_items must be a string'
    }))
        .messages({
            'array.base': 'cart_items must be a array of string',
            'array.includesRequiredUnknowns': 'cart_items must be a array of string'
        })
});

module.exports = cartDelSchema;