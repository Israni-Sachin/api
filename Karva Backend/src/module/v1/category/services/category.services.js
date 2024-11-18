// const categorys = require("../../../../models/category.model");
const categorys = require('../../../../models/category.model');

const categoryGet = async (body, user) => {

    let category = await categorys.find({});
    return category;

}

const subCategoryGet = async (data) => {

    let category = await categorys.findOne({ cat_name: data.cat_name });
    return category;

}

// const categoryGetBySearch = async (body, user) => {

//     let conditions = {
//         prd_name: { $regex: new RegExp(body.search, "i") },
//     }

//     console.log(conditions);

//     let categorys = await categorys.find(conditions)


// }

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

    // if (category)
    //     throw new Error("ALREADY_EXISTS");
    //sub cat check for same sub cat pending

    category.subcategories.push(data.subCategory);
    await category.save();

    // await categorys.create(data);

}

const categoryUpdate = async (data, params) => {

    let count = await categorys.countDocuments({ _id: params.cat_id });
    if (count == 0)
        throw new Error("DATA_NOT_FOUND");

    if (data.cat_name) {
        data.cat_slug = data.cat_name.toLowerCase().replaceAll(" ", "-")
    }

    await categorys.updateOne({ _id: params.cat_id }, { ...data });

}

const subCategoryUpdate = async (data) => {

    let count = await categorys.findOne({ _id: data.cat_id });
    if (count == 0)
        throw new Error("DATA_NOT_FOUND");

    if (data.data.subcat_name) {
        data.data.subcat_slug = data.data.subcat_name.toLowerCase().replaceAll(" ", "-")
    }

    result = count.subcategories.map((v, i, arr) => {
        if (v._id == data.sub_cat_id) {
            v.sub_cat_name=data.data.sub_cat_name;
            // v.sub_cat_description=data.data.sub_cat_description;
            v.sub_cat_imageUrl=data.data.sub_cat_imageUrl;
        }
        return v;
    })
    console.log(count);
    console.log(result);
    
    await categorys.updateOne({ _id: data.cat_id }, count);

}

const categoryDelete = async (data) => {

    await categorys.findOneAndDelete({ _id: data.cat_id })

}

const subCategoryDelete = async (data) => {

    const result = await categorys.findOneAndUpdate(
        { _id: data.cat_id },
        { $pull: { subcategories: { _id: data.subcat_id } } },
        { new: true } // Return the updated document
    );
    return result;

}

module.exports = { categoryGet, categoryAdd, categoryUpdate, categoryDelete, subCategoryAdd, subCategoryGet, subCategoryDelete, subCategoryUpdate };

