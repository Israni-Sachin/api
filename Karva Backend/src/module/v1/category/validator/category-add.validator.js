const joi = require('joi');

const productAddSchema = joi.object({
    cate_name: joi.string().required()
        .messages({
            'string.empty': `Category name  cannot be an empty field`,
            'any.required': 'Category name is required'
        }),
    cate_img: joi.string().allow(null, '').optional()
        .messages({
            'string.base': 'img must be a string'
        }),
    cate_is_visible: joi.boolean().required()
        .messages({
            'boolean.base': `cate_is_visible must be a boolean`,
            'any.required': 'cate_is_visible is required'
        })
});

module.exports = productAddSchema;