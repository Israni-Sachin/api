const roleValidator = require('../../../../middlewares/role-validator');
const { verifyToken } = require('../../../../middlewares/token');
const { OrderCreate, OrderSuccess, UserOrders, OrderTrackingUpdate } = require('../controllers/order.controller');


const OrderRoutes = (app) => {

   app.post("/order", verifyToken, OrderCreate)

   app.post("/order/success", verifyToken, OrderSuccess)

   app.get("/order/user", verifyToken, UserOrders)

   app.put("/order/track",verifyToken, roleValidator(['admin']),OrderTrackingUpdate)

}

module.exports = OrderRoutes;