const Products = require("../../../../models/product.model");

const productGet = async () => {
        return await Products.find({});
}

const productGetById = async (body) => {
        //block of code
}

const productAdd = async (body) => {
        return await Products.create(body)
}

const productUpdate = async (body) => {
        //block of code
}

const productDelete = async (body) => {
        //block of code
}

module.exports = { productGet, productGetById, productDelete, productUpdate, productAdd };
