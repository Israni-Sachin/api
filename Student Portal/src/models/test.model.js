const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
    test_id: {
        type: String,
        default: 'jj' //uuid
    },
    test_subject: {
        type: String
    },
    test_date: {
        type: Date,
        required: true,
    },
    test_time: {
        type: String,
        required: true,
    },
    test_duration: {
        type: String,
        required: true,
        example: '30 mins'
    },
    test_total_marks: {
        type: Number,
        required: true,
    },
    test_passing_marks: {
        type: Number,
        required: true,
    },
    test_class: {
        type: String,
        required: true,
    }
})

const test = mongoose.model('test', testSchema);

module.exports = test;
