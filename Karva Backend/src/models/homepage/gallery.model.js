const mongoose = require('mongoose');
const { imageSchema } = require('../../common/common-schemas');

// Define category schema with subcategories
const gallerySchema = new mongoose.Schema({
    gallery_imageUrl: {
        type: [imageSchema]
    }

}, { timestamps: true });

const gallery = mongoose.model('gallery', gallerySchema);
module.exports = gallery
