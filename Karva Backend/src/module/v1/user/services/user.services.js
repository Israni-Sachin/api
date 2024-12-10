const Users = require('../../../../models/user.model')


const userGetAll = async () => {

    let data = await Users.find({});
    return data;

}

const userGiveAdminAccess = async (data) => {

    let check = await Users.findOne({ _id: data.id });
    
    if (check.user_role == "admin" && data.role == "admin")
        throw new Error("ALREADY_ADMIN")

    if (check.user_role == "customer" && data.role == "customer")
        throw new Error("ALREADY_CUSTOMER")

    await Users.updateOne({ _id: data.id }, { user_role: data.role });

}

const userGet = async (user) => {

    let data = await Users.findOne({ _id: user.id })
    data.user_pass = undefined;
    return data;
}

const userUpdate = async (body, user) => {


    let check = await Users.findOne({ _id: { $ne: user.id }, user_email: body.user_email });
    let check2 = await Users.findOne({ _id: { $ne: user.id }, user_phone: body.user_phone });
    if (check)
        throw new Error("ALREADY_EXISTS_EMAIL")

    if (check2)
        throw new Error("ALREADY_EXISTS_NUMBER")

    await Users.updateOne({ _id: user.id }, body);

}

module.exports = { userUpdate, userGet, userGetAll, userGiveAdminAccess }