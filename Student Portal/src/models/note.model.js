const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    nts_id: {
        type: String,
        default: 'jj' //uuid
    },
    nts_subject_name: {
        type: String,
        required: true,
    },
    nts_chp: {
        type: String,
        required: true,
    },
    nts_topic: {
        type: String,
        required: true
    },
    nts_sub_topic: {
        type: String
    },
    nts_desc: {
        type: String,
        required: true
    },
    nts_class: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const note = mongoose.model('note', noteSchema);

module.exports = note