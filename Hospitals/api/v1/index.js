const express = require('express');
const userRoutes = require('../../modules/v1/user/routes/user.routes');

module.exports = () => {
    console.log("api,v1");
    const app = express.Router()
    userRoutes(app)
    return app;
}