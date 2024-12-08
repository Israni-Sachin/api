const address = require('../../../../../models/footer/address.model');

const addressGet = async () => {

    let result = await address.find({});
    return result;

}

const addressAdd = async (data) => {

    let check = await address.find({});

    if (check.length != 0)
        await address.findByIdAndUpdate({ _id: check[0]._id }, data);
    else
        await address.create(data);

}

module.exports = { addressGet, addressAdd };