const { brandGet, brandAdd, brandGetBySlug, brandUpdate, brandDelete } = require('../controllers/brand.controllers');
const { verifyToken } = require('../../../../middlewares/token');
const roleValidator = require('../../../../middlewares/role-validator');
const validator = require('../../../../middlewares/validator');

const brandRoutes = async (app) => {

    app.post('/brand', verifyToken, roleValidator(['admin']), brandAdd);

    app.get('/brand', brandGet);

    app.get('/brand/:brand_name', brandGetBySlug);

    // app.put('/brand', verifyToken, roleValidator(['admin']), validator(brandUpdateSchema), brandUpdate);
    app.put('/brand/:brand_id', verifyToken, roleValidator(['admin']), brandUpdate);

    app.delete('/brand/:brand_id', verifyToken, roleValidator(['admin']), brandDelete);
}

module.exports = brandRoutes;