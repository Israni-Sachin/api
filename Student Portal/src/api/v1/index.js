const express = require('express');
const authRoutes = require('../../module/v1/auth/routes/auth.routes');
const productRoutes=require('../../module/v1/product/routes/product.routes');
const ordersRoutes = require('../../module/v1/order/routes/order.routes');
const orderHistoryRoutes = require('../../module/v1/order-history/routes/order-history.routes');
const attendenceRoutes = require('../../module/v1/attendence/routes/attendence.routes');
const userRoutes = require('../../module/v1/user/routes/user.routes');
const timerRoutes = require('../../module/v1/timer/routes/timer.routes');

module.exports = () => {
   const api = express.Router();
   
   authRoutes(api);
   userRoutes(api);
   attendenceRoutes(api);
   // productRoutes(api);
   // ordersRoutes(api);
   // orderHistoryRoutes(api);
   // timerRoutes(api);

   return api;
}

