const joi = require('joi');

const registerSchema = joi.object({
    user_fname: joi.string().required(),
    user_lname: joi.string().required(),
    user_email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'in'] } }).required()
        .messages({
            'string.email': `Email must be a valid email`,
            'string.empty': `Email cannot be an empty field`,
        }),
    user_pass: joi.string().pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&*+=!])(?!.*\s).{8,25}$/).required()
        .messages({
            'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character and must be 8-25 characters long',
            'string.empty': `Password cannot be an empty field`
        }),
    user_phone: joi.string().pattern(/^[0-9]{10}$/).required()
                .messages({
                    'string.pattern.base': `Phone number can only contain numbers and must be 10 digits`,
                    'string.empty': `Phone number cannot be an empty field`
                }),
});

module.exports = registerSchema;