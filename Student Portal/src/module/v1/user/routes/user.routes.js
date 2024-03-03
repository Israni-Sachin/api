const { userUpdate, userGet } = require('../controllers/user.controllers');
const { verifyToken } = require('../../../../middlewares/token');
const userUpdateSchema = require('../validator/user-update.validator');
const validator = require('../../../../middlewares/validator');

const userRoutes = async (app) => {

    app.get('/user', verifyToken, userGet);
    app.put('/user', verifyToken, validator(userUpdateSchema), userUpdate);

}

module.exports = userRoutes;