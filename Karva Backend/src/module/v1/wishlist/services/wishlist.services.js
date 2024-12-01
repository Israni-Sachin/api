const Wish = require('../../../../models/wishlist.model');

const wishGet = async (user) => {

    // find wishlist based on user id
    let wish = await Wish.findOne({ wish_fk_user_id: user.id })
        .populate('wish_items.wishitm_fk_prd_id')

    // if wish does not exist then return
    if (!wish) throw new Error("WISHLIST_IS_EMPTY");

    return wish;
}


const wishAdd = async (body, user) => {

    // give count of wishlist based on user id
    let count = await Wish.countDocuments({ wish_fk_user_id: user.id });

    // if count is 0 then create new wishlist
    if (count == 0)
        return await Wish.create({ wish_fk_user_id: user.id, wish_items: body.wish_items });

    // if count is not 0 then find wish based on user id
    const wish = await Wish.findOne({ wish_fk_user_id: user.id });

    // loop through each wish item given in body
    body.wish_items.forEach(item => {

        // find if item already exists in wish
        const existingItem = wish.wish_items.find(i => i.wishitm_fk_prd_id.toString() == item.wishitm_fk_prd_id.toString());

        // if item does not exists in wishlist then add item to wishlist
        if (!existingItem) {

            wish.wish_items.push({
                wishitm_fk_prd_id: item.wishitm_fk_prd_id
            });

        } else {
            throw new Error('WISH_ITEM_ALREADY_EXISTS')
        }
    });

    await wish.save();
}

const wishDelete = async (user, data) => {

    // find wish based on user id and remove wish items
    return await Wish.findOneAndUpdate({ wish_fk_user_id: user.id },
        { $pull: { wish_items: { wishitm_fk_prd_id: { $in: data.wish_items } } } },
        { new: true })
        .populate('wish_items.wishitm_fk_prd_id');

}

module.exports = { wishGet, wishAdd, wishDelete };



