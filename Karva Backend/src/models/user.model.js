const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    user_fname: {
        type: String,
    },
    user_lname : {
        type: String,
    },
    user_role : {
        type: String,
        required: true,
        default: 'customer'
    },  
    user_email : {
        type: String,
        required: true,
        unique: true
    },
    user_pass : {
        type: String,
        required: true,
    },
    user_phone : {
        type: String,
        required: true
    },
    user_address : {
        type: String
    }
}
, {timestamps: true});

const Users = mongoose.model('User', userSchema);

module.exports = Users;
