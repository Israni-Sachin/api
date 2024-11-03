const express = require('express');
const authRoutes = require('../../module/v1/auth/routes/auth.routes');
const userRoutes = require('../../module/v1/user/routes/user.routes');
const blogRoutes = require('../../module/v1/blogs/routes/blog.routes');
const productRoutes = require('../../module/v1/product/routes/product.routes');

module.exports = () => {
   const api = express.Router();

   authRoutes(api);
   userRoutes(api);
   blogRoutes(api);
   productRoutes(api);
   
   return api;
}

