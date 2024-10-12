const joi = require('joi');

const orderHistorySchema = joi.object({
     start_date: joi.string().required()
                  .messages({
                    'string.base': 'start_date must be a string',
                    'any.required': 'start_date is a required field'
                  }),
     end_date: joi.string().required()
                    .messages({
                        'string.base': 'end_date must be a string',
                        'any.required': 'end_date is a required field'
                    })
});

module.exports = orderHistorySchema;