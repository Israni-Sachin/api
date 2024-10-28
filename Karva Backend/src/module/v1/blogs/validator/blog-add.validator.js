const joi = require('joi');

const blogAddSchema = joi.object({
    title: joi.string().required()
        .messages({
            'string.base': 'title must be a string',
            'string.empty': 'title  cannot be an empty field',
            'any.required': 'title is required'
        }),
    content: joi.string().required()
        .messages({
            'string.base': 'content must be a string',
            'string.empty': 'content  cannot be an empty field',
            'any.required': 'content is required'
        })
});

module.exports = blogAddSchema;