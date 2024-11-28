const mongoose = require('mongoose');
const { imageSchema } = require('../../common/common-schemas');

// Define category schema with subcategories
const bannerSchema = new mongoose.Schema({
    banner_title: {
        type: String,
        required: true
    },
    banner_desc: {
        type: String
    },
    banner_link: {
        type: String
    },
    banner_imageUrl: {
        type: imageSchema
    },
    banner_inside_imageUrl: {
        type: String
    }

}, { timestamps: true });

const banner = mongoose.model('banner', bannerSchema);
module.exports = banner
