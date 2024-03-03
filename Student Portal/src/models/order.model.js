const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    order_fk_user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    order_fk_prd_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    order_prd_qty: {
        type: Number,
        required: true
    },
    order_status: {
        type: String,
        required: true,
        default: 'pending',
        enum:['pending','completed','rejected']
    }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;