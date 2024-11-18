const mongoose = require('mongoose');
const { imageSchema } = require('../common/common-schemas');

// Define subcategory schema as an embedded subdocument
const subcategorySchema = new mongoose.Schema({
    sub_cat_name: {
        type: String,
        required: true
    },
    // sub_cat_description: {
    //     type: String,
    //     required: true
    // },
    sub_cat_imageUrl: {
        type: imageSchema
    }
});

// Define category schema with subcategories
const categorySchema = new mongoose.Schema({
    cat_name: {
        type: String,
        required: true
    },
    cat_slug: {
        type: String
    },
    // cat_description: {
    //     type: String,
    //     required: true
    // },
    cat_imageUrl: {
        type: imageSchema
    },
    subcategories: [subcategorySchema]  // Embedded subcategories array

}, { timestamps: true });

const categorys = mongoose.model('category', categorySchema);
module.exports = categorys
