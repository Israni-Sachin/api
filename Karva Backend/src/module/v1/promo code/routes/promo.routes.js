const { promoDelete, promoUpdate, promoGet, promoGetById, promoAdd, applyPromo } = require('../controllers/promo.controllers');
const { verifyToken } = require('../../../../middlewares/token');
const roleValidator = require('../../../../middlewares/role-validator');

const promoRoutes = async (app) => {

    app.get('/promo', verifyToken, promoGet);

    app.get('/promo/:id', verifyToken, promoGetById);

    app.post('/promo', verifyToken, roleValidator(['admin']), promoAdd);

    app.post('/apply/promo', verifyToken, applyPromo);

    app.put('/promo', verifyToken, roleValidator(['admin']), promoUpdate);

    app.delete('/promo', verifyToken, roleValidator(['admin']), promoDelete);

}

module.exports = promoRoutes;