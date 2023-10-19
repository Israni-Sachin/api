const registerControllers = require('../controllers/register.controllers');
const validator = require('../../../../middlewares/register.validator');
const Joi = require('joi');

const schema = Joi.object().keys({
    user_fname: Joi.string().required(),
    user_lname: Joi.string().required(),
    user_phone: Joi.string().length(10).required(),
    user_email: Joi.string().email().lowercase().required({
        minDomainSegments: 2,
        tlds: { allow: ["com", "in"] }
    }),
    user_gender: Joi.string().optional(),
    user_role: Joi.string().optional(),
    user_password: Joi.string().min(8).required(),
    confirm_password: Joi.string().valid(Joi.ref('user_password')).required()
}).unknown(false);

const registerRoutes = (app) => {

    app.post('/register', validator(schema), registerControllers);

}

module.exports = registerRoutes;