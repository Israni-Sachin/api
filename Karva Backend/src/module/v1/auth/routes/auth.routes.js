const {register,login, resetPassLinkMailer, resetPass} = require('../controllers/auth.controllers');
const validator = require('../../../../middlewares/validator');
const { loginSchema, registerSchema } = require('../validator');

const registerRoutes = async (app) => {

    app.post('/register', validator(registerSchema), register);

    app.post('/login', validator(loginSchema), login);

    /* app.post('/reset-pass', resetPassLinkMailer);
    
    app.post('/reset-pass/:token', resetPass) */
}
module.exports = registerRoutes;