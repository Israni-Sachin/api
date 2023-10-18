const userControllers = require('../controllers/user.controllers');

const userRouter = (app) => {
    app
        .route('/user')
        .get(userControllers.userGet)
        .post(userControllers.userAdd)

    app
        .route('/user/:id')
        .get(userControllers.userGetById)
        .patch(userControllers.userUpdate)
        .delete(userControllers.userDelete)

}

module.exports = userRouter;