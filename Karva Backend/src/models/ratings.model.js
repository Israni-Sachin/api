const mongoose = require('mongoose');
const { imageSchema } = require('../common/common-schemas');

const ratingItemSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    name: {
        type: String,
    },
    title: {
        type: String,
    },
    img: {
        type: imageSchema,
    },
    description: {
        type: String,
    }
}, { _id: false }, { timestamps: true });

const ratingSchema = new mongoose.Schema({
    rating_fk_prd_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
        unique: true
    },
    rating_all: [ratingItemSchema]
}, { timestamps: true });

const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;