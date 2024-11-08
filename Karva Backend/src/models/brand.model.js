const mongoose = require('mongoose');
const { imageSchema } = require('../common/common-schemas');

// Define category schema with subcategories
const brandSchema = new mongoose.Schema({
    brand_name: {
        type: String,
        required: true
    },
    brand_slug: {
        type: String
    },
    brand_description: {
        type: String,
        required: true
    },
    brand_imageUrl: {
        type: imageSchema
    }

}, { timestamps: true });

const brand = mongoose.model('brand', brandSchema);
module.exports = brand
