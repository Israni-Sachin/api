const controllers = require('../controllers/attendence.controllers');
const { verifyToken } = require('../../../../middlewares/token');
const validator = require('../../../../middlewares/validator');
const { attendenceAddSchema, attendenceDelSchema } = require('../validator');
const roleValidator = require('../../../../middlewares/role-validator');

const attendenceRoutes = (app) => {

    app.get('/attendence', verifyToken, roleValidator(['user']), controllers.attendenceGet);

    app.post('/attendence-list', verifyToken, roleValidator(['teacher']), controllers.attendenceList)

    // app.post('/attendence', verifyToken, roleValidator(['teacher']), validator(attendenceAddSchema), controllers.attendenceAdd);
    app.post('/attendence', verifyToken, roleValidator(['teacher']), validator(attendenceAddSchema), controllers.attendenceAdd);

    app.put('/attendence', verifyToken, roleValidator(['teacher']), validator(attendenceAddSchema), controllers.attendenceUpdate);

    // app.delete('/attendence', verifyToken, roleValidator(['user']), validator(attendenceDelSchema), controllers.attendenceDelete);
}

module.exports = attendenceRoutes;