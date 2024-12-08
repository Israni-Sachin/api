const mongoose = require('mongoose');
const { imageSchema } = require('../common/common-schemas');

const ratingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
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
}, { timestamps: true });



const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;