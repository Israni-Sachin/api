const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
    orderitm_fk_prd_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    orderitm_prd_qty: {
        type: Number,
        required: true
    }
}, { _id: false })

const orderhistroySchema = new mongoose.Schema({
    orderhistory_fk_user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    orderhistory_items: [orderItemSchema],
}, { timestamps: true });

const Orderhistory = mongoose.model('Order_history', orderhistroySchema);

module.exports = Orderhistory;
