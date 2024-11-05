const { userGetAll, userUpdate, userGet, userGiveAdminAccess } = require('../controllers/user.controllers');
const { verifyToken } = require('../../../../middlewares/token');
const userUpdateSchema = require('../validator/user-update.validator');
const validator = require('../../../../middlewares/validator');
const roleValidator = require('../../../../middlewares/role-validator');

const userRoutes = async (app) => {

    app.get('/userAll', verifyToken, roleValidator(['admin']), userGetAll);

    app.post('/user/admin/access', verifyToken, roleValidator(['admin']), userGiveAdminAccess);

    app.get('/user', verifyToken, userGet);
    
    app.put('/user', verifyToken, validator(userUpdateSchema), userUpdate);

}

module.exports = userRoutes;