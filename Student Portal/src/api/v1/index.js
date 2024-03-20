const express = require('express');
const authRoutes = require('../../module/v1/auth/routes/auth.routes');
const examRoutes=require('../../module/v1/exam/routes/exam.routes');
const attendenceRoutes = require('../../module/v1/attendence/routes/attendence.routes');
const userRoutes = require('../../module/v1/user/routes/user.routes');
const doubtsRoutes = require('../../module/v1/doubts/routes/doubts.routes');

module.exports = () => {
   const api = express.Router();
   
   authRoutes(api);
   userRoutes(api);
   attendenceRoutes(api);
   examRoutes(api);
   doubtsRoutes(api);
   // orderHistoryRoutes(api);
   // timerRoutes(api);

   return api;
}

