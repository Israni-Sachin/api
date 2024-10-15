const categoryServices = require('../services/category.services');
const { successResponse, errorResponse } = require('../../../../helpers/http-response');

const cateGet = async (req, res) => {
    try {
        let result = await categoryServices.cateGet(req.user);
        successResponse({ res, message: 'Category fetched successfully', data: result });

    } catch (err) {
        errorResponse(res, err);
    }
}

const cateAdd = async (req, res) => {
    try {
        await categoryServices.cateAdd(req.body);
        successResponse({ res, message: "Category added successfully" });

    } catch (err) {
        errorResponse(res, err);
    }
}



// const productUpdate = async (req, res) => {
//     try {
//         let body = req.body;
//         await categoryServices.productUpdate(body);
//         successResponse({ res, message: "Product updated successfully" });

//     } catch (error) {
//         errorResponse(res, err);
//     }
// }

// const productDelete = async (req, res) => {
//     try {
//         let body = req.body;
//         await categoryServices.productDelete(body);
//         successResponse({ res, message: "Product deleted successfully" });

//     } catch (error) {
//         errorResponse(res, err);
//     }
// }

// module.exports = { cateGet, productAdd, productUpdate, productDelete };
module.exports = { cateGet ,cateAdd};