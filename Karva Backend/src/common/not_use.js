async function parseSearchQuery(query) {
    const filters = {};
    query = query.toLowerCase();

    // Extract the brand names (nike, puma)
    const brandName = await Products.distinct('prd_brand_name');
    // const brandRegex = new RegExp(brandName.join('|'), 'gi')

    // const brands = query.match(/(nike|puma|adidas|reebok)/gi); // Add more brands as needed

    // const brands = query.match(brandRegex);
    const bestMatch = fuzzball.extract(query, brandName);
    // console.log(bestMatch);
    const matchedBrand = [bestMatch[0][0]]; // The closest match
    // matchedBrand.push(bestMatch[0][0]); 
    // bestMatch.map(arr=>{
    //     if(arr[1]>50){
    //         matchedBrand.push(arr[0]);
    //     }
    // })

    // const matchedBrand = bestMatch[0][0]; // The closest match
    console.log(matchedBrand);
    if (matchedBrand) {
        // if (brands) {
        const brandRegexes = matchedBrand.map(name => new RegExp(`^${name}$`, 'i'));
        // const brandRegexes = brands.map(name => new RegExp(`^${name}$`, 'i'));
        filters.prd_brand_name = { $in: brandRegexes };
    }

    // Extract the product names
    const prdName = await Products.distinct('prd_name');
    // const prdRegex = new RegExp(`\\b(${prdName.join('|')})\\b`, 'gi')
    // const brands = query.match(/(nike|puma|adidas|reebok)/gi); // Add more brands as needed
    // const prds = query.match(prdRegex);
    const bestMatch1 = fuzzball.extract(query, prdName);
    const matchedBrand1 = [bestMatch1[0][0]]; // The closest match

    if (matchedBrand1) {
        const prdRegexes = matchedBrand1.map(name => new RegExp(`^${name}$`, 'i'));
        // const prdRegexes = prds.map(name => new RegExp(`^${name}$`, 'i'));
        filters.prd_name = { $in: prdRegexes };
    }

    // Extract the product type category (shoes)
    const catName = await Products.distinct('prd_category');
    // const catRegex = new RegExp(`\\b(${catName.join('|')})\\b`, 'gi')
    // const catType = query.match(/shoes|clothing|accessories/gi);
    // const cats = query.match(catRegex);
    const bestMatch2 = fuzzball.extract(query, catName);
    const matchedBrand2 = [bestMatch2[0][0]]; // The closest match

    if (matchedBrand2) {
        const categoryRegexes = matchedBrand2.map(name => new RegExp(`^${name}$`, 'i'));
        // const categoryRegexes = cats.map(category => new RegExp(`^${category}$`, 'i'));
        filters.prd_category = { $in: categoryRegexes };
    }

    // // Extract the product type sub category
    // const subcatName = await Products.distinct('prd_sub_category');
    // // const subcatRegex = new RegExp(subcatName.join('|'), 'gi')
    // // const subcatRegex = new RegExp(`\\b(${subcatName.join('|')})\\b`, 'gi')
    // // const catType = query.match(/shoes|clothing|accessories/gi);
    // // const subcats = query.match(subcatRegex);
    // const bestMatch3 = fuzzball.extract(query, subcatName);
    // const matchedBrand3 = [bestMatch3[0][0]]; // The closest match

    // if (matchedBrand3) {
    //     const subcatRegexes = matchedBrand3.map(name => new RegExp(`^${name}$`, 'i'));
    //     filters.prd_sub_category = { $in: subcatRegexes };
    // }

    // Extract gender (mens or womens)
    const genderName = ['Men', 'Women']
    // const gender = query.match(/mens|womens|men|women/gi);
    const bestMatch4 = fuzzball.extract(query, genderName);
    const matchedBrand4 = [bestMatch4[0][0]]; // The closest match

    if (matchedBrand4) {
        const gender = matchedBrand4.map(name => new RegExp(`^${name}$`, 'i'));
        // filters.prd_gender = gender[0].toLowerCase().includes("mens") ? "mens" : "womens";
        filters.prd_gender = { $in: gender };
    }

    //  Get all distinct color names
    const colorNames = await Products.distinct('prd_colors.color_name');

    //  Create a regular expression for matching color names
    // const colorRegex = new RegExp(`\\b(${colorNames.join('|')})\\b`, 'gi');

    //  Match query against the color regex
    // const colors = query.match(colorRegex);
    const bestMatch5 = fuzzball.extract(query, colorNames);
    const matchedBrand5 = [bestMatch5[0][0]]; // The closest match

    //  Apply the color filter if there are any matches
    if (matchedBrand5) {
        const colors = matchedBrand5.map(name => new RegExp(`^${name}$`, 'i'));
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