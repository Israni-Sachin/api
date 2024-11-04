
const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
    prd_name: {
        type: String,
        required: true,
    },
    prd_slug: {
        type: String,
    },
    prd_desc: {
        type: String,
    },
    prd_category: {
        type: String,
    },
    prd_gender: {
        type: String,
    },
    prd_sub_category: {
        type: String,
    },
    prd_price: {
        type: Number,
        required: true,
    },
    prd_discount_percentage: {
        type: String,
    },
    prd_discount_price: {
        type: Number,
    },
    prd_quantity: {
        type: Number,
    },
    prd_sizes: {
        type: [Number],
    },
    prd_colors: {
        type: [String],
    },
    prd_img: {
        type: [String],
    },
    prd_gst_charges: {
        type: String,
    },
    prd_delivery_charges: {
        type: Number,
    },
    prd_out_of_stock: {
        type: Boolean
    }
}
, { timestamps: true });

const Products = mongoose.model('Product', productsSchema);

module.exports = Products;
