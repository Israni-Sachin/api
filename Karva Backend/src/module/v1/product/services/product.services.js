const Products = require("../../../../models/product.model");

const productGet = async (body, user) => {

    // Set default values for page and limit if not provided in request
    const page = parseInt(body.page) || 1; // Default to page 1
    const limit = parseInt(body.limit) || 10; // Default to 10 items per page
    const sort = body.sort || { createdAt: -1 }; // Default sort by creation date descending
    const filters = body.filters || {}; // Optional filters

    // Calculate the number of documents to skip
    const skip = (page - 1) * limit;

    if (body.filters) {

        if (body.filters.end_price) {
            filters.prd_price = { $gte: body.filters.start_price, $lte: body.filters.end_price }
            delete filters.start_price
            delete filters.end_price
        }

        if (body.filters.selected_colors) {
            filters.prd_colors = { $all: body.filters.selected_colors };
            delete filters.selected_colors
        }
    }

    // Find and paginate products with optional filters and sorting
    const products = await Products.find(filters)
        .sort(sort)
        .skip(skip)
        .limit(limit);


    // Count total documents matching the filters for total pages calculation
    const totalProducts = await Products.countDocuments(filters);
    const totalPages = Math.ceil(totalProducts / limit);

    return {
        currentPage: page,
        totalPages,
        totalProducts,
        products
    };

}

// const productGetBySearch = async (body, user) => {

//     let conditions = {
//         prd_name: { $regex: new RegExp(body.search, "i") },
//     }

//     console.log(conditions);

//     let products = await Products.find(conditions)
// }

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

    let details = await Products.findOne({ _id: params.prd_id });
    if (!details){
        throw new Error("DATA_NOT_FOUND");
    }

    let check = await Products.findOne({ _id: { $ne: params.prd_id }, prd_name: data.prd_name });
    if (check){
        throw new Error("ALREADY_EXISTS");
    }

    if (data.prd_name != details.prd_name) {
        data.prd_slug = data.prd_name.toLowerCase().replaceAll(" ", "-")
    }

    await Products.updateOne({ _id: params.prd_id }, { ...data });

}

const productDelete = async (data) => {

    await Products.findOneAndDelete({ _id: data.prd_id });

}

module.exports = { productGet, productAdd, productUpdate, productDelete };

