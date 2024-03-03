const timerControllers = require('../controllers/timer.controllers');
const roleValidator = require('../../../../middlewares/role-validator');
const { verifyToken } = require('../../../../middlewares/token');

const timerRoutes = (app) => {

    app.get('/timer', verifyToken, timerControllers.timerGet);

    app.put('/timer', verifyToken, roleValidator(['admin']), timerControllers.timerSet);

}

module.exports = timerRoutes;
