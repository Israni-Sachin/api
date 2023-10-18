const userControllers = require('../controllers/user.controllers');
const cors = require('cors');

const userRouter = (app) => {
    app
        .route('/user')
        .get(cors(), userControllers.userGet)
        .post(cors(), userControllers.userAdd)

    app
        .route('/user/:id')
        .get(cors(), userControllers.userGetById)
        .patch(cors(), userControllers.userUpdate)
        .delete(cors(), userControllers.userDelete)

}

module.exports = userRouter;