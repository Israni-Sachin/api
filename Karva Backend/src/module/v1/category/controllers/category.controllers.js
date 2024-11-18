const categorysServices = require('../services/category.services');
const { successResponse, errorResponse } = require('../../../../helpers/http-response');

const categoryGet = async (req, res) => {
    try {
        let result = await categorysServices.categoryGet();
        successResponse({ res, message: 'category fetched successfully', data: result });

    } catch (err) {
        errorResponse(res, err);
    }
}

const subCategoryGet = async (req, res) => {
    try {
        let result = await categorysServices.subCategoryGet(req.params);
        successResponse({ res, message: 'Subcategory fetched successfully', data: result });

    } catch (err) {
        errorResponse(res, err);
    }
}

// const categoryGetBySlug = async (req, res) => {
//     try {
//         let result = await categorysServices.categoryGetBySlug(req.params);
//         successResponse({ res, message: 'category fetched successfully', data: result });

//     } catch (err) {
//         errorResponse(res, err);
//     }
// }

const categoryAdd = async (req, res) => {
    try {
        await categorysServices.categoryAdd(req.body);
        successResponse({ res, message: "category added successfully" });

    } catch (err) {
        errorResponse(res, err);
    }
}

const subCategoryAdd = async (req, res) => {
    try {
        await categorysServices.subCategoryAdd(req.body);
        successResponse({ res, message: "Sub category added successfully" });

    } catch (err) {
        errorResponse(res, err);
    }
}

const categoryUpdate = async (req, res) => {
    try {
        let body = req.body;
        await categorysServices.categoryUpdate(body, req.params);
        successResponse({ res, message: "category updated successfully" });

    } catch (err) {
        errorResponse(res, err);
    }
}

const subCategoryUpdate = async (req, res) => {
    try {
        let body = req.body;
        await categorysServices.subCategoryUpdate(body,);
        successResponse({ res, message: "Sub Category updated successfully" });

    } catch (err) {
        errorResponse(res, err);
    }
}

const categoryDelete = async (req, res) => {
    try {
        let body = req.params;
        await categorysServices.categoryDelete(body);
        successResponse({ res, message: "category deleted successfully" });

    } catch (err) {
        errorResponse(res, err);
    }
}

const subCategoryDelete = async (req, res) => {
    try {
        let result = await categorysServices.subCategoryDelete(req.body);
        successResponse({ res, message: "Subcategory deleted successfully", data: result });

    } catch (err) {
        errorResponse(res, err);
    }
}

module.exports = { categoryGet, categoryAdd, categoryUpdate, categoryDelete, subCategoryAdd, subCategoryGet, subCategoryDelete,subCategoryUpdate };