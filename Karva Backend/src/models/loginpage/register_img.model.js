const mongoose = require('mongoose');
const { imageSchema } = require('../../common/common-schemas');

// Define category schema with subcategories
const registerImgSchema = new mongoose.Schema({
    registerImg_imageUrl: {
        type: imageSchema
    }

}, { timestamps: true });

const registerImg = mongoose.model('registerImg', registerImgSchema);
module.exports = registerImg
