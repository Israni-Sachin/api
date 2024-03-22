const controllers = require('../controllers/doubts.controllers');
const { verifyToken } = require('../../../../middlewares/token');
const validator = require('../../../../middlewares/validator');
const { doubtsAddSchema, doubtsDelSchema,doubtsAnswerSchema } = require('../validator');
const roleValidator = require('../../../../middlewares/role-validator');

const doubtsRoutes = (app) => {

    app.get('/doubts', verifyToken, roleValidator(['student']), controllers.doubtsGet);
    app.get('/doubtst', verifyToken, roleValidator(['teacher']), controllers.doubtsGett);

    // app.post('/doubts-list', verifyToken, roleValidator(['teacher']), controllers.doubtsList)

    // app.post('/doubts', verifyToken, roleValidator(['teacher']), validator(doubtsAddSchema), controllers.doubtsAdd);
    app.post('/doubts', verifyToken, roleValidator(['student']), validator(doubtsAddSchema), controllers.doubtsAdd);
    app.post('/doubtst', verifyToken, roleValidator(['teacher']), validator(doubtsAddSchema), controllers.doubtsAddt);

    app.put('/doubts', verifyToken, roleValidator(['student']), validator(doubtsAddSchema), controllers.doubtsUpdate);
    app.put('/doubtst', verifyToken, roleValidator(['teacher']), validator(doubtsAnswerSchema), controllers.doubtsUpdatet);

    app.delete('/doubts', verifyToken, roleValidator(['student']), validator(doubtsDelSchema), controllers.doubtsDelete);
}

module.exports = doubtsRoutes;