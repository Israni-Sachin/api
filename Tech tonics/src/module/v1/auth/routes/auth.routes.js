const { register, login, resetPassLinkMailer, resetPass } = require('../controllers/auth.controllers');
const validator = require('../../../../middlewares/validator');
const { loginSchema, registerSchema } = require('../validator');
const { verifyToken } = require('../../../../middlewares/token');

const registerRoutes = async (app) => {

    app.post('/register',  register);

    app.post('/login', validator(loginSchema), login);
}

module.exports = registerRoutes;
