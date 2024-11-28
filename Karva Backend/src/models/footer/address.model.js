const mongoose = require('mongoose');

const shopAddressSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: Number
    },
    address: {
        type: String
    },
    whatsapp: {
        type: Number
    },

}, { timestamps: true });

const shopAddress = mongoose.model('shopAddress', shopAddressSchema);
module.exports = shopAddress
