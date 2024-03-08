const mongoose = require("mongoose");

const { testSchema } = require("./common.model");

const resultSchema = new mongoose.Schema({
    res_id: {
        type: String,
        default: uuid
    },
    res_subject: {
        type: String
    },
    res_fk_test_id: {
        type: testSchema
    },
    res_obtained_marks: {
        type: Number,
        required: true,
    },
    res_output: {
        type: String,
        required: true,
        enum: ['Pass', 'Fail']
    },
    res_percentage: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const result = mongoose.model('result', resultSchema);

module.exports = result;
