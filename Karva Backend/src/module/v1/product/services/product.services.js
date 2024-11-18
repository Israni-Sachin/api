const { Products, updateOverallQuantity } = require("../../../../models/product.model");
const Users = require("../../../../models/user.model");

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

async function parseSearchQuery(query) {
    const filters = {};
    query = query.toLowerCase();

    // Extract the brand names (nike, puma)
    const brandName = await Products.distinct('prd_brand_name');
    console.log(brandName);
    
    // const brandRegex = new RegExp(`/(${brandName.join('|')})/`, 'gi')
    const brandRegex = new RegExp(`\\b(${brandName.join('|')})\\b`, 'gi');
    console.log(brandRegex);
    // const brands = query.match(/(nike|puma|adidas|reebok)/gi); // Add more brands as needed
    const brands = query.match(brandRegex);
    console.log(brands)
    if (brands) {
        const brandRegexes = brands.map(name => new RegExp(`^${name}$`, 'i'));
        filters.prd_brand_name = { $in: brandRegexes };
    }
    // filters.prd_brand_name = brandName.filter(v => v.includes(inputValue.toLowerCase()))
    // console.log(filters);

    // Extract the product names
    const prdName = await Products.distinct('prd_name');
    const prdRegex = new RegExp(`\\b(${prdName.join('|')})\\b`, 'gi')
    // const brands = query.match(/(nike|puma|adidas|reebok)/gi); // Add more brands as needed
    const prds = query.match(prdRegex);
    if (prds) {
        const prdRegexes = prds.map(name => new RegExp(`^${name}$`, 'i'));
        filters.prd_name = { $in: prdRegexes };
    }

    // Extract the product type category (shoes)
    const catName = await Products.distinct('prd_category');
    const catRegex = new RegExp(`\\b(${catName.join('|')})\\b`, 'gi')
    // const catType = query.match(/shoes|clothing|accessories/gi);
    const cats = query.match(catRegex);
    if (cats) {
        const categoryRegexes = cats.map(category => new RegExp(`^${category}$`, 'i'));
        filters.prd_category = { $in: categoryRegexes };
    }

    // Extract the product type sub category
    const subcatName = await Products.distinct('prd_sub_category');
    // const subcatRegex = new RegExp(subcatName.join('|'), 'gi')
    const subcatRegex = new RegExp(`\\b(${subcatName.join('|')})\\b`, 'gi')
    // const catType = query.match(/shoes|clothing|accessories/gi);
    const subcats = query.match(subcatRegex);
    if (subcats) {
        filters.prd_sub_category = { $in: subcats };
    }

    // Extract gender (mens or womens)
    const gender = query.match(/mens|womens|men|women/gi);
    if (gender) {
        // filters.prd_gender = gender[0].toLowerCase().includes("mens") ? "mens" : "womens";
        filters.prd_gender = { $in: gender };
    }

    //  Get all distinct color names
    const colorNames = await Products.distinct('prd_colors.color_name');

    //  Create a regular expression for matching color names
    const colorRegex = new RegExp(`\\b(${colorNames.join('|')})\\b`, 'gi');

    //  Match query against the color regex
    const colors = query.match(colorRegex);

    //  Apply the color filter if there are any matches
    if (colors) {
        filters.prd_colors = {
            $elemMatch: {
                color_name: { $in: colors }
            }
        };
    }


    // Extract price range (between 1000 to 8000)
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
        // Handle "X"
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



    // const query = "puma shoes for womens and adidas clothing under 3000";
    // const brandArray = ['nike', 'puma', 'adidas', 'reebok'];
    // const brandRegex = new RegExp(brandArray.join('|'), 'gi');
    // const brands = query.match(brandRegex);

    // Use distinct to get unique category names from the prd_category field
    // const categories = await Products.distinct('prd_category');

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

    let products = await Products.find(filters)
    if (!products) {
        throw new Error("DATA_NOT_FOUND");
    }

    return products;

}


const productAdd = async (data) => {

    let check = await Products.findOne({ prd_name: data.prd_name });
    if (check)
        throw new Error("ALREADY_EXISTS");

    data.prd_slug = data.prd_name.toLowerCase().replaceAll(" ", "-");

    data = await updateOverallQuantity(data);

    await Products.create(data);

}

const productUpdate = async (data, params) => {

    let details = await Products.findOne({ _id: params.prd_id });
    if (!details) {
        throw new Error("DATA_NOT_FOUND");
    }

    let check = await Products.findOne({ _id: { $ne: params.prd_id }, prd_name: data.prd_name });
    if (check) {
        throw new Error("ALREADY_EXISTS");
    }

    if (data.prd_name != details.prd_name) {
        data.prd_slug = data.prd_name.toLowerCase().replaceAll(" ", "-")
    }

    data = await updateOverallQuantity(data);

    await Products.updateOne({ _id: params.prd_id }, data);

}

const productDelete = async (data) => {

    await Products.findOneAndDelete({ _id: data.prd_id });

}

module.exports = { productGet, productAdd, productUpdate, productDelete, productGetBySearch };


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
