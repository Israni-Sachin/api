
const mongoose = require("mongoose");
const { imageSchema } = require("../common/common-schemas");

const ratingIdSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Rating",
        required: true
    }
}, { _id: false }, { timestamps: true });

// const reviewSchema = new mongoose.Schema({
//     user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//         required: true
//     },
//     prd: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Product",
//         required: true
//     },
//     rating: {
//         type: Number,
//         min: 1,
//         max: 5,
//         required: true
//     },
//     title: {
//         type: String,
//     },
//     description: {
//         type: String,
//     }
// }, { timestamps: true });

const sizeSchema = new mongoose.Schema({
    number: {
        type: Number,
    },
    quantity: {
        type: Number,
    },
    price: {
        type: Number,
    },
    discount_percentage: {
        type: String,
    },
    discount_price: {
        type: Number,
    },
    out_of_stock: {
        type: Boolean
    }
}, { _id: false });

const colorSchema = new mongoose.Schema({
    color_name: {
        type: String,
    },
    color_code: {
        type: String,
    },
    out_of_stock: {
        type: Boolean,
    }
}, { _id: false });

const productsSchema = new mongoose.Schema({
    prd_name: {
        type: String,
        required: true
    },
    prd_brand_name: {
        type: String
    },
    prd_slug: {
        type: String,
    },
    prd_desc: {
        type: String,
        // required: true
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
    },
    prd_discount_percentage: {
        type: String,
    },
    prd_discount_price: {
        type: Number,
    },
    prd_overall_quantity: {
        type: Number
    },
    prd_sizes: {
        type: [sizeSchema],
    },
    prd_colors: {
        type: colorSchema,
    },
    prd_img: {
        type: [imageSchema],
    },
    prd_gst_charges: {
        type: String,
    },
    prd_delivery_charges: {
        type: Number,
    },
    prd_out_of_stock: {
        type: Boolean
    },
    prd_reviews: {
        type: [ratingIdSchema]
    },
    prd_overall_ratings: {
        type: Number,
    }
}, { timestamps: true });

const Products = mongoose.model('Product', productsSchema);

async function updateOverallQuantity(data) {
    let product;
    if (data.prd_id) {
        product = await Products.findById(data.prd_id);
    }
    else {
        product = data
    }
    // if (product) {
    product.prd_overall_quantity = product.prd_sizes.reduce((total, size) => total + (Number(size.quantity) || 0), 0) || Number(product.prd_overall_quantity);
    // await Products.save();
    return product;
    // }
}

module.exports = { Products, updateOverallQuantity };

// module.exports = Products;
