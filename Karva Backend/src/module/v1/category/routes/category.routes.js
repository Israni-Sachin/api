// const { productGet, productAdd, productUpdate, productDelete } = require('../controllers/product.controllers');
const { cateGet ,cateAdd} = require('../controllers/category.controllers');
const { verifyToken } = require('../../../../middlewares/token');
const roleValidator = require('../../../../middlewares/role-validator');
// const { productGetSchema, productAddSchema, productUpdateSchema } = require('../validator/index');
const { cateAddSchema } = require('../validator/index');
const validator = require('../../../../middlewares/validator');

const cateRoutes = async (app) => {

    app.get('/category',  cateGet);

    // app.post('/category', verifyToken, roleValidator(['admin']), validator(cateAddSchema), cateAdd);
    // app.post('/category',  validator(cateAddSchema), cateAdd);

    // app.put('/product', verifyToken, roleValidator(['admin']), validator(productUpdateSchema), productUpdate);

    // app.delete('/product', verifyToken, roleValidator(['admin']), productDelete);
}

module.exports = cateRoutes;