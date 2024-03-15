const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    user_id: {
        type: String,
        default: 'jj' //uuid
    },
    user_fname: {
        type: String,
        required: true,
    },
    user_lname: {
        type: String,
    },
    user_role: {
        type: String,
        required: true,
        default: 'student'
    },
    user_email: {
        type: String,
        required: true,
        unique: true
    },
    user_pass: {
        type: String,
        required: true,
    },
    user_phone: {
        type: String,
        required: true
    },
    user_dob: {
        type: String
    },
    user_class: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Users = mongoose.model('User', userSchema);

module.exports = Users;
