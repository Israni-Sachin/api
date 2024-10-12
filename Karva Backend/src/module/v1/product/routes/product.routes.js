const { productGet, productAdd, productUpdate, productDelete } = require('../controllers/product.controllers');
const { verifyToken } = require('../../../../middlewares/token');
const roleValidator = require('../../../../middlewares/role-validator');
const { productGetSchema, productAddSchema, productUpdateSchema } = require('../validator/index');
const validator = require('../../../../middlewares/validator');

const productRoutes = async (app) => {

    app.post('/product/pagging', verifyToken, validator(productGetSchema), productGet);

    app.post('/product', verifyToken, roleValidator(['admin']), validator(productAddSchema), productAdd);

    app.put('/product', verifyToken, roleValidator(['admin']), validator(productUpdateSchema), productUpdate);

    app.delete('/product', verifyToken, roleValidator(['admin']), productDelete);
}

module.exports = productRoutes;