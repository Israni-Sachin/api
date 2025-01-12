const { Products, updateOverallQuantity } = require("../../../../models/product.model");
const Ratings = require("../../../../models/ratings.model");
const Users = require("../../../../models/user.model");

const productGet = async (body, user) => {

    // Set default values for page and limit if not provided in request
    const page = parseInt(body.page) || 1; // Default to page 1
    const limit = parseInt(body.limit) || 10; // Default to 10 items per page
    const sort = body.sort || { createdAt: -1 }; // Default sort by creation date descending
    let filters = body.filters || {}; // Optional filters

    // Calculate the number of documents to skip
    const skip = (page - 1) * limit;

    if (body.filters) {

        if (body.filters.end_price) {
            filters.prd_price = { $gte: body.filters.start_price, $lte: body.filters.end_price }
            delete filters.start_price
            delete filters.end_price
        }

        if (body.filters.selected_colors) {
            // filters.prd_colors = {
            //     color_name: { $all: filters.selected_colors }
            // }
            const query = {
                "prd_colors.color_name": { $in: filters.selected_colors }
            };
            filters.query = query
            delete filters.selected_colors
        }

        if (body.filters.sizes) {
            // filters.prd_sizes = { $in: body.filters.sizes };
            filters.prd_sizes = {
                $elemMatch: {
                    number: { $in: filters.sizes }
                }
            }
            delete filters.sizes;
        }
    }

    // Find and paginate products with optional filters and sorting
    if (filters.query) {
        query = filters.query;
        delete filters.query;
        filters = { ...filters, ...query }
    }
    const products = await Products.find(filters)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .populate('prd_reviews.id');


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

const productGetById = async (data) => {

    return await Products.findById(data);

}

// async function parseSearchQuery(query) {
//     const filters = {};
//     query = query.toLowerCase();

//     // Extract the brand names (nike, puma)
//     const brandName = await Products.distinct('prd_brand_name');
//     // console.log(brandName);

//     // const brandRegex = new RegExp(`/(${brandName.join('|')})/`, 'gi')
//     const brandRegex = new RegExp(`\\b(${brandName.join('|')})\\b`, 'gi');
//     // console.log(brandRegex);
//     // const brands = query.match(/(nike|puma|adidas|reebok)/gi); // Add more brands as needed
//     const brands = query.match(brandRegex);
//     console.log(brands)
//     if (brands) {
//         const brandRegexes = brands.map(name => new RegExp(`^${name}$`, 'i'));
//         filters.prd_brand_name = { $in: brandRegexes };
//     }
//     // filters.prd_brand_name = brandName.filter(v => v.includes(inputValue.toLowerCase()))
//     // console.log(filters);

//     // Extract the product names
//     const prdName = await Products.distinct('prd_name');
//     const prdRegex = new RegExp(`\\b(${prdName.join('|')})\\b`, 'gi')
//     // const brands = query.match(/(nike|puma|adidas|reebok)/gi); // Add more brands as needed
//     const prds = query.match(prdRegex);
//     if (prds) {
//         const prdRegexes = prds.map(name => new RegExp(`^${name}$`, 'i'));
//         filters.prd_name = { $in: prdRegexes };
//     }

//     // Extract the product type category (shoes)
//     const catName = await Products.distinct('prd_category');
//     const catRegex = new RegExp(`\\b(${catName.join('|')})\\b`, 'gi')
//     // const catType = query.match(/shoes|clothing|accessories/gi);
//     const cats = query.match(catRegex);
//     if (cats) {
//         const categoryRegexes = cats.map(category => new RegExp(`^${category}$`, 'i'));
//         filters.prd_category = { $in: categoryRegexes };
//     }

//     // Extract the product type sub category
//     const subcatName = await Products.distinct('prd_sub_category');
//     // const subcatRegex = new RegExp(subcatName.join('|'), 'gi')
//     const subcatRegex = new RegExp(`\\b(${subcatName.join('|')})\\b`, 'gi')
//     // const catType = query.match(/shoes|clothing|accessories/gi);
//     const subcats = query.match(subcatRegex);
//     if (subcats) {
//         const subCategoryRegexes = subcats.map(category => new RegExp(`^${category}$`, 'i'));
//         filters.prd_sub_category = { $in: subCategoryRegexes };
//     }

//     // Extract gender (mens or womens)
//     const gender = query.match(/mens|womens|men|women/gi);
//     if (gender) {
//         // filters.prd_gender = gender[0].toLowerCase().includes("mens") ? "mens" : "womens";
//         const genderR = gender.map(category => new RegExp(`^${category}$`, 'i'));
//         filters.prd_gender = { $in: genderR };
//     }

//     //  Get all distinct color names
//     const colorNames = await Products.distinct('prd_colors.color_name');

//     //  Create a regular expression for matching color names
//     const colorRegex = new RegExp(`\\b(${colorNames.join('|')})\\b`, 'gi');

//     //  Match query against the color regex
//     const colors = query.match(colorRegex);

//     //  Apply the color filter if there are any matches
//     if (colors.length > 0 && (colors.filter(c => c != "")).length > 0) {
//         const colorR = colors.map(category => new RegExp(`^${category}$`, 'i'));
//         filters.prd_colors = {
//             $elemMatch: {
//                 color_name: { $in: colorR }
//             }
//         };
//     }


//     // Extract price range (between 1000 to 8000)
//     const priceRange = query.match(/(between (\d+) to (\d+))|(under (\d+))|(above (\d+))|(\d+)/gi);

//     if (priceRange) {
//         let minPrice = null;
//         let maxPrice = null;

//         // Handle "between X to Y"
//         if (priceRange[2] && priceRange[3]) {
//             minPrice = parseInt(priceRange[2], 10);
//             maxPrice = parseInt(priceRange[3], 10);
//         }
//         // Handle "under X"
//         if (priceRange[5]) {
//             maxPrice = parseInt(priceRange[4], 10);
//         }
//         // Handle "above X"
//         if (priceRange[7]) {
//             minPrice = parseInt(priceRange[6], 10);
//         }
//         // Handle "X"
//         if (priceRange[8]) {
//             maxPrice = parseInt(priceRange[6], 10);
//         }

//         // Apply the filters based on the parsed price range
//         if (minPrice !== null && maxPrice !== null) {
//             filters.prd_price = { $gte: minPrice, $lte: maxPrice };
//         } else if (minPrice !== null) {
//             filters.prd_price = { $gte: minPrice };
//         } else if (maxPrice !== null) {
//             filters.prd_price = { $lte: maxPrice };
//         }
//     }



//     // const query = "puma shoes for womens and adidas clothing under 3000";
//     // const brandArray = ['nike', 'puma', 'adidas', 'reebok'];
//     // const brandRegex = new RegExp(brandArray.join('|'), 'gi');
//     // const brands = query.match(brandRegex);

//     // Use distinct to get unique category names from the prd_category field
//     // const categories = await Products.distinct('prd_category');

//     return filters;
// }

async function parseSearchQuery(query) {
    const filters = {};
    // query = query.toLowerCase();

    // Get all distinct values needed for filtering in one batch
    const [brandNames, prdNames, catNames, subcatNames, colorNames] = await Promise.all([
        Products.distinct('prd_brand_name'),
        Products.distinct('prd_name'),
        Products.distinct('prd_category'),
        Products.distinct('prd_sub_category'),
        Products.distinct('prd_colors.color_name')
    ]);

    // Function to create fuzzy regex filters
    const createFuzzyRegexFilter = (distinctValues, query) => {
        if (!distinctValues || distinctValues.length === 0) return [];

        // Handle extra characters: match query with any characters (.*) between the letters
        const fuzzyQuery = query.split('').join('.*'); // e.g., "nike" => "n.*i.*k.*e"

        // Add an additional ".*" at the end to account for extra characters (e.g., "nikeeee")
        const regex = new RegExp(fuzzyQuery + '.*', 'gi'); // Case-insensitive, global match
        console.log(regex);

        const matches = distinctValues.filter(value => value.toLowerCase().match(regex));
        console.log(matches);

        return matches.map(value => new RegExp(`^${value}$`, 'i')); // Add exact match with case insensitivity
    };

    // Extract brand names
    // const brands = createFuzzyRegexFilter(brandNames, query);
    // if (brands.length > 0) {
    //     filters.prd_brand_name = { $in: brands };
    // }

    // Extract product names
    // const prds = createFuzzyRegexFilter(prdNames, query);
    // if (prds.length > 0) {
    filters.prd_name = query;
    // }

    // Extract product categories
    // const cats = createFuzzyRegexFilter(catNames, query);
    // if (cats.length > 0) {
    //     filters.prd_category = { $in: cats };
    // }

    // // Extract product subcategories
    // const subcats = createFuzzyRegexFilter(subcatNames, query);
    // if (subcats.length > 0) {
    //     filters.prd_sub_category = { $in: subcats };
    // }

    // // Extract gender
    // const gender = query.match(/mens|womens|men|women/gi);
    // if (gender) {
    //     const genderR = gender.map(category => new RegExp(`^${category}$`, 'i'));
    //     filters.prd_gender = { $in: genderR };
    // }

    // Extract colors
    // const colors = createFuzzyRegexFilter(colorNames, query);
    // if (colors.length > 0 && (colors.filter(c => c != "")).length > 0 && colorNames.length > 0) {
    //     filters.prd_colors = { $elemMatch: { color_name: { $in: colors } } };
    // }

    // Extract price range (between 1000 to 8000, under 1000, above 500)
    const priceRange = query.match(/(between (\d+) to (\d+))|(under (\d+))|(above (\d+))|(\d+)/gi);
    if (priceRange) {
        let minPrice = null;
        let maxPrice = null;

        // Handle "between X to Y"
        if (priceRange[2] && priceRange[3]) {
            minPrice = parseInt(priceRange[2], 10);
            maxPrice = parseInt(priceRange[3], 10);
        }
        // Handle "under X"
        if (priceRange[5]) {
            maxPrice = parseInt(priceRange[4], 10);
        }
        // Handle "above X"
        if (priceRange[7]) {
            minPrice = parseInt(priceRange[6], 10);
        }
        // Handle "X" (single value)
        if (priceRange[8]) {
            maxPrice = parseInt(priceRange[6], 10);
        }

        // Apply the filters based on the parsed price range
        if (minPrice !== null && maxPrice !== null) {
            filters.prd_price = { $gte: minPrice, $lte: maxPrice };
        } else if (minPrice !== null) {
            filters.prd_price = { $gte: minPrice };
        } else if (maxPrice !== null) {
            filters.prd_price = { $lte: maxPrice };
        }
    }

    return filters;
}


const productGetBySearch = async (body) => {

    let filters = await parseSearchQuery(body.query)
    console.log(filters);

    if (body.id) {

        let user = await Users.find({ _id: body.id });
        if (!user[0].user_srch_history.includes(body.query)) {
            user[0].user_srch_history.push(body.query);
            newData = user[0].user_srch_history
            await Users.updateOne({ _id: body.id }, { user_srch_history: newData });
        }
    }

    if (Object.keys(filters).length == 0) {
        throw new Error("DATA_NOT_FOUND");
    }

    // let products = await Promise.all([
    //     Products.find({ prd_brand_name: filters.prd_brand_name }),
    //     Products.find({ prd_name: filters.prd_name }),
    //     Products.find({ prd_category: filters.prd_category }),
    //     Products.find({ prd_sub_category: filters.prd_sub_category }),
    //     Products.find({ 'prd_colors.color_name': filters.prd_colors })
    // ]);
    // products = products.flat();
    // const uniqueProducts = products.reduce((acc, product) => {
    //     // Check if the product with the same _id already exists in the accumulator
    //     if (!acc.some(existingProduct => existingProduct._id === product._id)) {
    //         acc.push(product);
    //     }
    //     return acc;
    // }, []); 


    // products = products.filter(products => products);
    // let products = await Products.find(filters).populate('prd_reviews');
    let products = await Products.find({}).populate('prd_reviews');
    console.log(filters);
    const regex = new RegExp(body.query, 'i');
    products = products.filter(v => regex.test(v.prd_name));

    if (!products) {
        throw new Error("DATA_NOT_FOUND");
    }

    return { products, filters, len: products.length };

}


const productAdd = async (data) => {

    // let check = await Products.findOne({ prd_name: data.prd_name });
    // if (check)
    //     throw new Error("ALREADY_EXISTS");

    data.prd_slug = data.prd_name.toLowerCase().replaceAll(" ", "-");
    // console.log(data);

    data = await updateOverallQuantity(data);

    await Products.create(data);

}

const productUpdate = async (data, params) => {

    let details = await Products.findOne({ _id: params.prd_id });
    if (!details) {
        throw new Error("DATA_NOT_FOUND");
    }

    // let check = await Products.findOne({ _id: { $ne: params.prd_id }, prd_name: data.prd_name });
    // if (check) {
    //     throw new Error("ALREADY_EXISTS");
    // }

    if (data.prd_name != details.prd_name) {
        data.prd_slug = data.prd_name.toLowerCase().replaceAll(" ", "-")
    }

    data = await updateOverallQuantity(data);

    await Products.updateOne({ _id: params.prd_id }, data);

}

const productDelete = async (data) => {

    await Products.findOneAndDelete({ _id: data.prd_id });

}

const ratingGet = async () => {

    return await Ratings.find({});

}

const ratingGetByVisible = async () => {

    return await Ratings.find({ isVisible: true });

}

const ratingUpdateByVisible = async (data) => {

    return await Ratings.updateMany({ _id: { $in: data.ids } }, { isVisible: data.value });

}


const ratingGetById = async (data) => {

    return await Ratings.findById(data);

}

const ratingAdd = async (data, user) => {

    data.user_rating.user = user.id;

    console.log("this is data", data, "and this is my user", user)

    const newRating = await Ratings.create(data.user_rating);

    await Products.updateOne(
        { _id: data.prd_id },
        { $push: { prd_reviews: { id: newRating._id } } }
    );

    console.log('New rating added successfully!');

}

const ratingUpdate = async (id, data) => {

    let rating = await Ratings.findOneAndUpdate({ _id: id }, data);
    // console.log(rating);
    return rating;

}

const ratingDelete = async (id, data) => {

    let rating = await Ratings.findOneAndDelete({ _id: id });
    console.log(rating);
    await Products.findOneAndUpdate({ _id: data.prd_id },
        { $pull: { prd_reviews: { id: { $in: id } } } },
        { new: true })
    return rating;

}

const productSuggest = async (data) => {

    let data2 = await Products.find({
        // prd_category: data.prd_category, prd_sub_category: data.prd_sub_category
    })
    if (!data2) {
        throw new Error("DATA_NOT_FOUND");
    }
    // Filter products where the name includes the query
    let suggestedProducts = data2.filter(product =>
        product.prd_name.toLowerCase().includes(data.prd_name.toLowerCase())
    );

    if (!suggestedProducts) {
        suggestedProducts = data2.filter(product =>
            product.prd_category.toLowerCase().includes(data.prd_category.toLowerCase()) && product.prd_sub_category.includes(data.prd_sub_category.toLowerCase())
        );
    }

    // Filter products where the name starts with the query
    // const suggestedProducts = data2.filter(product =>
    //     product.prd_name.toLowerCase().startsWith(data.prd_name.toLowerCase()));
    // // Sort products by price in ascending order
    // suggestedProducts.sort((a, b) => a.prd_price - b.prd_price);
    // // Limit the number of products to 10
    // suggestedProducts.slice(0, 10);
    // // Remove duplicate products
    // suggestedProducts = [...new Set(suggestedProducts)];
    // // Remove products that are already in the user's wishlist
    // const user = await Users.find({ _id: data.user_id });
    // suggestedProducts = suggestedProducts.filter(product =>!user[0].user_wish_list.includes(product._id));
    // // Remove products that are out of stock
    // suggestedProducts = suggestedProducts.filter(product => product.prd_quantity > 0);

    return suggestedProducts;
    // await Products.findOneAndDelete({ _id: data.prd_id });

}

const productBulkDelete = async (data) => {
    return await Products.deleteMany({ _id: { $in: data.ids } });
}

const productDiscountAdd = async (data) => {
    let filters={};
    if(data.category) filters.category = data.category
    if(data.sub_category) filters.sub_category = data.sub_category
    
}

module.exports = {
    productGet, productGetById, productAdd, productUpdate, productDelete, productGetBySearch, productSuggest, productBulkDelete,
    ratingGet, ratingAdd, ratingGetById, ratingUpdate, ratingDelete, ratingGetByVisible, ratingUpdateByVisible
};


// function parseSearchQuery(query) {
//     const filters = {};

//     // Split the query by spaces and identify different parts
//     const parts = query.toLowerCase().split(' ');

//     // Parse price
//     let priceCondition;
//     const priceIndex = parts.findIndex(part => part === 'under' || part === 'between' || part === 'above');
//     if (priceIndex !== -1) {
//         const priceKeyword = parts[priceIndex]; // "under", "above", or "between"
//         if (priceKeyword === 'under') {
//             filters.prd_price = { $lte: parseFloat(parts[priceIndex + 1]) };
//         } else if (priceKeyword === 'above') {
//             filters.prd_price = { $gte: parseFloat(parts[priceIndex + 1]) };
//         } else if (priceKeyword === 'between') {
//             filters.prd_price = {
//                 $gte: parseFloat(parts[priceIndex + 1]),
//                 $lte: parseFloat(parts[priceIndex + 2]),
//             };
//         }
//     }

//     // Parse brand name (assuming brand is the first word)
//     const brand = parts.find(part => part !== 'for' && part !== 'men' && part !== 'women' && part !== 'under' && part !== 'above' && part !== 'between' && !isNaN(part));
//     if (brand) filters.prd_brand_name = { $regex: brand, $options: 'i' };

//     // Parse category and subcategory (simplified assumption for example)
//     const categoryIndex = parts.findIndex(part => part === 'shoes' || part === 'clothing' || part === 'accessories'); // Example categories
//     if (categoryIndex !== -1) filters.prd_category = { $regex: parts[categoryIndex], $options: 'i' };

//     // Parse gender (men/women)
//     const gender = parts.find(part => part === 'men' || part === 'women');
//     if (gender) filters.prd_gender = { $regex: gender, $options: 'i' };

//     // Return the filters
//     return filters;
// }

// const ratingAdd = async (data, user) => {

//     data.user_rating.user = user.id;
//     // const productRating = await Ratings.findOne({ rating_fk_prd_id: data.prd_id });
//     // const productRating = await Products.findOne({ prd_id: data.prd_id });

//     // if (!productRating) {

//     const newRating = await Ratings.create(data.user_rating);
//     // const newRating = new Ratings({
//     //     rating_fk_prd_id: data.prd_id,
//     //     rating_all: [data.user_rating]
//     // });
//     // idget = await newRating.save();
//     // console.log(idget._id);
//     // console.log(productRating);
//     // productRating.prd_reviews.push({ id: newRating._id });
//     await Products.updateOne(
//         { _id: data.prd_id },
//         // { _id: ObjectId("product_id"), prd_reviews: { $size: 0 } },
//         { $push: { prd_reviews: { id: newRating._id } } }
//     );


//     console.log('New rating created successfully!');

//     // } else {

//     //     productRating.rating_all.push(data.user_rating);
//     //     const idget = await productRating.save();
//     //     console.log(idget._id);

//     //     console.log('New user rating added successfully!');

//     // }


// }