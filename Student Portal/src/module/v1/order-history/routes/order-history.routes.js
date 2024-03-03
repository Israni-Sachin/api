const controller = require('../controllers/order-history.controllers');
const { verifyToken } = require('../../../../middlewares/token');
const roleValidator = require('../../../../middlewares/role-validator');
const validator = require('../../../../middlewares/validator');
const orderHistorySchema = require('../validators/order-history.validator');

const orderHistoryRoutes = (app) => {
    app.post('/order-history', verifyToken, roleValidator(['user']), validator(orderHistorySchema), controller.orderHistoryGet);
}

module.exports = orderHistoryRoutes;