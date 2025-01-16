const Cart = require('../../../../models/cart.model');
const { Products } = require('../../../../models/product.model');
const PromoCodeCart = require('../../../../models/PromoCart.model');

const cartGet = async (user) => {

    let cart = await Cart.findOne({ cart_fk_user_id: user.id })
        .populate('cart_items.cartitm_fk_prd_id');

    if (!cart) throw new Error("CART_NOT_FOUND");


    cart = cart.toJSON();
    cart.cart_items = cart.cart_items.filter(item => item.cartitm_fk_prd_id && item.cartitm_prd_qty > 0);


    cart.cart_total_amount = cart.cart_items
        .filter(item => item.isSelected)
        .reduce((total, cartItem) => {
            let price = cartItem.cartitm_fk_prd_id.prd_price || 0;
            let qty = cartItem.cartitm_prd_qty || 0;
            return total + (price * qty);
        }, 0);


    let cartPromo = await PromoCodeCart.find({ userId: user?.id }).populate("code");

    console.log("this is cartPromo", cartPromo);
    if (cart && cart?.cart_items?.length === 0) {
        await PromoCodeCart.deleteMany({ userId });
      }
      

    let discountAmount = 0;
    if (cartPromo?.length > 0) {
        let latestPromo = cartPromo[cartPromo.length - 1]?.code;
        if (latestPromo.discountType === 'percentage') {
            discountAmount = (cart.cart_total_amount * latestPromo.discountValue) / 100;
        } else if (latestPromo.discountType === 'fixed') {
            discountAmount = latestPromo.discountValue || 0;
        }
    }
    cart.cart_total_amount -= discountAmount;
    cart.promo = discountAmount
    cart.promoOther = cartPromo[cartPromo.length - 1]?.code

    console.log("this is cart", cart);
    console.log("this is discountAmount", discountAmount);
    console.log("this is cartPromo", cartPromo[cartPromo.length - 1]);
    return cart;
};



const cartAdd = async (body, user) => {
    // Get cart count based on user ID
    let count = await Cart.countDocuments({ cart_fk_user_id: user.id });

    // If cart is empty, create a new cart
    if (count === 0) {
        // Check if any item has quantity 0
        if (body.cart_items.some(item => item.cartitm_prd_qty === 0)) {
            throw new Error('INVALID_DATA');
        }

        // Calculate total price for each item (MongoDB will auto-generate _id for each item)
        body.cart_items.map(item => {
            item.cartitm_prd_qty_amount = item.price * item.cartitm_prd_qty;
        });

        // Create a new cart for the user
        return await Cart.create({ cart_fk_user_id: user.id, cart_items: body.cart_items });
    }

    // If the user already has a cart, retrieve it
    const cart = await Cart.findOne({ cart_fk_user_id: user.id });

    body.cart_items.forEach(item => {
        // Find an existing item in the cart with the same product ID and same additional info
        const existingItem = cart.cart_items.find(i => 
            i.cartitm_fk_prd_id.toString() === item.cartitm_fk_prd_id.toString() &&
            JSON.stringify(i.additional_info) === JSON.stringify(item.additional_info)
        );

        if (existingItem) {
            // If item exists, update its quantity and other properties
            if (item.cartitm_prd_qty === 0) {
                // Remove the cart item if qty is 0
                cart.cart_items = cart.cart_items.filter(i => 
                    i._id.toString() !== existingItem._id.toString()
                );
            } else {
                // Update quantity and total amount
                existingItem.cartitm_prd_qty += item.cartitm_prd_qty;
                existingItem.cartitm_prd_qty_amount = item.price * existingItem.cartitm_prd_qty;
                existingItem.isSelected = item.isSelected !== undefined ? item.isSelected : existingItem.isSelected;
            }
        } else {
            // If item does not exist, add it as a new entry in the cart
            if (item.cartitm_prd_qty === 0) {
                throw new Error('INVALID_DATA');
            }

            cart.cart_items.push({
                cartitm_fk_prd_id: item.cartitm_fk_prd_id,
                cartitm_prd_qty: item.cartitm_prd_qty,
                cartitm_prd_qty_amount: item.price * item.cartitm_prd_qty,
                additional_info: item.additional_info,
                isSelected: item.isSelected ?? true
            });
        }
    });

    // Save the updated cart
    await cart.save();
};




const updateIsSelected = async (user, productId, isSelected) => {
    const cart = await Cart.findOne({ cart_fk_user_id: user.id });
    if (!cart) throw new Error('CART_NOT_FOUND');

    const cartItem = cart.cart_items.find(item => item._id.toString() === productId);
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



