const { productGet, productGetById, productAdd, productUpdate, productDelete } = require('../controllers/product.controllers');
const validator = require('../../../../middlewares/validator');
const { loginSchema, registerSchema } = require('../validator');
const { verifyToken } = require('../../../../middlewares/token');

const registerRoutes = async (app) => {

    app.get('/product', productGet);

    app.get('/product/:id', productGetById);

    app.post('/product', verifyToken, productAdd);

    app.put('/product/:id', verifyToken, productUpdate);

    app.delete('/product/:id', verifyToken, productDelete);

}

module.exports = registerRoutes;
