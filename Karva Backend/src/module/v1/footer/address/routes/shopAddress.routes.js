const { addressGet, addressAdd } = require('../controllers/address.controllers');
const { verifyToken } = require('../../../../../middlewares/token');
const roleValidator = require('../../../../../middlewares/role-validator');

const addressRoutes = async (app) => {

    app.get('/shop-address', addressGet);

    app.put('/shop-address', verifyToken, roleValidator(['admin']), addressAdd);

}

module.exports = addressRoutes;