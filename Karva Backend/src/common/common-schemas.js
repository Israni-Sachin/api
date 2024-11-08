const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    public_id: {
        type: String,
        required: true
    },
    image_url: {
        type: String,
        required: true
    }
}, { _id: false });

module.exports = {
    imageSchema
}