const { registerImgGet, registerImgAdd } = require('../controllers/register_img.controllers');
const { verifyToken } = require('../../../../../middlewares/token');
const roleValidator = require('../../../../../middlewares/role-validator');

const registerImgRoutes = async (app) => {

    app.get('/registerImg', registerImgGet);

    app.put('/registerImg', verifyToken, roleValidator(['admin']), registerImgAdd);

}

module.exports = registerImgRoutes;