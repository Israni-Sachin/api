const mongoose = require('mongoose');

const detailsSchema = new mongoose.Schema({
    title: {
        type: String
    },
    desc: {
        type: String
    }
}, { id: false });

const termACSchema = new mongoose.Schema({
    termAC_title: {
        type: String
    },
    termAC_description: {
        type: [detailsSchema]
    }

}, { timestamps: true });

const termAC = mongoose.model('term-conditions', termACSchema);
module.exports = termAC
