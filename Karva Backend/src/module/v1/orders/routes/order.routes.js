const { verifyToken } = require('../../../../middlewares/token');
const { OrderCreate, OrderSuccess, UserOrders } = require('../controllers/order.controller');


const OrderRoutes = (app) => {

   app.post("/order", verifyToken, OrderCreate)

   app.post("/order/success", verifyToken, OrderSuccess)

   app.get("/order/user", verifyToken, UserOrders)

}

module.exports = OrderRoutes;