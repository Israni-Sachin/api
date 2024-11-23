const address = require('../../../../models/address.model')


const addressGet = async (user) => {

    let data = await address.find({ address_fk_user_id: user.id }).
        populate('address_fk_user_id','user_fname user_email user_phone');
    return data;

}

// const userGiveAdminAccess = async (data) => {

//     let check = await address.findOne({ _id: data.id });
//     if (check.user_role == "admin")
//         throw new Error("ALREADY_ADMIN")

//     await address.updateOne({ _id: data.id }, { user_role: data.role });

// }

// const addressGet = async (user) => {

//     let data = await address.findOne({ _id: user.id })
//     data.user_pass = undefined;
//     return data;
// }

const addressUpdate = async (body, user) => {


    let check = await address.findOne({ address_fk_user_id: user.id });
    if (!check)
        throw new Error("USER_NOT_FOUND")

    const updatePayload = {
        _id: body._id,
        pincode: body.address_details[0].pincode,
        city: body.address_details[0].city,
        state: body.address_details[0].state,
        country: body.address_details[0].country,
        locality: body.address_details[0].locality,
        flat_no: body.address_details[0].flat_no,
        landmark: body.address_details[0].landmark,
        type_of_address: body.address_details[0].type_of_address,
        default_address: body.address_details[0].default_address
    };

    // Using the payload in a Mongoose update query
    await address.updateOne({
        address_fk_user_id: user.id, // Match the user
        "address_details._id": body._id
    }, {
        $set: {
            "address_details.$": updatePayload // Update the specific address
        }
    });

}

const addressDelete = async (body, user) => {


    let check = await address.findOne({ address_fk_user_id: user.id });
    if (!check)
        throw new Error("USER_NOT_FOUND")

    await address.updateOne(
        {
            address_fk_user_id: user.id // Match the user
        },
        {
            $pull: {
                address_details: {
                    _id: body._id // Match the specific address by its _id
                }
            }
        }
    );


}

const addressAdd = async (body, user) => {

    let check = await address.findOne({ address_fk_user_id: user.id });
    if (check) {
        check.address_details.push(body.address_details[0])
        console.log(check.address_details)
        await address.updateOne({ _id: check._id }, { address_details: check.address_details });
    }
    else {
        body.address_fk_user_id = user.id;
        await address.create(body);
    }

    // let a = await address.findOne({ address_fk_user_id: user.id }).
    //     populate('address_fk_user_id');

}

module.exports = { addressUpdate, addressGet, addressAdd, addressDelete }