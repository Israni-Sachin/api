// const categorys = require("../../../../models/category.model");
const categorys = require('../../../../models/category.model');

const categoryGet = async (body, user) => {

    let category = await categorys.find({});
    return category;

}

const categoryGetBySearch = async (body, user) => {

    let conditions = {
        prd_name: { $regex: new RegExp(body.search, "i") },
    }

    console.log(conditions);

    let categorys = await categorys.find(conditions)


}

// const categoryGetBySlug = async (data) => {
//     return await categorys.findOne({ prd_slug: data.prd_slug });
// }

const categoryAdd = async (data) => {

    let check = await categorys.findOne({ cat_name: data.cat_name });
    if (check)
        throw new Error("ALREADY_EXISTS");

    data.cat_slug = data.cat_name.toLowerCase().replaceAll(" ", "-");

    await categorys.create(data);

}

const subCategoryAdd = async (data) => {

    let category = await categorys.findOne({ cat_name: data.cat_name });
    if (!category)
        throw new Error("CATEGORY_NOT_FOUND");

    category.subcategories.push(data.subCategory);
    await category.save();

    // await categorys.create(data);

}

const categoryUpdate = async (data, params) => {

    let count = await categorys.countDocuments({ _id: params.prd_id });
    if (count == 0)
        throw new Error("DATA_NOT_FOUND");

    // let check = await categorys.countDocuments({ _id: { $ne: data.prd_id }, prd_name: data.prd_name, prd_price: data.prd_price });
    // if (check)
    //     throw new Error("ALREADY_EXISTS");
    if (data.prd_name) {
        data.prd_slug = data.prd_name.toLowerCase().replaceAll(" ", "-")
    }

    await categorys.updateOne({ _id: params.prd_id }, { ...data });

}

const categoryDelete = async (data) => {

    await categorys.findOneAndDelete({ _id: data.prd_id })  // soft delete or hard delete

}

module.exports = { categoryGet, categoryAdd, categoryUpdate, categoryDelete, subCategoryAdd };

