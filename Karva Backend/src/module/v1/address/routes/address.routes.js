const { addressDelete, addressUpdate, addressGet, addressAdd } = require('../controllers/address.controllers');
const { verifyToken } = require('../../../../middlewares/token');
const roleValidator = require('../../../../middlewares/role-validator');

const addressRoutes = async (app) => {

    app.get('/address', verifyToken, addressGet);

    // app.get('/address/:add_id', verifyToken, addressGetById);

    app.post('/address', verifyToken, addressAdd);

    // app.get('/address', verifyToken, addressGet);

    app.put('/address', verifyToken, addressUpdate);

    app.delete('/address', verifyToken, addressDelete);

}

module.exports = addressRoutes;