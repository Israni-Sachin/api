const mongoose = require('mongoose');

const detailsSchema = new mongoose.Schema({
    title: {
        type: String
    },
    desc: {
        type: String
    }
}, { id: false });

const privacySchema = new mongoose.Schema({
    privacy_title: {
        type: String
    },
    privacy_description: {
        type: [detailsSchema]
    }

}, { timestamps: true });

const privacy = mongoose.model('privacy', privacySchema);
module.exports = privacy
