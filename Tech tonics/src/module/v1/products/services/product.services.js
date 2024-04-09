const Products = require("../../../../models/product.model");

const productGet = async () => {
        // let products = await Products.find({});

        // // Function to populate data with categories and sub-categories
        // function populateDataWithCategories(data) {
        //         const categories = {};

        //         data.forEach(product => {
        //                 const category = product.category;
        //                 const subCategory = product.sub_category;

        //                 if (!categories[category]) {
        //                         categories[category] = {};
        //                 }

        //                 if (!categories[category][subCategory]) {
        //                         categories[category][subCategory] = [];
        //                 }

        //                 categories[category][subCategory].push(product);
        //         });

        //         return categories;
        // }

        // const populatedData = populateDataWithCategories(products);
        // return populatedData;
        try {
                const result = await Products.aggregate([
                        {
                                $group: {
                                        _id: {
                                                category: '$category',
                                                sub_category: '$sub_category'
                                        },
                                        products: { $push: '$$ROOT' } // Push the whole document into the products array
                                }
                        },
                        {
                                $group: {
                                        _id: '$_id.category',
                                        sub_categories: {
                                                $push: {
                                                        sub_category: '$_id.sub_category',
                                                        products: '$products'
                                                }
                                        }
                                }
                        }
                ]);

                const categories = {};
                result.forEach(category => {
                        categories[category._id] = {};
                        category.sub_categories.forEach(subCategory => {
                                categories[category._id][subCategory.sub_category] = subCategory.products;
                        });
                });

                return categories;
        } catch (error) {
                console.error(error);
                throw new Error("PRODUCT_NOT_FETCH");
        }

}

const productGetById = async (body) => {
        console.log(body);
        return await Products.findById(body.id)
}

const productAdd = async (body) => {
        return await Products.create(body)
}

const productUpdate = async (body) => {
        return await Products.findOneAndUpdate({ _id: body.id }, { $set: body })
}

const productDelete = async (body) => {
        return await Products.deleteOne({ _id: body.id })
}

const productDeleteMany = async (body) => {
        return await Products.deleteMany({ _id: { $in: body.ids } })
}

module.exports = { productGet, productGetById, productDelete, productUpdate, productAdd, productDeleteMany };
