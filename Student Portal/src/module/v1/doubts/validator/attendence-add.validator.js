const joi = require('joi');

const attendenceAddSchema = joi.object({
    atten_date: joi.string().required(),
    stud_ids: joi.array().items(joi.object({
        id: joi.string().required()
            .messages({
                'string.base': 'id must be a string'
            }),
        isPresent: joi.boolean().required()
            .messages({
                'boolean.base': 'isPresent must be a boolean'
            })
    }).messages({
        'object.base': 'stud_ids must contain object inside the array',
    })
    ).messages({
        'array.base': 'stud_ids must be a array of object',
    })
});

module.exports = attendenceAddSchema;