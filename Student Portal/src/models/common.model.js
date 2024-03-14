const { Schema } = require('mongoose');


const userIdSchema = new Schema({
    user_id: {
        type: String,
        trim: true
    },
}, { _id: false });

const userSchema = new Schema({
    user_id: {
        type: String,
        trim: true
    },
    user_fname: {
        type: String,
        trim: true
    },
    user_lname: {
        type: String,
        trim: true
    },
    user_email: {
        type: String,
        trim: true
    },
    user_phone: {
        type: String,
        trim: true
    },
    user_class: {
        type: String,
        trim: true
    }
}, { _id: false });

const testSchema = new Schema({
    test_id: {
        type: String,
        default: 'jj' //uuid
    },
    test_subject: {
        type: String
    },
    test_date: {
        type: Date,
        required: true,
    },
    test_time: {
        type: String,
        required: true,
        example: '30 mins'
    },
    tes_total_marks: {
        type: Number,
        required: true,
    },
    test_passing_marks: {
        type: Number,
        required: true,
    },
    test_class: {
        type: String,
        required: true,
    }
})

// tution timing , review about student by teacher
module.exports = {
    userSchema, userIdSchema,testSchema
}