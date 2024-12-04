const mongoose = require('mongoose');
const { imageSchema } = require('../../common/common-schemas');

// Define category schema with subcategories
const loginImgSchema = new mongoose.Schema({
    loginImg_imageUrl: {
        type: imageSchema
    }

}, { timestamps: true });

const loginImg = mongoose.model('loginImg', loginImgSchema);
module.exports = loginImg
