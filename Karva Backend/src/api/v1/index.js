const express = require('express');
const authRoutes = require('../../module/v1/auth/routes/auth.routes');
const userRoutes = require('../../module/v1/user/routes/user.routes');
const blogRoutes = require('../../module/v1/blogs/routes/blog.routes');
const productRoutes = require('../../module/v1/product/routes/product.routes');
const categoryRoutes = require('../../module/v1/category/routes/category.routes');
const imageUploadRoutes = require('../../module/v1/image upload/routes/imageUpload.routes');
const brandRoutes = require('../../module/v1/brand/routes/brand.routes');
const addressRoutes = require('../../module/v1/address/routes/address.routes');
const cartRoutes = require('../../module/v1/cart/routes/cart.routes');

module.exports = () => {
   const api = express.Router();

   authRoutes(api);
   userRoutes(api); // user main image rakhni hai?
   blogRoutes(api);
   productRoutes(api); // search functionality pending
   categoryRoutes(api); // update remaining categories and subcategories
   imageUploadRoutes(api);
   brandRoutes(api);
   addressRoutes(api);
   cartRoutes(api);

   return api;
}

