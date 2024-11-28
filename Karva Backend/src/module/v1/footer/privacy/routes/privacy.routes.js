const { privacyGet, privacyAdd } = require('../controllers/privacy.controllers');
const { verifyToken } = require('../../../../../middlewares/token');
const roleValidator = require('../../../../../middlewares/role-validator');

const privacyRoutes = async (app) => {

    app.get('/privacy', privacyGet);

    app.put('/privacy', verifyToken, roleValidator(['admin']), privacyAdd);

}

module.exports = privacyRoutes;