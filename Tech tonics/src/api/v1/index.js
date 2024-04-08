const express = require('express');
const authRoutes = require('../../module/v1/auth/routes/auth.routes');
const productRoutes = require('../../module/v1/products/routes/product.routes');


module.exports = () => {
   const api = express.Router();

   authRoutes(api);
   productRoutes(api);

   return api;
}

