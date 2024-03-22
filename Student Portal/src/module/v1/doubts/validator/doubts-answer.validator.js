const joi = require('joi');

const doubtsAnswerSchema = joi.object({
    dt_isAnswerd: joi.boolean().required()
        .messages({
            'boolean.base': 'dt_isAnswerd must be a boolean value'
        }),
    dt_answer: joi.string().required()
        .messages({
            'string.base': 'id must be a string'
        }),
});

module.exports = doubtsAnswerSchema;