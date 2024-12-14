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
    banner_btn_link: {
        type: String
    },
    banner_imageUrl: {
        type: imageSchema
    },
    banner_btn_name: {
        type: String
    }

}, { timestamps: true });

const banner = mongoose.model('banner', bannerSchema);
module.exports = banner
