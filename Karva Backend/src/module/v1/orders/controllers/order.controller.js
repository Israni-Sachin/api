const { errorResponse, successResponse } = require('../../../../helpers/http-response');
const { createOrder, handlePaymentSuccess, getUserOrders, updateOrderItems } = require('../services/order.service');

const OrderCreate = async (req, res) => {
    try {
        const Order = await createOrder(req.user);
        successResponse({ res, message: 'Success', data: Order });
    } catch (err) {
        errorResponse(res, err);
    }
}

const OrderSuccess = async (req, res) => {
    let { razorpayPaymentId, razorpayOrderId, razorpaySignature, addressId } = req.body
    try {
        const Order = await handlePaymentSuccess(req.user, razorpayPaymentId, razorpayOrderId, razorpaySignature, addressId);
        successResponse({ res, message: 'Success', data: Order });
    } catch (err) {
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



module.exports = { OrderCreate, OrderSuccess, UserOrders ,OrderTrackingUpdate};