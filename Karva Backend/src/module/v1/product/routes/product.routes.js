const { productGet, productGetById, productAdd, productUpdate, productDelete, productGetBySearch, productSuggest, productBulkDelete,
    ratingGet, ratingAdd, ratingGetById, ratingUpdate, ratingDelete, ratingGetByVisible, ratingUpdateByVisible,
    getDiscountedProducts, productDiscountAdd, productDiscountRemove } = require('../controllers/product.controllers');
const { verifyToken } = require('../../../../middlewares/token');
const roleValidator = require('../../../../middlewares/role-validator');
// const { productGetSchema, productAddSchema, productUpdateSchema, productGetBySlug } = require('../validator/index');
const validator = require('../../../../middlewares/validator');

const productRoutes = async (app) => {

    app.post('/product/all', productGet);

    app.get('/product/:id', productGetById);

    app.post('/product/search', productGetBySearch);

    app.post('/product/suggestion', productSuggest);

    app.post('/product', verifyToken, roleValidator(['admin']), productAdd);

    app.put('/product/:prd_id', verifyToken, roleValidator(['admin']), productUpdate);

    app.delete('/product/:prd_id', verifyToken, roleValidator(['admin']), productDelete);

    app.delete('/product', verifyToken, roleValidator(['admin']), productBulkDelete);

    app.get('/rating/all', verifyToken, roleValidator(['admin']), ratingGet);

    app.get('/rating/visible', ratingGetByVisible);

    app.put('/rating/visible', verifyToken, roleValidator(['admin']), ratingUpdateByVisible);

    app.get('/rating/:id', ratingGetById);

    app.post('/rating', verifyToken, ratingAdd);

    app.put('/rating/:id', verifyToken, ratingUpdate);

    app.post('/disc/prd/add', verifyToken, roleValidator(['admin']), productDiscountAdd);

    app.post('/disc/prd/remove', verifyToken, roleValidator(['admin']), productDiscountRemove);

    app.get('/disc/prd/get', getDiscountedProducts);

    app.delete('/rating/:id', verifyToken, ratingDelete);


}

module.exports = productRoutes;