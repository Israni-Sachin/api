const joi = require('joi');

const loginSchema = joi.object({
    user_email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'in'] } }).required()
                .messages({
                    'string.email': `Email must be a valid email`,
                    'string.empty': `Email cannot be an empty field`,
                }),
    user_pass: joi.string().pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&*+=!])(?!.*\s).{8,25}$/).required()
               .messages({
                'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character and must be 8-25 characters long',
                 'string.empty': `Password cannot be an empty field`
                })
});

module.exports = loginSchema;