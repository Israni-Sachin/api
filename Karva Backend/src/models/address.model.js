const mongoose = require('mongoose');

const addressItemSchema = new mongoose.Schema({
    pincode: {
        type: Number,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    country: {
        type: String,
    },
    locality: {
        type: String,
    },
    flat_no: {
        type: String,
    },
    type_of_address: {
        type: String
    },
    default_address: {
        type: Boolean
    },
    first_name:{
        type:String
    },
    last_name:{
        type:String
    },
    email:{
        type:String
    },
    mobile_number:{
        type:String
    },
    street_area:{
        type:String
    }
});

const addressSchema = new mongoose.Schema({
    address_fk_user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    address_details: [addressItemSchema]
}, { timestamps: true });



const Address = mongoose.model('Address', addressSchema);

module.exports = Address;