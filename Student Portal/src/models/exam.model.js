
const mongoose = require("mongoose");

const examSchema = new mongoose.Schema({
    exam_subject: {
        type: String,
        required: true
    },
    exam_date: {
        type: String,
        required: true,
    },
    exam_time: {
        type: String,
        required: true,
    },
    exam_duration: {
        type: String,
        required: true,
        example: '30 mins'
    },
    exam_total_marks: {
        type: Number,
        required: true,
    },
    exam_passing_marks: {
        type: Number,
        required: true,
    },
    exam_class: {
        type: String,
        required: true,
    }
})

const exam = mongoose.model('exam', examSchema);

module.exports = exam;
