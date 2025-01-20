const roleValidator = require('../../../../middlewares/role-validator');
const { verifyToken } = require('../../../../middlewares/token');
const { OrderCreate, OrderSuccess, UserOrders, OrderTrackingUpdate, OrderBuyNow, OrderBuyNowVerify, OrderAll, OrderCsv, OrderSalesOverview, OrderTopProduct, OrderTopProduct2 } = require('../controllers/order.controller');


const OrderRoutes = (app) => {

   app.post("/order", verifyToken, OrderCreate)

   app.post("/order/success", verifyToken, OrderSuccess)

   app.get("/order/user", verifyToken, UserOrders)

   app.put("/order/track",verifyToken, roleValidator(['admin']),OrderTrackingUpdate)

   app.post("/order/buynow",verifyToken,OrderBuyNow)

   app.post("/order/buynow/verify",verifyToken,OrderBuyNowVerify)

   app.get("/order/all",verifyToken, roleValidator(['admin']),OrderAll)

   app.post("/order/sales",verifyToken, roleValidator(['admin']),OrderSalesOverview)


   app.get("/order/csv",verifyToken, roleValidator(['admin']),OrderCsv)

   app.post("/order/top",verifyToken, roleValidator(['admin']),OrderTopProduct)

   app.post("/order/tops",OrderTopProduct2)


}

module.exports = OrderRoutes;