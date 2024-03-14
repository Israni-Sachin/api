const mongoose = require('mongoose');

const { userIdSchema } = require('./common.model');

const attendenceSchema = new mongoose.Schema({
    atten_id: {
        type: String,
        default: 'jj' //uuid
    },
    atten_fk_user_id: {
        type: userIdSchema
    },
    atten_date: {
        type: String
    },
    atten_isPresent: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });



const attendence = mongoose.model('attendence', attendenceSchema);

module.exports = attendence;