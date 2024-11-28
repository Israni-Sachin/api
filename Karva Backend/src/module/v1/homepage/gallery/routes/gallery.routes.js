const { galleryGet, galleryAdd } = require('../controllers/gallery.controllers');
const { verifyToken } = require('../../../../../middlewares/token');
const roleValidator = require('../../../../../middlewares/role-validator');

const galleryRoutes = async (app) => {

    app.get('/gallery', galleryGet);

    app.put('/gallery', verifyToken, roleValidator(['admin']), galleryAdd);

}

module.exports = galleryRoutes;