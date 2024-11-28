const mongoose = require('mongoose');
const { imageSchema } = require('../../common/common-schemas');


const aboutUsSchema = new mongoose.Schema({
    aboutUs_title: {
        type: String
    },
    aboutUs_description: {
        type: String
    },
    aboutUs_imageUrl: {
        type: imageSchema
    }

}, { timestamps: true });

const aboutUs = mongoose.model('aboutUs', aboutUsSchema);
module.exports = aboutUs
