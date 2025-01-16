const mongoose = require('mongoose');

const promoCodeUsageSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    code: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'PromoCode'
    }
}, { timestamps: true });

const PromoCodeCart = mongoose.model('PromoCodeUsageCart', promoCodeUsageSchema);

module.exports = PromoCodeCart;
