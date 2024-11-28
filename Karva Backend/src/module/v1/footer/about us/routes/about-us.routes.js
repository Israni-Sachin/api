const { aboutUsGet, aboutUsAdd } = require('../controllers/about-us.controllers');
const { verifyToken } = require('../../../../../middlewares/token');
const roleValidator = require('../../../../../middlewares/role-validator');

const aboutUsRoutes = async (app) => {

    app.get('/aboutUs', aboutUsGet);

    app.put('/aboutUs', verifyToken, roleValidator(['admin']), aboutUsAdd);

}

module.exports = aboutUsRoutes;