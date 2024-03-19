const joi = require('joi');

const examAddSchema = joi.object({






    exam_subject: joi.string().required()
        .messages({
            'string.empty': `exam subject cannot be an empty field`,
            'any.required': 'exam subject is required'
        }),
    exam_time: joi.string().required()
        .messages({
            'string.empty': `exam time cannot be an empty field`,
            'any.required': 'exam time is required'
        }),
    exam_duration: joi.string().required()
        .messages({
            'string.empty': `exam duration cannot be an empty field`,
            'any.required': 'exam duration is required'
        }),
    exam_class: joi.string().required()
        .messages({
            'string.empty': `exam class cannot be an empty field`,
            'any.required': 'exam class is required'
        }),
    exam_date: joi.string().required()
        .messages({
            'any.required': 'exam date is required'
        }),
    exam_id: joi.string().optional()
        .messages({
            'any.required': 'exam date is required'
        }),
    exam_total_marks: joi.number().min(1).required()
        .messages({
            'number.base': 'marks must be a number',
            'number.min': 'marks must be greater than 0',
            'any.required': 'marks is required'
        }),
    exam_passing_marks: joi.number().min(1).required()
        .messages({
            'number.base': 'marks must be a number',
            'number.min': 'marks must be greater than 0',
            'any.required': 'marks is required'
        }),
});

module.exports = examAddSchema;