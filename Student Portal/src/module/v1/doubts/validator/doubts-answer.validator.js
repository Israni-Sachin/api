const joi = require('joi');

const doubtsAnswerSchema = joi.object({
    dt_id: joi.string().required(),
    dt_isAnswerd: joi.boolean().required(),
    dt_answer: joi.string().required()
        .messages({
            'string.base': 'id must be a string'
        }),
});

module.exports = doubtsAnswerSchema;