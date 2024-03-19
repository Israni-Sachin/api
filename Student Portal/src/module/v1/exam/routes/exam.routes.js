const { examGet, examAdd, examUpdate, examDelete,examGetAll } = require('../controllers/exam.controllers');
const { verifyToken } = require('../../../../middlewares/token');
const roleValidator = require('../../../../middlewares/role-validator');
const examAddSchema = require('../validator/exam-add.validator');
const validator = require('../../../../middlewares/validator');

const productRoutes = async (app) => {

    app.get('/exam', verifyToken, examGet)

    app.get('/exam-all', verifyToken, examGetAll)

    app.post('/exam', verifyToken, roleValidator(['teacher']), validator(examAddSchema), examAdd)

    app.put('/exam', verifyToken, roleValidator(['teacher']), validator(examAddSchema), examUpdate)

    app.delete('/exam', verifyToken, roleValidator(['teacher']), examDelete);
}

module.exports = productRoutes;