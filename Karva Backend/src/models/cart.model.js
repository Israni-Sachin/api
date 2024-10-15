// const mongoose = require('mongoose');

// const cartItemSchema = new mongoose.Schema({
//     cartitm_fk_prd_id: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Product',
//         required: true
//     },
//     cartitm_prd_qty: {
//         type: Number,
//         required: true
//     }
// }, { _id: false });

// const cartSchema = new mongoose.Schema({
//     cart_fk_user_id: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required: true,
//         unique: true
//     },
//     cart_items: [cartItemSchema]
// }, { timestamps: true });



// const Cart = mongoose.model('Cart', cartSchema);

// module.exports = Cart;

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

module.exports = mongoose.model('Category', categorySchema);