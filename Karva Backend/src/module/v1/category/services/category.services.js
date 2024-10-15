const category = require("../../../../models/product.model");

const cateGet = async (body, user) => {

    // let conditions = {
    //     prd_name: { $regex: new RegExp(body.search, "i") },
    // }

    // if (user.role == "user" || undefined || "") conditions.prd_is_visible = true;

    // let category = await category.find(conditions)
    //     .select('prd_name prd_price prd_img prd_is_visible')
    //     .skip(body.page * body.limit - body.limit).limit(body.limit);

    // let total = await category.countDocuments(conditions);
    // count = Math.ceil(total / body.limit)

    const response = await category.find({});
    return response;

}


const cateAdd = async (data) => {
    let check = await category.findOne({ cate_name: data.cate_name });
    if (check)
        throw new Error("ALREADY_EXISTS");

    await category.create(data);
}

// const productUpdate = async (data) => {

//     let count = await category.countDocuments({ _id: data.prd_id });
//     if (count == 0)
//         throw new Error("DATA_NOT_FOUND");

//     let check = await category.countDocuments({ _id: { $ne: data.prd_id }, prd_name: data.prd_name, prd_price: data.prd_price });
//     if (check)
//         throw new Error("ALREADY_EXISTS");

//     await category.updateOne({ _id: data.prd_id }, { ...data, prd_id: undefined });

// }

// const productDelete = async (data) => {

//     await category.updateMany({ _id: { $in: data.prd_ids } }, { $set: { prd_is_visible: false } })

// }

// module.exports = { cateGet, productAdd, productUpdate, productDelete };
module.exports = { cateGet, cateAdd };

