const controllers = require('../controllers/cart.controllers');
const { verifyToken } = require('../../../../middlewares/token');
const validator = require('../../../../middlewares/validator');
const { cartAddSchema, cartDelSchema } = require('../validator');
const roleValidator = require('../../../../middlewares/role-validator');

const cartRoutes = (app) => {

    app.get('/cart', verifyToken, roleValidator(['customer']), controllers.cartGet);

    app.post('/cart', verifyToken, roleValidator(['customer']), validator(cartAddSchema), controllers.cartAdd);

    app.delete('/cart', verifyToken, roleValidator(['customer']), validator(cartDelSchema), controllers.cartDelete);
}

module.exports = cartRoutes;