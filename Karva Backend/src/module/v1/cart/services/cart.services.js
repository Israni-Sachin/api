const Cart = require('../../../../models/cart.model');
const { Products } = require('../../../../models/product.model');

const cartGet = async (user) => {

    // find cart based on user id and populate cart items
    let cart = await Cart.findOne({ cart_fk_user_id: user.id })
        .populate('cart_items.cartitm_fk_prd_id', 'prd_name prd_price prd_img prd_colors')

    // if cart does not exist then return
    if (!cart) throw new Error("CART_NOT_FOUND");

    // convert cart to json so that we can modify it without using _doc
    cart = cart.toJSON();

    // filter cart items which are not null
    cart.cart_items = cart.cart_items.filter(item => item.cartitm_fk_prd_id != null);
    cart.cart_items = cart.cart_items.filter(item => item.cartitm_prd_qty != 0);

    // giving cart total amount
    cart.cart_total_amount = cart.cart_items
    .filter(item => item.isSelected)
    .reduce((total, cartItem) => total + cartItem.cartitm_prd_qty * cartItem.cartitm_fk_prd_id.prd_price, 0);

    return cart;
}


const cartAdd = async (body, user) => {

    // give count of cart based on user id
    let count = await Cart.countDocuments({ cart_fk_user_id: user.id });

    // if count is 0 then create new cart
    if (count == 0)

        // if cart item qty is 0 then throw error
        if (body.cart_items.some(item => item.cartitm_prd_qty == 0)) {
            throw new Error('INVALID_DATA');
        }
        else {
            body.cart_items.map(item => item.cartitm_prd_qty_amount = item.price * item.cartitm_prd_qty)
            return await Cart.create({ cart_fk_user_id: user.id, cart_items: body.cart_items });
        }

    // if count is not 0 then find cart based on user id
    const cart = await Cart.findOne({ cart_fk_user_id: user.id });

    // loop through each cart item given in body
    body.cart_items.forEach(item => {

        // find if item already exists in cart
        const existingItem = cart.cart_items.find(i => i.cartitm_fk_prd_id.toString() == item.cartitm_fk_prd_id.toString());

        // if item qty is greater than 5 then throw error
        // if (item.cartitm_prd_qty > 5)
        //     throw new Error('MAX_QTY_EXCEEDED');

        // if item exists in cart then update qty
        if (existingItem) {

            // if item qty is 0 then remove item from cart
            if (item.cartitm_prd_qty == 0)
                cart.cart_items = cart.cart_items.filter(i => i.cartitm_fk_prd_id.toString() != item.cartitm_fk_prd_id.toString());
            else {
                existingItem.cartitm_prd_qty += item.cartitm_prd_qty;
                existingItem.cartitm_prd_qty_amount = item.price * existingItem.cartitm_prd_qty
                existingItem.isSelected = item.isSelected !== undefined ? item.isSelected : existingItem.isSelected;
            }

        } else {

            // if item qty is 0 then throw error
            if (item.cartitm_prd_qty == 0)
                throw new Error('INVALID_DATA');

            // if item does not exist in cart then add item to cart
            cart.cart_items.push({
                cartitm_fk_prd_id: item.cartitm_fk_prd_id,
                cartitm_prd_qty: item.cartitm_prd_qty,
                cartitm_prd_qty_amount: item.price * item.cartitm_prd_qty,
                additional_info:item.additional_info,
                isSelected: item.isSelected ?? true
            });
        }
    });

    // save cart
    await cart.save();
}


const updateIsSelected = async (user, productId, isSelected) => {
    const cart = await Cart.findOne({ cart_fk_user_id: user.id });
    if (!cart) throw new Error('CART_NOT_FOUND');

    const cartItem = cart.cart_items.find(item => item.cartitm_fk_prd_id.toString() === productId);
    if (!cartItem) throw new Error('ITEM_NOT_FOUND');

    cartItem.isSelected = isSelected;
    await cart.save();
};

const cartDelete = async (user, data) => {

    // find cart based on user id and remove cart items
    return await Cart.findOneAndUpdate({ cart_fk_user_id: user.id },
        { $pull: { cart_items: { cartitm_fk_prd_id: { $in: data.cart_items } } } },
        { new: true })
        .populate('cart_items.cartitm_fk_prd_id', 'prd_name prd_price prd_img prd_colors');

}
module.exports = { cartGet, cartAdd, cartDelete ,updateIsSelected};



