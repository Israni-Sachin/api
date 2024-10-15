
// const mongoose = require("mongoose");

// const categorysSchema = new mongoose.Schema({
//     cate_name: {
//         type: String,
//         required: true,
//     },
//     cate_subcate: {
//         type: subcateSchema
//     },
//     cate_img: {
//         type: String,
//     },
//     cate_is_visible: {
//         type: Boolean,
//         default: true
//     }
// }, { timestamps: true });

// const subcateSchema = new mongoose.Schema({
//     subcate_name: {
//         type: String,
//         required: true,
//     },
//     subcate_img: {
//         type: String,
//     },
//     subcate_is_visible: {
//         type: Boolean,
//         default: true
//     }
// }, { timestamps: true });


// module.exports = categorys;


const mongoose = require('mongoose');

// Define subcategory schema as an embedded subdocument
const subcategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true }
});

// Define category schema with subcategories
const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    subcategories: [subcategorySchema]  // Embedded subcategories array
});

const categorys = mongoose.model('category', categorySchema);
module.exports = categorys
