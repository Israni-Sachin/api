const controllers = require('../controllers/cart.controllers');
const { verifyToken } = require('../../../../middlewares/token');
const validator = require('../../../../middlewares/validator');
const { cartAddSchema, cartDelSchema } = require('../validator');
const roleValidator = require('../../../../middlewares/role-validator');

const cartRoutes = (app) => {

    app.get('/cart', verifyToken, roleValidator(['user']), controllers.cartGet);

    app.post('/cart', verifyToken, roleValidator(['user']), validator(cartAddSchema), controllers.cartAdd);

    app.delete('/cart', verifyToken, roleValidator(['user']), validator(cartDelSchema), controllers.cartDelete);
}

module.exports = cartRoutes;