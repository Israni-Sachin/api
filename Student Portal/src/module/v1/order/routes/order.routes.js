const orderControllers = require('../controllers/order.controllers');
const { verifyToken } = require('../../../../middlewares/token');
const roleValidator = require('../../../../middlewares/role-validator');
const timeValidation = require('../../../../middlewares/time-validation');

const ordersRoutes = (app) => {

    app.get('/order', verifyToken, roleValidator(['admin']), orderControllers.orderAll);

    app.post('/order', verifyToken, timeValidation, orderControllers.orderAdd);

    app.put('/order', verifyToken,  roleValidator(['admin']), orderControllers.orderUpdate);
}

module.exports = ordersRoutes;

