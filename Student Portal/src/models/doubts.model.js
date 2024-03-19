const mongoose = require('mongoose');
const { userIdSchema } = require('./common.model');

const doubtsSchema = new mongoose.Schema({
    dt_topic: {
        type: String,
        required: true,
    },
    dt_desc: {
        type: String,
        required: true,
    },
    dt_isAnswerd: {
        type: Boolean,
    },
    dt_answer: {
        type: String,
    },
    dt_fk_user_id: {
        type: userIdSchema
    }

}, { timestamps: true });

const doubts = mongoose.model('doubts', doubtsSchema);

module.exports = doubts