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
