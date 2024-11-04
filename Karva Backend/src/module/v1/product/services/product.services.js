const Products = require("../../../../models/product.model");

const productGet = async (body, user) => {


    // if (user.role == "admin") conditions.prd_out_of_stock = true;
    let products = ""   
    if (body.category) products = await Products.find({ prd_category: body.category });
    else if (body.sub_category) products = await Products.find({ prd_sub_category: body.sub_category });
    else if (body.gender) products = await Products.find({ prd_gender: body.gender });
    else if (body.price) products = await Products.find({ prd_gender: body.gender }); // start and end object remaining
    else if (body.slug) products = await Products.find({ prd_slug: body.slug });
    // else products = await Products.find(conditions);
    else products = await Products.find();

    return products;

}

const productGetBySearch = async (body, user) => {

    let conditions = {
        prd_name: { $regex: new RegExp(body.search, "i") },
    }

    console.log(conditions);

    let products = await Products.find(conditions)


}

// const productGetBySlug = async (data) => {
//     return await Products.findOne({ prd_slug: data.prd_slug });
// }

const productAdd = async (data) => {

    let check = await Products.findOne({ prd_name: data.prd_name });
    if (check)
        throw new Error("ALREADY_EXISTS");
    data.prd_slug = data.prd_name.toLowerCase().replaceAll(" ", "-");

    await Products.create(data);

}

const productUpdate = async (data, params) => {

    let count = await Products.countDocuments({ _id: params.prd_id });
    if (count == 0)
        throw new Error("DATA_NOT_FOUND");

    // let check = await Products.countDocuments({ _id: { $ne: data.prd_id }, prd_name: data.prd_name, prd_price: data.prd_price });
    // if (check)
    //     throw new Error("ALREADY_EXISTS");
    if (data.prd_name) {
        data.prd_slug = data.prd_name.toLowerCase().replaceAll(" ", "-")
    }

    await Products.updateOne({ _id: params.prd_id }, { ...data });

}

const productDelete = async (data) => {

    await Products.findOneAndDelete({ _id: data.prd_id })  // soft delete or hard delete

}

module.exports = { productGet, productAdd, productUpdate, productDelete };

