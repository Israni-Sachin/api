const mongoose = require('mongoose');
const { imageSchema } = require('../../common/common-schemas');


const contactUsSchema = new mongoose.Schema({
    contactUs_fname: {
        type: String
    },
    contactUs_lname: {
        type: String
    },
    contactUs_email: {
        type: String
    },
    contactUs_subject: {
        type: String
    },
    contactUs_msg: {
        type: String
    }

}, { timestamps: true });

const contactUs = mongoose.model('contactUs', contactUsSchema);
module.exports = contactUs
