const { userUpdate, userGet,usersGet } = require('../controllers/user.controllers');
const { verifyToken } = require('../../../../middlewares/token');
const userUpdateSchema = require('../validator/user-update.validator');
const validator = require('../../../../middlewares/validator');
const Users = require('../../../../models/user.model');

const userRoutes = async (app) => {

    app.get('/hello', usersGet)
    app.get('/user', verifyToken, userGet);
    app.put('/user', verifyToken, validator(userUpdateSchema), userUpdate);

}

module.exports = userRoutes;