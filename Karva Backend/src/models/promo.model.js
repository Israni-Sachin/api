const mongoose = require('mongoose');

const promoCodeSchema = new mongoose.Schema({
    code: {
        type: String
    },
    desc:{
        type: String
    },
    discountType: {
        type: String,
        enum: ['percentage', 'fixed']
    },
    discountValue: {
        type: Number
    },
    minOrderValue: {
        type: Number,
        default: 0,
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    usageLimit: {
        type: Number,
        default: 1,
    },
    timesUsed: {
        type: Number,
        default: 0,
    },
    // applicableProducts: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Product',
    // }],
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active',
    },
}, { timestamps: true });

const PromoCode = mongoose.model('PromoCode', promoCodeSchema);

module.exports = PromoCode;
