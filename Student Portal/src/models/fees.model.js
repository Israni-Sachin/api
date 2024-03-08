const mongoose = require('mongoose');

const { userSchema } = require('./common.model');

const feesSchema = new mongoose.Schema({
    fees_id: {
        type: String,
        default: uuid
    },
    fees_fk_user_id: {
        type: userSchema
    },
    fees_due_date: {
        type: Date,
        default: Date.now()
    },
    fees_structure: {
        type: String,
        example: 'monthly,quartly,half yearly,yearly'
    },
    fees_total: {
        type: String,
    },
    fees_paid: {
        type: String,
        required: true
    },
    fees_remaining: {
        type: String,
        required: true
    },
}, { timestamps: true });



const fees = mongoose.model('fees', feesSchema);

module.exports = fees;