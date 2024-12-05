const { productGet, productAdd, productUpdate, productDelete, productGetBySearch, productSuggest, ratingGet, ratingAdd, ratingGetById } = require('../controllers/product.controllers');
const { verifyToken } = require('../../../../middlewares/token');
const roleValidator = require('../../../../middlewares/role-validator');
// const { productGetSchema, productAddSchema, productUpdateSchema, productGetBySlug } = require('../validator/index');
const validator = require('../../../../middlewares/validator');

const productRoutes = async (app) => {

    app.post('/product/all', productGet);

    app.get('/rating/all', verifyToken, roleValidator(['admin']), ratingGet);
    
    app.get('/rating/:id', ratingGetById);

    app.post('/rating', verifyToken, ratingAdd);

    app.post('/product/search', productGetBySearch);

    app.post('/product/suggestion', productSuggest);

    app.post('/product', verifyToken, roleValidator(['admin']), productAdd);

    app.put('/product/:prd_id', verifyToken, roleValidator(['admin']), productUpdate);

    app.delete('/product/:prd_id', verifyToken, roleValidator(['admin']), productDelete);

}

module.exports = productRoutes;