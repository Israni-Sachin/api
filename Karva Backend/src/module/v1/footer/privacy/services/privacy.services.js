const privacy = require('../../../../../models/footer/privacy.model');

const privacyGet = async () => {

    let result = await privacy.find({});
    return result;

}

const privacyAdd = async (data) => {

    let check = await privacy.find({});

    if (check.length != 0)
        await privacy.findByIdAndUpdate({ _id: check[0]._id }, data);
    else
        await privacy.create(data);

}

module.exports = { privacyGet, privacyAdd };