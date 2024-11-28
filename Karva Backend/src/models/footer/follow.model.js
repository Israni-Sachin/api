const mongoose = require('mongoose');
const { imageSchema } = require('../../common/common-schemas');

const detailsSchema = new mongoose.Schema({
    image: {
        type: imageSchema
    },
    link: {
        type: String
    }
}, { id: false });

const followSchema = new mongoose.Schema({
    follow_details: {
        type: [detailsSchema]
    }

}, { timestamps: true });

const follow = mongoose.model('follow', followSchema);
module.exports = follow
