const { contactGet, contactAdd } = require('../controllers/contact.controllers');
const { verifyToken } = require('../../../../../middlewares/token');
const roleValidator = require('../../../../../middlewares/role-validator');

const contactRoutes = async (app) => {

    app.get('/contact', verifyToken, roleValidator(['admin']), contactGet);

    app.post('/contact', contactAdd);

}

module.exports = contactRoutes;