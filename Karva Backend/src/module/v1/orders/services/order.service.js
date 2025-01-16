const Razorpay = require('razorpay');
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');
const Cart = require("../../../../models/cart.model")
const Order = require("../../../../models/orders.model");
const Users = require('../../../../models/user.model');
const { OrderSuccessMail } = require('../../../../common/mailer');
const { Products } = require('../../../../models/product.model');

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

const fs = require('fs');
const path = require('path');
const Address = require('../../../../models/address.model');
const csvWriter = require('csv-writer').createObjectCsvWriter;

const createOrder = async (user) => {
    const cart = await Cart.findOne({ cart_fk_user_id: user.id })
        .populate('cart_items.cartitm_fk_prd_id', 'prd_price');

    console.log("this is cart",cart.cart_items)

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
        .populate('cart_items.cartitm_fk_prd_id', 'prd_price prd_name');

    const UsersDetail = await Users.findOne({ _id: user.id })

    if (!cart || cart.cart_items.length === 0) {
        throw new Error('CART_EMPTY');
    }

    const selectedItems = cart.cart_items.filter(item => item.isSelected);
    console.log("this is selectedItems", selectedItems)
    if (selectedItems.length === 0) {
        throw new Error('NO_SELECTED_ITEMS');
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
            tracking_id: "coming soon",
            additional_info: item?.additional_info,
            expected_date: "coming soon"
        })),
        order_total_amount: totalAmount,
        payment_id: razorpayPaymentId,
        order_id: razorpayOrderId,
        status: 'Completed'
    });

    cart.cart_items = cart.cart_items.filter(item => !item.isSelected);
    if (cart.cart_items.length === 0) {
        await Cart.findOneAndDelete({ cart_fk_user_id: user.id });
    } else {
        await cart.save();
    }
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
                                      <td>${item.cartitm_fk_prd_id.prd_name}</td>
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
                  &copy; ${new Date().getFullYear()} Karvshop . All rights reserved.
              </div>
          </div>
      </body>
      </html>
  `;

  for (const item of selectedItems) {
    const product = await Products.findById(item.cartitm_fk_prd_id._id);
    const sizes = item?.additional_info?.sizes;
    if (sizes) {
        const sizeIndex = product.prd_sizes.findIndex(size => size.number === sizes);
        if (sizeIndex >= 0) {
            product.prd_sizes[sizeIndex].quantity -= item.cartitm_prd_qty;
            if (product.prd_sizes[sizeIndex].quantity < 0) {
                throw new Error(`Insufficient quantity for size ${sizes}`);
            }
        }
        product.prd_overall_quantity = product.prd_sizes.reduce(
            (total, size) => total + size.quantity,
            0
        );
    } else {
        product.prd_overall_quantity -= item.cartitm_prd_qty;
        if (product.prd_overall_quantity < 0) {
            throw new Error(`Insufficient overall quantity for product ${product.prd_name}`);
        }
    }

    await product.save();
}

    OrderSuccessMail(UsersDetail.user_email, htmlContent)

    return order;
};


const getUserOrders = async (user) => {
    try {

        console.log("this is user", user)
        const userOrders = await Order.find({ order_fk_user_id: user.id })
            .populate('order_fk_address_id')
            .populate('order_items.orderitm_fk_prd_id')
            .populate({
                path:"order_fk_user_id",
                select:"user_fname user_lname"
            })

        console.log(userOrders[0].order_items)

        const userAllOrders = userOrders.flatMap(order =>
            order.order_items.map(item => ({
                ...item.toObject(),
                orderId: order._id,
                orderDate: order.createdAt,
                address: order.order_fk_address_id,
                userInformation:order.order_fk_user_id
            }))
        );
        return userAllOrders;

    } catch (error) {
        console.error('Error fetching user orders:', error);
        throw new Error('Error fetching user orders');
    }
};




const updateOrderItems = async (orderId, trackingId, expectedDate,trackingLink) => {
   
    const order = await Order.findById(orderId);
    if (!order) {
        throw new Error('Order not found');
    }

    order.order_items = order.order_items.map(item => {
        item.tracking_id = trackingId;      
        item.expected_date = expectedDate;  
        item.tracking_link = trackingLink
        return item;
    });


    await order.save();
    return order;
};


const buyNow = async (user, orderData) => {
    try {
        const razorpayOrder = await razorpay.orders.create({
            amount: orderData.totalAmount * 100, 
            currency: 'INR',
            receipt: `receipt_${Date.now()}`, 
            notes: {
                productName: orderData.productName,
                userId: user.id
            }
        });

        const newOrder = await Order.create({
            order_fk_user_id: user.id,
            order_fk_address_id: orderData.addressId,
            order_items: [
                {
                    orderitm_fk_prd_id: orderData?.productId,
                    orderitm_prd_qty: orderData?.quantity,
                    orderitm_prd_qty_amount: orderData?.price,
                    tracking_id: 'coming soon',
                    additional_info: orderData?.additional_info,
                    isSelected: true,
                    expected_date: 'coming soon',
                    tracking_link: 'coming soon'
                }
            ],
            order_total_amount: orderData.totalAmount,
            payment_id: razorpayOrder.id, 
            status: 'Pending' 
        });


        return {
            success: true,
            message: 'Order created successfully',
            order: newOrder,
            razorpayOrderId: razorpayOrder.id,
            amount: orderData.totalAmount,
            currency: razorpayOrder.currency,
        };

    } catch (error) {
        console.error('Error in buyNow service:', error);
        throw new Error('Failed to create order. Please try again later.');
    }
};



const verifyPayment = async (paymentData,user) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = paymentData;

        const generatedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET) 
            .update(razorpay_order_id + '|' + razorpay_payment_id)
            .digest('hex');

        if (generatedSignature !== razorpay_signature) {
            throw new Error('Payment verification failed');
        }

  
        const updatedOrder = await Order.findOneAndUpdate(
            { payment_id: razorpay_order_id },
            { status: 'Completed' },
            { new: true }
        );

        const UsersDetail = await Users.findOne({ _id: user.id })

        const orderWithProductDetails = await Order.findOne({ payment_id: razorpay_order_id })
    .populate({
        path: 'order_items.orderitm_fk_prd_id',
        model: 'Product',
    });

        console.log("this is UsersDetail",UsersDetail)
       

        if (!updatedOrder) throw new Error('Order not found');

        const selectedItems = orderWithProductDetails?.order_items

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
                                        <td>${item?.orderitm_fk_prd_id?.prd_name}</td>
                                        <td>${item?.orderitm_prd_qty}</td>
                                        <td>₹${item?.orderitm_fk_prd_id?.prd_price}</td>
                                        <td>₹${item?.orderitm_prd_qty_amount}</td>
                                    </tr>
                                    `
              )
              .join('')}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colspan="3" class="total">Total Amount</td>
                                <td class="total">₹${orderWithProductDetails?.order_total_amount?.toFixed(2)}</td>
                            </tr>
                        </tfoot>
                    </table>
                    <p>Order ID: ${razorpay_order_id}</p>
                    <p>Payment ID: ${razorpay_payment_id}</p>
                </div>
                <div class="email-footer">
                    &copy; ${new Date().getFullYear()} Karvshop . All rights reserved.
                </div>
            </div>
        </body>
        </html>
    `;

    for (const item of selectedItems) {
        const product = await Products.findById(item.orderitm_fk_prd_id._id);
        const sizes = item?.additional_info?.sizes;
        if (sizes) {
            const sizeIndex = product.prd_sizes.findIndex(size => size.number === sizes);
            if (sizeIndex >= 0) {
                product.prd_sizes[sizeIndex].quantity -= item.orderitm_prd_qty;
                if (product.prd_sizes[sizeIndex].quantity < 0) {
                    throw new Error(`Insufficient quantity for size ${sizes}`);
                }
            }
            product.prd_overall_quantity = product.prd_sizes.reduce(
                (total, size) => total + size.quantity,
                0
            );
        } else {
            product.prd_overall_quantity -= item.orderitm_prd_qty;
            if (product.prd_overall_quantity < 0) {
                throw new Error(`Insufficient overall quantity for product ${product.prd_name}`);
            }
        }
    
        await product.save();
    }
  
      OrderSuccessMail(UsersDetail.user_email, htmlContent)

        return {
            success: true,
            message: 'Payment verified successfully',
            order: updatedOrder
        };

    } catch (error) {
        console.error('Error in verifyPayment service:', error);
        throw new Error('Payment verification failed.');
    }
};

const getAllOrders = async (user) => {
    try {
        console.log("this is user", user);

        const userOrders = await Order.find({})
            .populate('order_items.orderitm_fk_prd_id')
            .populate({
                path: "order_fk_user_id",
                select: "user_fname user_lname"
            });

        console.log(userOrders);

        const userAllOrders = [];
        for (const order of userOrders) {
            const userAddress = await Address.findOne({ address_fk_user_id: order.order_fk_user_id }).exec();
            const selectedAddress = userAddress?.address_details?.find(address => address._id?.toString() === order?.order_fk_address_id?.toString()) || {};
            const orderItems = order.order_items.map(item => ({
                ...item.toObject(),
                orderId: order._id,
                orderDate: order.createdAt,
                address: selectedAddress,
                userInformation: order.order_fk_user_id
            }));
            userAllOrders.push(...orderItems);
        }

        return userAllOrders;

    } catch (error) {
        console.error('Error fetching user orders:', error);
        throw new Error('Error fetching user orders');
    }
};



const BulkOrderExcel = async (user) => {
    try {
        console.log("This is user", user);
        
        const userOrders = await Order.find({})
            .populate('order_items.orderitm_fk_prd_id')
            .populate({
                path: "order_fk_user_id",
                select: "user_fname user_lname _id"
            });

        console.log(userOrders);

        const csvFilePath = path.join(__dirname, `bulk_orders_${Date.now()}.csv`);

        const csvWriterInstance = csvWriter({
            path: csvFilePath,
            header: [
                { id: 'order_id', title: 'Order ID' },
                { id: 'user_name', title: 'User Name' },
                { id: 'address', title: 'Address' },
                { id: 'total_amount', title: 'Total Amount' },
                { id: 'payment_id', title: 'Payment ID' },
                { id: 'status', title: 'Status' },
                { id: 'created_at', title: 'Created At' },
                { id: 'order_items', title: 'Order Items' }
            ]
        });

        const records = await Promise.all(userOrders.map(async (order) => {
            console.log("this is map order",order)
            const userAddress = await Address.findOne({ address_fk_user_id: order.order_fk_user_id }).exec();
            const selectedAddress = userAddress?.address_details?.find(address => address._id.toString() === order.order_fk_address_id.toString()) || {};
            return {
                order_id: order._id,
                user_name: `${order.order_fk_user_id?.user_fname} ${order.order_fk_user_id?.user_lname}`,
                address: `${selectedAddress.flat_no}, ${selectedAddress.street_area}, ${selectedAddress.locality}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.country}, ${selectedAddress.pincode}`,
                total_amount: order.order_total_amount,
                payment_id: order.payment_id,
                status: order.status,
                created_at: order.createdAt,
                order_items: order.order_items.map(item => `Product: ${item.orderitm_fk_prd_id?.prd_name}, Qty: ${item.orderitm_prd_qty}`).join('; ')
            };
        }));

        await csvWriterInstance.writeRecords(records);
        console.log('CSV file created successfully:', csvFilePath);

        setTimeout(() => {
            fs.unlink(csvFilePath, (err) => {
                if (err) {
                    console.error('Error deleting CSV file:', err);
                } else {
                    console.log('CSV file deleted successfully:', csvFilePath);
                }
            });
        }, 30000); // 30 seconds delay to delete the csv

        return { success: true, filePath: csvFilePath };

    } catch (error) {
        console.error('Error fetching user orders:', error);
        throw new Error('Error fetching user orders');
    }
};


const getYearlySalesOverviewService = async (year) => {
    try {
        const startDate = new Date(`${year}-01-01T00:00:00Z`);
        const endDate = new Date(`${year}-12-31T23:59:59Z`);

        const salesData = await Order.aggregate([
            {
                $match: {
                    createdAt: { $gte: startDate, $lte: endDate },
                    status: 'Completed'
                }
            },
            {
                $unwind: "$order_items"
            },
            {
                $group: {
                    _id: { month: { $month: "$createdAt" } },
                    totalSales: { $sum: "$order_items.orderitm_prd_qty_amount" }
                }
            },
            {
                $sort: { "_id.month": 1 }
            }
        ]);

        const formattedSalesData = Array.from({ length: 12 }, (_, i) => ({
            name: new Date(0, i).toLocaleString('default', { month: 'short' }),
            sales: 0
        }));


        salesData.forEach(({ _id, totalSales }) => {
            const monthIndex = _id.month - 1; 
            formattedSalesData[monthIndex].sales = totalSales;
        });

        return formattedSalesData;
    } catch (error) {
        console.error('Error in getYearlySalesOverviewService:', error);
        throw new Error('Failed to fetch yearly sales overview');
    }
};


const getTopProductsService = async (month, year) => {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59, 999);

    const topProducts = await Order.aggregate([
        { 
            $match: { 
                status: 'Completed', 
                createdAt: { $gte: startDate, $lte: endDate } 
            } 
        },
        { $unwind: '$order_items' },
        { 
            $group: {
                _id: '$order_items.orderitm_fk_prd_id',
                totalSales: { $sum: '$order_items.orderitm_prd_qty_amount' }
            } 
        },
        { 
            $lookup: {
                from: 'products', 
                localField: '_id', 
                foreignField: '_id', 
                as: 'productInfo' 
            } 
        },
        { $unwind: '$productInfo' },
        { 
            $project: {
                name: '$productInfo.prd_name', 
                sales: '$totalSales' 
            } 
        },
        { $sort: { sales: -1 } },
        { $limit: 5 }
    ]);

    return topProducts.map(product => ({
        name: product.name,
        sales: product.sales
    }));
};







module.exports = { createOrder, handlePaymentSuccess, getUserOrders ,updateOrderItems,buyNow,verifyPayment,getAllOrders,BulkOrderExcel,getYearlySalesOverviewService,getTopProductsService}

