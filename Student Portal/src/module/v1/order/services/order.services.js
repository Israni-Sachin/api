const Cart = require('../../../../models/cart.model');
const Order = require('../../../../models/order.model');
const moment = require('moment');

const orderAll = async () => {

    const today = moment().startOf('day');

    const data = await Order.aggregate([
        {
            $match: {
                createdAt: {
                    $gte: today.toDate(),
                    $lte: moment(today).endOf('day').toDate()
                }
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
            $lookup: {
                from: 'users',
                let: { user_id: '$order_fk_user_id' },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $eq: ['$_id', '$$user_id']
                            }
                        }
                    },
                    {
                        $project: {
                            _id: 1,
                            user_fname: 1,
                            user_lname: 1
                        }
                    }
                ],
                as: 'user'
            }
        },
        {
            $lookup:{
                from:'orders',
                let:{order_fk_prd_id:'$order_fk_prd_id'},
                pipeline:[
                    {
                        $match:{
                            $expr: {
                                $eq: ['$order_fk_prd_id', '$$order_fk_prd_id']
                            }
                        }
                    },
                    {
                        $project: {
                            _id: 0,
                            order_status: 1
                        }
                    }
                ],
                as:'order'
            }
        },
        {
            $group: {
                _id: '$order_fk_prd_id',
                order_status: {
                    $first: '$order_status'
                },
                prd_total_qty: {
                    $sum: '$order_prd_qty'
                },
                prd_total_amount: {
                    $sum: { $multiply: ['$order_prd_qty', '$product.prd_price'] }
                },
                product_details: {
                    $first: '$product'
                },
                users: {
                    $push: {
                        user_data: {
                            $first: '$user'
                        },
                        prd_qty: '$order_prd_qty',
                    }
                }
            }

        },
        // {
        //     $unwind: '$order_status'
        // },
        {
            $project: {
                _id: 0,
                id: '$_id',
                order_status: 1,
                // order_status: {$first:'$order_status.order_status'},
                users: 1,
                product_details: 1,
                prd_total_qty: 1,
                prd_total_amount: 1
            }

        },
        {
            $sort: {
                prd_total_amount: -1
            }
        }
    ]);

    return data;
}

const orderAdd = async (user) => {

    // find cart based on user id
    let cart = await Cart.findOne({ cart_fk_user_id: user.id })

    // if cart is empty then return
    if (!cart) return;

    const today = moment().startOf('day');

    // collect all product ids from cart
    const prdIds = cart.cart_items.map(item => item.cartitm_fk_prd_id);

    // find all orders of today based collected product ids
    let orders = await Order.find({
        order_fk_user_id: user.id, order_fk_prd_id: { $in: prdIds },
        createdAt: {
            $gte: today.toDate(),
            $lte: moment(today).endOf('day').toDate()
        }
    });

    // store new items to be added to orders
    const newItems = []

    // loop through each cart item
    cart.cart_items.forEach(item => {

        // find if item already exists in orders
        const existingItem = orders.find(o => o.order_fk_prd_id.toString() == item.cartitm_fk_prd_id.toString());

        // if item exists in orders then update qty
        if (existingItem) {
            existingItem.order_prd_qty += item.cartitm_prd_qty;
            existingItem.save();
        } else {

            // if item does not exist in orders then add item to newItems
            newItems.push({
                order_fk_user_id: user.id,
                order_fk_prd_id: item.cartitm_fk_prd_id,
                order_prd_qty: item.cartitm_prd_qty
            });
        }
    });

    // add new items to orders
    await Order.create(newItems);

    // empty cart
    return await Cart.updateOne({ cart_fk_user_id: user.id }, { $set: { cart_items: [] } });

}

const orderUpdate = async (body) => {
    const today = moment().startOf('day');

    await Order.updateMany({
        order_fk_prd_id: { $in: body.prd_ids }, 
        createdAt: {
            $gte: today.toDate(),
            $lte: moment(today).endOf('day').toDate()
        },
        order_status: 'pending'
    }, { $set: { order_status: body.order_status } });

}
module.exports = { orderAll, orderAdd, orderUpdate };