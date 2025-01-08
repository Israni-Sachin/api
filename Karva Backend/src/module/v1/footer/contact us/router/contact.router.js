const { contactGet, contactAdd,contactUpdate } = require('../controllers/contact.controllers');
const { verifyToken } = require('../../../../../middlewares/token');
const roleValidator = require('../../../../../middlewares/role-validator');

const contactRoutes = async (app) => {

    app.get('/contact', verifyToken, roleValidator(['admin']), contactGet);

    app.post('/contact', contactAdd);

    app.put('/contact', verifyToken, roleValidator(['admin']), contactUpdate);

}

module.exports = contactRoutes;