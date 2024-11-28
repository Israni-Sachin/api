const { followGet, followAdd } = require('../controllers/follow.controllers');
const { verifyToken } = require('../../../../../middlewares/token');
const roleValidator = require('../../../../../middlewares/role-validator');

const followRoutes = async (app) => {

    app.get('/follow', followGet);

    app.put('/follow', verifyToken, roleValidator(['admin']), followAdd);

}

module.exports = followRoutes;