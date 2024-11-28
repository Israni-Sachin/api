const banner = require('../../../../../models/homepage/banner.model');

const bannerGet = async () => {

    let result = await banner.find({});
    return result;

}

const bannerGetById = async (data) => {

    let result = await banner.find({ _id: data.banner_id });
    return result;

}

const bannerAdd = async (data) => {

    let check = await banner.findOne({ banner_title: data.banner_title });
    if (check)
        throw new Error("ALREADY_EXISTS");

    await banner.create(data);

}

const bannerUpdate = async (data, id) => {

    let check = await banner.findOne({ _id: id.banner_id });
    if (!check)
        throw new Error("DATA_NOT_FOUND");

    let check2 = await banner.findOne({ banner_title: id.banner_title });
    if (!check2)
        throw new Error("TITLE_ALREADY_EXISTS");

    await banner.findByIdAndUpdate({ _id: id.banner_id }, data);

}

const bannerDelete = async (data) => {

    await banner.findOneAndDelete({ _id: data.banner_id })

}

module.exports = { bannerGet, bannerGetById, bannerAdd, bannerUpdate, bannerDelete };