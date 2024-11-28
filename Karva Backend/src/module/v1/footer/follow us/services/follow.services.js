const follow = require('../../../../../models/footer/follow.model');

const followGet = async () => {

    let result = await follow.find({});
    return result;

}

const followAdd = async (data) => {

    let check = await follow.find({});

    if (check.length != 0)
        await follow.findByIdAndUpdate({ _id: check[0]._id }, data);
    else
        await follow.create(data);

}

module.exports = { followGet, followAdd };