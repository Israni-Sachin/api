const aboutUs = require('../../../../../models/footer/about-us.model');

const aboutUsGet = async () => {

    let result = await aboutUs.find({});
    return result;

}

const aboutUsAdd = async (data) => {

    let check = await aboutUs.find({});

    if (check.length != 0)
        await aboutUs.findByIdAndUpdate({ _id: check[0]._id }, data);
    else
        await aboutUs.create(data);

}

module.exports = { aboutUsGet, aboutUsAdd };