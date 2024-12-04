const { loginImgGet, loginImgAdd } = require('../controllers/login_img.controllers');
const { verifyToken } = require('../../../../../middlewares/token');
const roleValidator = require('../../../../../middlewares/role-validator');

const loginImgRoutes = async (app) => {

    app.get('/loginImg', loginImgGet);

    app.put('/loginImg', verifyToken, roleValidator(['admin']), loginImgAdd);

}

module.exports = loginImgRoutes;