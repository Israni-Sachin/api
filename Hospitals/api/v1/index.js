const express = require('express');
const userRoutes = require('../../modules/v1/user/routes/user.routes');
const registerRoutes = require('../../modules/v1/register/routes/register.routes');

module.exports = () => {
    console.log("api,v1");
    const app = express.Router()
    registerRoutes(app)
    userRoutes(app)
    return app;
}