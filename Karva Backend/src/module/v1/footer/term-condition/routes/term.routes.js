const { termGet, termAdd } = require('../controllers/term.controllers');
const { verifyToken } = require('../../../../../middlewares/token');
const roleValidator = require('../../../../../middlewares/role-validator');

const termRoutes = async (app) => {

    app.get('/term', termGet);

    app.put('/term', verifyToken, roleValidator(['admin']), termAdd);

}

module.exports = termRoutes;