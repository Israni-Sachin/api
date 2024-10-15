const express = require('express');
const authRoutes = require('../../module/v1/auth/routes/auth.routes');

module.exports = () => {
   const api = express.Router();
   
   authRoutes(api);

   return api;
}

