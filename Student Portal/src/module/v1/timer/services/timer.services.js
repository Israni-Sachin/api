const Timer = require('../../../../models/attendence.model');

const timerGet = async () => {
    
    return await Timer.findOne({});
}

const timerSet = async (data) => {

    await Timer.updateOne({}, data);

}

module.exports = { timerGet, timerSet }