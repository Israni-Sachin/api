const { errorResponse, successResponse } = require('../../../../helpers/http-response');
const { createOrder, handlePaymentSuccess, getUserOrders, updateOrderItems, buyNow, verifyPayment, getAllOrders, BulkOrderExcel, getYearlySalesOverviewService, getTopProductsService, getTopProductsService2 } = require('../services/order.service');

const OrderCreate = async (req, res) => {
    let {total_amount}=req.body
    try {
        const Order = await createOrder(req.user,total_amount);
        successResponse({ res, message: 'Success', data: Order });
    } catch (err) {
        console.error(err)
        errorResponse(res, err);
    }
}

const OrderSuccess = async (req, res) => {
    let { razorpayPaymentId, razorpayOrderId, razorpaySignature, addressId, promo_code } = req.body
    try {
        const Order = await handlePaymentSuccess(req.user, razorpayPaymentId, razorpayOrderId, razorpaySignature, addressId,promo_code);
        successResponse({ res, message: 'Success', data: Order });
    } catch (err) {
        console.error(err)
        errorResponse(res, err);
    }
}

const UserOrders = async (req, res) => {
    try {
        const UserOrders = await getUserOrders(req.user)
        successResponse({ res, message: 'Success', data: UserOrders });
    } catch (err) {
        errorResponse(res, err);
    }
}

const OrderTrackingUpdate = async (req,res)=>{
    let {orderId, trackingId, expectedDate,trackingLink} = req.body
    try{
        const OrderUpdate = await updateOrderItems(orderId, trackingId, expectedDate,trackingLink)
        successResponse({ res, message: 'Success', data: OrderUpdate });
    }catch(err){
        errorResponse(res,err)
    }
}

const OrderBuyNow = async (req,res)=>{
    try{
        const user = req.user; 
        const orderData = req.body;
        const OrderUpdate = await buyNow(user,orderData)
        successResponse({ res, message: 'Success', data: OrderUpdate });
    }catch(err){
        errorResponse(res,err)
    }
}

const OrderBuyNowVerify = async (req,res)=>{
    try{
        const user = req.user; 
        let {razorpayOrderId,razorpayPaymentId,razorpaySignature}  = req.body
        const paymentData = {razorpay_order_id:razorpayOrderId,razorpay_payment_id:razorpayPaymentId,razorpay_signature:razorpaySignature}
        const OrderUpdate = await verifyPayment(paymentData,user)
        successResponse({ res, message: 'Success', data: OrderUpdate });
    }catch(err){
        errorResponse(res,err)
    }
}

const OrderAll = async (req,res)=>{
    try{
        const OrderUpdate = await getAllOrders()
        successResponse({ res, message: 'Success', data: OrderUpdate });
    }catch(err){
        errorResponse(res,err)
    }
}

const OrderCsv = async (req,res)=>{
    try{
        const OrderUpdate = await BulkOrderExcel()
        successResponse({ res, message: 'Success', data: OrderUpdate });
    }catch(err){
        errorResponse(res,err)
    }
}

const OrderSalesOverview = async (req,res)=>{
    try{
        let {year} = req.body
        const OrderUpdate = await getYearlySalesOverviewService(year)
        successResponse({ res, message: 'Success', data: OrderUpdate });
    }catch(err){
        errorResponse(res,err)
    }
}

const OrderTopProduct = async (req,res)=>{
    try{
        let {month,year} = req.body
        const OrderUpdate = await getTopProductsService(month,year)
        successResponse({ res, message: 'Success', data: OrderUpdate });
    }catch(err){
        errorResponse(res,err)
    }
}

const OrderTopProduct2 = async (req,res)=>{
    try{
        let {month,year} = req.body
        const OrderUpdate = await getTopProductsService2(month,year)
        successResponse({ res, message: 'Success', data: OrderUpdate });
    }catch(err){
        errorResponse(res,err)
    }
}





module.exports = { OrderCreate, OrderSuccess, UserOrders ,OrderTrackingUpdate,OrderBuyNow,OrderBuyNowVerify,OrderAll,OrderCsv,OrderSalesOverview,OrderTopProduct,OrderTopProduct2};