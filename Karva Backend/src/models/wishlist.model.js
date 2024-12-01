const mongoose = require('mongoose');

const wishItemSchema = new mongoose.Schema({
    wishitm_fk_prd_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    }
}, { _id: false });

const wishSchema = new mongoose.Schema({
    wish_fk_user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    wish_items: [wishItemSchema]
}, { timestamps: true });



const Wish = mongoose.model('wishlist', wishSchema);

module.exports = Wish;