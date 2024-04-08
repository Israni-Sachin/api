const mongoose = require("mongoose");
const { featureSchema } = require("./common.model");

const productSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
    },
    sub_category: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    features: {
        type: [featureSchema]
    },
}, { timestamps: true });

const Products = mongoose.model('products', productSchema);

module.exports = Products;
