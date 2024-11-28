const term = require('../../../../../models/footer/term-conditions.model');

const termGet = async () => {

    let result = await term.find({});
    return result;

}

const termAdd = async (data) => {

    let check = await term.find({});

    if (check.length != 0)
        await term.findByIdAndUpdate({ _id: check[0]._id }, data);
    else
        await term.create(data);

}

module.exports = { termGet, termAdd };