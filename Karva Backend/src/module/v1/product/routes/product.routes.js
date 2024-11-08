const { productGet, productAdd, productUpdate, productDelete, productGetBySearch } = require('../controllers/product.controllers');
const { verifyToken } = require('../../../../middlewares/token');
const roleValidator = require('../../../../middlewares/role-validator');
// const { productGetSchema, productAddSchema, productUpdateSchema, productGetBySlug } = require('../validator/index');
const validator = require('../../../../middlewares/validator');

const productRoutes = async (app) => {

    app.post('/product/all', productGet);

    app.post('/product/search', productGetBySearch);

    app.post('/product', verifyToken, roleValidator(['admin']), productAdd);

    // app.put('/product', verifyToken, roleValidator(['admin']), validator(productUpdateSchema), productUpdate);
    app.put('/product/:prd_id', verifyToken, roleValidator(['admin']), productUpdate);

    app.delete('/product/:prd_id', verifyToken, roleValidator(['admin']), productDelete);
}

module.exports = productRoutes;