const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    orderitm_fk_prd_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    orderitm_prd_qty: {
        type: Number,
        required: true
    },
    orderitm_prd_qty_amount: {
        type: Number,
        required: true
    },
    tracking_id: {
        type: String,
        default: null
    },
    additional_info: {
        type: Map,
        of: mongoose.Schema.Types.Mixed,
        default: {}
    },
    isSelected:{
        type:Boolean,
        default:true
    },
    expected_date:{
        type:String
    }
}, { _id: false });

const orderSchema = new mongoose.Schema({
    order_fk_user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    order_fk_address_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address',
        required: true
    },
    order_items: [orderItemSchema],
    order_total_amount: {
        type: Number,
        required: true
    },
    payment_id: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Completed', 'Failed'],
        default: 'Pending'
    }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
