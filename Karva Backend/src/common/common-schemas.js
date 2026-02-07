const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    public_id: {
        type: String,
        required: false
    },
    image_url: {
        type: String,
        required: false
    }
}, { _id: false });

module.exports = {
    imageSchema
}