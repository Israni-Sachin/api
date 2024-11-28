const controllers = require('../controllers/cart.controllers');
const { verifyToken } = require('../../../../middlewares/token');
const validator = require('../../../../middlewares/validator');
const { cartAddSchema, cartDelSchema } = require('../validator');
const roleValidator = require('../../../../middlewares/role-validator');

const cartRoutes = (app) => {

    app.get('/cart', verifyToken, controllers.cartGet);

    app.post('/cart', verifyToken, controllers.cartAdd);

    app.delete('/cart', verifyToken,  controllers.cartDelete);
    app.put("/cart/select",verifyToken,controllers.cartProductSelect)
}

module.exports = cartRoutes;