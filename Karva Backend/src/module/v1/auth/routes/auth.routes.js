const { register, login, resetPassLinkMailer, resetPass, changePass, TotalUser } = require('../controllers/auth.controllers');
const validator = require('../../../../middlewares/validator');
const { loginSchema, registerSchema } = require('../validator');
const { verifyToken } = require('../../../../middlewares/token');
const roleValidator = require('../../../../middlewares/role-validator');

const registerRoutes = async (app) => {

    app.post('/register', validator(registerSchema), register);

    app.post('/login', validator(loginSchema), login);

    app.post('/reset-pass', resetPassLinkMailer);

    app.post('/reset-pass/:token', resetPass)

    app.post('/change-pass', verifyToken, changePass)

    app.post("/new-customer",verifyToken,roleValidator(['admin']),TotalUser)
}
module.exports = registerRoutes;