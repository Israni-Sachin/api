const promo = require('../../../../models/promo.model');
const PromoCodeUsed = require('../../../../models/promoUsed.model');
const Users = require('../../../../models/user.model');


const promoGet = async () => {

    const promoCodes = await promo.aggregate([
        {
            $group: {
                _id: '$status',
                promoCodes: { $push: "$$ROOT" },
                total: { $sum: 1 }
            }
        },
        {
            $project: {
                _id: 0, // Exclude the `_id` field from the output
                role: "$_id", // Rename `_id` to `role`
                promoCodes: 1, // Include the `users` array
                total: 1 // Include the total count
            }
        }
    ]);

    return promoCodes;

}

const promoGetById = async (id) => {
    const promoCode = await promo.findById(id);
    if (!promoCode)
        throw new Error("DATA_NOT_FOUND")
    else return promoCode;
}

const promoAdd = async (body) => {

    let check = await promo.findOne({ code: body.code });
    if (check) {
        throw new Error("ALREADY_EXISTS_CODE")
    }
    else {
        await promo.create(body);
    }

}

const promoUpdate = async (body) => {


    let check = await promo.findOne({ _id: body.id });
    if (!check)
        throw new Error("DATA_NOT_FOUND")
    let check2 = await promo.findOne({ code: body?.new_code });
    if (check2)
        throw new Error("ALREADY_EXISTS_CODE")
    else {
        code = body.code
        body.code = body.new_code
        delete body.new_code
        console.log(body);

        await promo.updateOne({ _id: body.id }, body)
    }

}

const promoDelete = async (body) => {


    let check = await promo.findOne({ _id: body.id });
    if (!check)
        throw new Error("DATA_NOT_FOUND")

    await promo.deleteOne({ _id: body.id });


}

const applyPromo = async (body) => {
    const { code, orderTotal, products, userId } = body;

    let user = await PromoCodeUsed.find({ userId });

    if (user.length > 0) {
        throw new Error("TWICE_APPLY");
        //  ({ error: 'You cannot use the same promo code twice.' });
        // return ({ error: 'Promo code usage limit reached.' });
    }

    // Find promo code by code
    const promoCode = await promo.findOne({ code });
    if (!promoCode) {
        return ({ error: 'Invalid promo code.' });
    }

    // Check if the promo code is expired
    const date = new Date();
    let day = date.getDate();
    if (day.toString.length == 1) {
        day = '0' + day;
    }
    let month = date.getMonth() + 1;
    if (month.toString.length == 1) {
        month = '0' + month;
    }
    let year = date.getFullYear();
    // This arrangement can be altered based on how we want the date's format to appear.
    let currentDate = `${day}-${month}-${year}`;
    if (currentDate < promoCode.startDate || currentDate > promoCode.endDate) {
        return ({ error: 'Promo code is expired.' });
    }

    // Check if the order meets the minimum order value
    if (orderTotal < promoCode.minOrderValue) {
        return ({ error: `Minimum order value should be ${promoCode.minOrderValue}` });
    }

    // Check if the promo code is applicable to the products in the cart
    const isValidProduct = products.some(product => promoCode.applicableProducts.includes(product.productId));
    if (!isValidProduct) {
        return res.status(400).json({ error: 'Promo code is not applicable to the selected products.' });
    }

    // Apply discount
    let discountAmount = 0;
    if (promoCode.discountType === 'percentage') {
        discountAmount = (orderTotal * promoCode.discountValue) / 100;
    } else if (promoCode.discountType === 'fixed') {
        discountAmount = promoCode.discountValue;
    }

    const finalAmount = orderTotal - Math.round(discountAmount);
    discountAmount = Math.round(discountAmount)

    // Update the promo code usage count
    promoCode.timesUsed += 1;
    await promoCode.save();
    await PromoCodeUsed.create({
        userId,
        code: promoCode.code._id
    })
    return { discountAmount, finalAmount }
}
module.exports = { promoUpdate, promoGet, promoGetById, promoAdd, promoDelete, applyPromo }