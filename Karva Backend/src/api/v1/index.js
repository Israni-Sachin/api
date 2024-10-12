const express = require('express');
const authRoutes = require('../../module/v1/auth/routes/auth.routes');
const productRoutes=require('../../module/v1/product/routes/product.routes');
const ordersRoutes = require('../../module/v1/order/routes/order.routes');
const orderHistoryRoutes = require('../../module/v1/order-history/routes/order-history.routes');
const cartRoutes = require('../../module/v1/cart/routes/cart.routes');
const userRoutes = require('../../module/v1/user/routes/user.routes');
const timerRoutes = require('../../module/v1/timer/routes/timer.routes');

module.exports = () => {
   const api = express.Router();
   
   authRoutes(api);
   productRoutes(api);
   ordersRoutes(api);
   orderHistoryRoutes(api);
   cartRoutes(api);
   userRoutes(api);
   timerRoutes(api);

   return api;
}

