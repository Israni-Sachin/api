const mongoose = require('mongoose');

const { userSchema } = require('./common.model');

const attendenceSchema = new mongoose.Schema({
    atten_id: {
        type: String,
        default: uuid
    },
    atten_fk_user_id: {
        type: userSchema
    },
    atten_date: {
        type: Date,
        default: Date.now()
    },
    atten_frmt_date: {
        type: String,
        default: String(Date.now())
    },
    atten_punch_in: {
        type: String,
        required: true
    },
    atten_punch_out: {
        type: String,
        required: true
    },
}, { timestamps: true });



const attendence = mongoose.model('attendence', attendenceSchema);

module.exports = attendence;