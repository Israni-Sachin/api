const timer = require('../models/timer.model');
const moment = require('moment-timezone');

const timeValidation = async (req, res, next) => {

    let time = await timer.findOne({});
    let startTime = moment.tz(time.start_time, 'HH:mm:ss', 'Asia/kolkata'); 
    let endTime = moment.tz(time.end_time, 'HH:mm:ss', 'Asia/kolkata'); 
    let now = moment.tz('Asia/kolkata'); 

    if (now.isBetween(startTime, endTime)) {
        next();
    } else {
        return res.status(403).json({
            status: 403,
            message: 'Time is up!'
        })
    }

}

module.exports = timeValidation;