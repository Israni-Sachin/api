
const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
    prd_name: {
        type: String,
        required: true,
    },
    prd_price: {
        type: Number,
        required: true,
    },
    prd_img: {
        type: String,
    },
    prd_is_visible:{
        type: Boolean,
        default: true
    }
}
    , { timestamps: true });

const Products = mongoose.model('Product', productsSchema);

module.exports = Products;
