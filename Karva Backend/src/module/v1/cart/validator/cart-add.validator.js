const joi = require('joi');

const cartAddSchema = joi.object({
    cart_items: joi.array().items(joi.object({
        cartitm_fk_prd_id: joi.string().required()
            .messages({
                'string.base': 'cartitm_fk_prd_id must be a string'
            }),
        cartitm_prd_qty: joi.number().required()
            .messages({
                'number.base': 'cartitm_prd_qty must be a number'
            })
    }).messages({
        'object.base': 'cart_items must be a object',
    })
    ).messages({
        'array.base': 'cart_items must be a array of object',
    })
});

module.exports = cartAddSchema;