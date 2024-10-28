const express = require('express');
const authRoutes = require('../../module/v1/auth/routes/auth.routes');
const userRoutes = require('../../module/v1/user/routes/user.routes');
const blogRoutes = require('../../module/v1/blogs/routes/blog.routes');

module.exports = () => {
   const api = express.Router();
   
   authRoutes(api);
   userRoutes(api);
   blogRoutes(api);

   return api;
}

