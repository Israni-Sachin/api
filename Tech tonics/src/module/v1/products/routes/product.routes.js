const { productGet, productGetById, productAdd, productUpdate, productDelete, productDeleteMany } = require('../controllers/product.controllers');
const validator = require('../../../../middlewares/validator');
const { loginSchema, registerSchema } = require('../validator');
const { verifyToken } = require('../../../../middlewares/token');

const productRoutes = async (app) => {

    app.get('/product', productGet);

    app.get('/product/:id', productGetById);

    app.post('/product', verifyToken, productAdd);

    app.put('/product', verifyToken, productUpdate);

    app.delete('/product/:id', verifyToken, productDelete);

    app.delete('/product/all', verifyToken, productDeleteMany);

}

module.exports = productRoutes;
