const { register, login, resetPassLinkMailer, resetPass, changePass } = require('../controllers/auth.controllers');
const validator = require('../../../../middlewares/validator');
const { loginSchema, registerSchema } = require('../validator');
const { verifyToken } = require('../../../../middlewares/token');

const registerRoutes = async (app) => {

    app.post('/register', validator(registerSchema), register);

    app.post('/login', validator(loginSchema), login);

    app.post('/reset-pass', resetPassLinkMailer);

    app.post('/reset-pass/:token', resetPass)

    app.post('/change-pass', verifyToken, changePass)
}
module.exports = registerRoutes;