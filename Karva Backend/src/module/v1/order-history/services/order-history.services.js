const Order = require('../../../../models/order.model');
const moment = require('moment');   
const mongoose = require('mongoose');

const orderHistoryGet = async (body, user) => {

       const startDate = moment(body.start_date, "DD-MM-YYYY").startOf('day');
       const endDate = moment(body.end_date, "DD-MM-YYYY").endOf('day');

       const userId = new mongoose.Types.ObjectId(user.id);

       const data = await Order.aggregate([
              {
                     $match: {
                            createdAt: {
                                   $gte: startDate.toDate(),
                                   $lte: endDate.toDate()
                            },
                            order_fk_user_id: userId
                     }
              },
              {
                     $lookup: {
                            from: 'products',
                            localField: 'order_fk_prd_id',
                            foreignField: '_id',
                            as: 'product'
                     }
              },
              {
                     $unwind: '$product'
              },
              {
                     $group: {
                            _id: { order_fk_prd_id: '$order_fk_prd_id', createdAt: '$createdAt' },
                            order_status:{
                                   $push:'$order_status'
                            },
                            product_details: {
                                   $first: '$product'
                            },
                            prd_total_qty: {
                                   $sum: '$order_prd_qty'
                            },
                            prd_total_amount: {
                                   $sum: { $multiply: ['$order_prd_qty', '$product.prd_price'] }
                            },
                            createdAt: {
                                   $first: '$createdAt'
                            },
                            updatedAt : {
                                   $first: '$updatedAt'
                            }
                     }

              },
              {
                     $unwind:'$order_status'
              },
              {
                     $project: {
                            _id: 0,
                            product_details: 1,
                            prd_total_qty: 1,
                            prd_total_amount: 1,
                            order_status:1,
                            createdAt: 1,
                            updatedAt: 1
                     }

              },
              {
                     $sort: {
                            updatedAt: -1
                     }
              }

       ]);

       return data;
}

module.exports = { orderHistoryGet };



