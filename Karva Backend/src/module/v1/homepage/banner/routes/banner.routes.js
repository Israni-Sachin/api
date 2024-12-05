const { bannerGet, bannerGetById, bannerAdd, bannerUpdate, bannerDelete } = require('../controllers/banner.controllers');
const { verifyToken } = require('../../../../../middlewares/token');
const roleValidator = require('../../../../../middlewares/role-validator');

const bannerRoutes = async (app) => {

    app.get('/banner', bannerGet);

    app.get('/banner/:banner_id', verifyToken, roleValidator(['admin']), bannerGetById);

    app.post('/banner', verifyToken, roleValidator(['admin']), bannerAdd);

    app.put('/banner/:banner_id', verifyToken, roleValidator(['admin']), bannerUpdate);

    app.delete('/banner/:banner_id', verifyToken, roleValidator(['admin']), bannerDelete);
}

module.exports = bannerRoutes;