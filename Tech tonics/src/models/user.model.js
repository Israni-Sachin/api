const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    user_email: {
        type: String,
        required: true,
    },
    user_pass: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const Users = mongoose.model('User', userSchema);

module.exports = Users;
