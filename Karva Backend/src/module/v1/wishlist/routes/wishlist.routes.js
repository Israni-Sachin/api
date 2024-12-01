const controllers = require('../controllers/wishlist.controllers');
const { verifyToken } = require('../../../../middlewares/token');

const wishRoutes = (app) => {

    app.get('/wish', verifyToken, controllers.wishGet);

    app.post('/wish', verifyToken, controllers.wishAdd);

    app.delete('/wish', verifyToken,  controllers.wishDelete);

}

module.exports = wishRoutes;