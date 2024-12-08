const { productGet, productGetById, productAdd, productUpdate, productDelete, productGetBySearch, productSuggest,
    ratingGet, ratingAdd, ratingGetById, ratingUpdate, ratingDelete } = require('../controllers/product.controllers');
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

    app.get('/rating/all', verifyToken, roleValidator(['admin']), ratingGet);

    app.get('/rating/:id', ratingGetById);

    app.post('/rating', verifyToken, ratingAdd);

    app.put('/rating/:id', verifyToken, ratingUpdate);

    app.delete('/rating/:id', verifyToken, ratingDelete);

}

module.exports = productRoutes;