const { Schema } = require('mongoose');

const featureSchema = new Schema({
    title: {
        type: String,
        trim: true
    },
    features_desc: {
        type: Object
    }
}, { _id: false });


module.exports = {
    featureSchema
}