const joi = require('joi');

const userUpdateSchema = joi.object({
    user_fname: joi.string().required()
        .messages({
            'string.base': 'user_fname must be a string',
            'string.empty': `user_fname  cannot be an empty field`,
            'any.required': 'user_fname is required'
        }),
    user_lname: joi.string().required()
        .messages({
            'string.base': 'user_lname must be a string',
            'string.empty': `user_lname  cannot be an empty field`,
            'any.required': 'user_lname is required'
        }),
    user_email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'in'] } }).required()
        .messages({
            'string.email': `user_email must be a valid email`,
            'string.empty': `user_email cannot be an empty field`,
        }),
    user_phone: joi.string().pattern(/^[0-9]{10}$/).required()
        .messages({
            'string.pattern.base': `user_phone number can only contain numbers and must be 10 digits`,
            'string.empty': `user_phone number cannot be an empty field`
        }),
});

module.exports = userUpdateSchema;