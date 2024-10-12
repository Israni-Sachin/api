const mongoose = require('mongoose');

const timerSchema = new mongoose.Schema({
    start_time: {
        type: String,
        required: true
    },
    end_time: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Timer', timerSchema);

