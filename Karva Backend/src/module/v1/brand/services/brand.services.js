const brand = require('../../../../models/brand.model');

const brandGet = async (body, user) => {

    let result = await brand.find({});
    return result;

}

const brandGetBySlug = async (data) => {
    return await brand.findOne({ brand_name: data.brand_name });
}

const brandAdd = async (data) => {

    let check = await brand.findOne({ brand_name: data.brand_name });
    if (check)
        throw new Error("ALREADY_EXISTS");

    data.brand_slug = data.brand_name.toLowerCase().replaceAll(" ", "-");

    await brand.create(data);

}

const brandUpdate = async (data, params) => {

    let details = await brand.findOne({ _id: params.brand_id });
    if (!details) {
        throw new Error("DATA_NOT_FOUND");
    }

    let check = await brand.findOne({ _id: { $ne: params.brand_id }, brand_name: data.brand_name });
    if (check) {
        throw new Error("ALREADY_EXISTS");
    }

    if (data.brand_name != details.brand_name) {
        data.brand_slug = data.brand_name.toLowerCase().replaceAll(" ", "-")
    }

    await brand.updateOne({ _id: params.brand_id }, { ...data });

}

const brandDelete = async (data) => {

    await brand.findOneAndDelete({ _id: data.brand_id })

}

module.exports = { brandGet, brandAdd, brandGetBySlug, brandUpdate, brandDelete };

