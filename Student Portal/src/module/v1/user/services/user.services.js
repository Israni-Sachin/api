const exam = require('../../../../models/exam.model');
const Users = require('../../../../models/user.model')

const userGet = async (user) => {

    let data = await Users.findOne({ _id: user.id })
    data.user_pass = undefined;
    return data;
}

const usersGet = async (user) => {

    let data = await Users.find({})
    data.user_pass = undefined;
    return data;
}

const attenGet = async (user) => {

    let data = await exam.find({})
    return data;
}

const userUpdate = async (body, user) => {

    await Users.updateOne({ _id: user.id }, body);

}

module.exports = { userUpdate, userGet, usersGet,attenGet }