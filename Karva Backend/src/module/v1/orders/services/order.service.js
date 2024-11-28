const Razorpay = require('razorpay');
const { v4: uuidv4 } = require('uuid'); 
const crypto = require('crypto');
const Cart = require("../../../../models/cart.model")
const Order  = require("../../../../models/orders.model")
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

const createOrder = async (user) => {
    const cart = await Cart.findOne({ cart_fk_user_id: user.id })
        .populate('cart_items.cartitm_fk_prd_id', 'prd_price');

    if (!cart || cart.cart_items.length === 0) {
        throw new Error('CART_EMPTY');
    }

    const totalAmount = cart.cart_items
        .filter(item => item.isSelected)
        .reduce((sum, item) => sum + item.cartitm_prd_qty * item.cartitm_fk_prd_id.prd_price, 0);

    if (totalAmount <= 0) throw new Error('INVALID_ORDER_AMOUNT');

   
    const razorpayOrder = await razorpay.orders.create({
        amount: totalAmount * 100, // Amount in paise (multiply by 100 for INR)
        currency: 'INR',
        receipt: `receipt_${uuidv4().slice(0, 8)}`,
        notes: {
            userId: user.id
        }
    });

    return {
        orderId: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        cartId: cart._id
    };
};

const handlePaymentSuccess = async (user, razorpayPaymentId, razorpayOrderId, razorpaySignature, addressId) => {

    const generatedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(`${razorpayOrderId}|${razorpayPaymentId}`)
        .digest('hex');

    if (generatedSignature !== razorpaySignature) {
        throw new Error('PAYMENT_VERIFICATION_FAILED');
    }


    const cart = await Cart.findOne({ cart_fk_user_id: user.id })
        .populate('cart_items.cartitm_fk_prd_id', 'prd_price');

    if (!cart || cart.cart_items.length === 0) {
        throw new Error('CART_EMPTY');
    }

    const totalAmount = cart.cart_items
        .filter(item => item.isSelected)
        .reduce((sum, item) => sum + item.cartitm_prd_qty * item.cartitm_fk_prd_id.prd_price, 0);

 
    const order = await Order.create({
        order_fk_user_id: user.id,
        order_fk_address_id: addressId,
        order_items: cart.cart_items.map(item => ({
            orderitm_fk_prd_id: item.cartitm_fk_prd_id._id,
            orderitm_prd_qty: item.cartitm_prd_qty,
            orderitm_prd_qty_amount: item.cartitm_prd_qty * item.cartitm_fk_prd_id.prd_price,
            tracking_id: "coming soon" ,
            additional_info:item?.additional_info,
            expected_date:"coming soon"
        })),
        order_total_amount: totalAmount,
        payment_id: razorpayPaymentId,
        order_id: razorpayOrderId,
        status: 'Completed'
    });

    await Cart.findOneAndDelete({ cart_fk_user_id: user.id });

    return order;
};


const getUserOrders = async (user) => {
    try {

        console.log("this is user",user)
      const userOrders = await Order.find({ order_fk_user_id: user.id })
        .populate('order_fk_address_id')
        .populate('order_items.orderitm_fk_prd_id');

        console.log(userOrders)

      const userAllOrders = userOrders.flatMap(order => 
        order.order_items.map(item => ({
          ...item.toObject(),  
          orderId: order._id,
          orderDate: order.createdAt,
          address: order.order_fk_address_id, 
        }))
      );

      //below html use for the send invoice mail to the user
      const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f9f9f9;
                  margin: 0;
                  padding: 0;
              }
              .email-container {
                  max-width: 600px;
                  margin: 20px auto;
                  background: white;
                  border-radius: 8px;
                  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                  overflow: hidden;
              }
              .email-header {
                  background-color: #4CAF50;
                  color: white;
                  padding: 15px;
                  text-align: center;
                  font-size: 20px;
                  font-weight: bold;
              }
              .email-body {
                  padding: 20px;
              }
              .order-summary {
                  margin: 20px 0;
                  border-collapse: collapse;
                  width: 100%;
              }
              .order-summary th, .order-summary td {
                  border: 1px solid #ddd;
                  padding: 8px;
                  text-align: left;
              }
              .order-summary th {
                  background-color: #f2f2f2;
              }
              .total {
                  font-weight: bold;
              }
              .email-footer {
                  background-color: #f9f9f9;
                  color: #555;
                  padding: 10px;
                  text-align: center;
                  font-size: 14px;
              }
          </style>
      </head>
      <body>
          <div class="email-container">
              <div class="email-header">
                  Thank You for Your Order!
              </div>
              <div class="email-body">
                  <p>Dear ${user.name},</p>
                  <p>Your order has been successfully placed. Here are your order details:</p>
                  <table class="order-summary">
                      <thead>
                          <tr>
                              <th>Product</th>
                              <th>Quantity</th>
                              <th>Price</th>
                              <th>Total</th>
                          </tr>
                      </thead>
                      <tbody>
                          ${selectedItems
                              .map(
                                  item => `
                                  <tr>
                                      <td>${item.cartitm_fk_prd_id.name}</td>
                                      <td>${item.cartitm_prd_qty}</td>
                                      <td>₹${item.cartitm_fk_prd_id.prd_price.toFixed(2)}</td>
                                      <td>₹${(item.cartitm_prd_qty * item.cartitm_fk_prd_id.prd_price).toFixed(2)}</td>
                                  </tr>
                                  `
                              )
                              .join('')}
                      </tbody>
                      <tfoot>
                          <tr>
                              <td colspan="3" class="total">Total Amount</td>
                              <td class="total">₹${totalAmount.toFixed(2)}</td>
                          </tr>
                      </tfoot>
                  </table>
                  <p>Order ID: ${razorpayOrderId}</p>
                  <p>Payment ID: ${razorpayPaymentId}</p>
              </div>
              <div class="email-footer">
                  &copy; ${new Date().getFullYear()} Your Company Name. All rights reserved.
              </div>
          </div>
      </body>
      </html>
  `;
      return userAllOrders;
  
    } catch (error) {
      console.error('Error fetching user orders:', error);
      throw new Error('Error fetching user orders');
    }
  };
  


module.exports={createOrder,handlePaymentSuccess,getUserOrders}

