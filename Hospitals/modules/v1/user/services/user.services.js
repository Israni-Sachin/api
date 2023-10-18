const path = require('path')
let users = require(path.resolve('./db/user.json'))
let fs = require('fs');

// console.log("__dir",__dirname)
// console.log("path",path.resolve('../../../../db/user.json'))
// console.log("path",path.resolve('./db/user.json'))

const userGet = async () => {
    let data = users;
    return data;
}

const userGetById = async (userId) => {

    let data = users.find(v => v.id == userId);
    return data;

}

const userAdd = async (body) => {

    let obj = { id: users[users.length - 1].id + 1, ...body }
    obj.id = users[users.length - 1].id + 1
    users.push(obj);
    fs.writeFile('./db/user.json', JSON.stringify(users), (err) => console.log(err))

}

const userUpdate = async (userId, body) => {

    let getIDindex = users.indexOf(users.find(val => val.id == userId));
    const obj = { ...users[getIDindex], ...body, id: userId };
    users[getIDindex] = obj;
    fs.writeFile('./db/user.json', JSON.stringify(users), (err) => console.log(err));

}
const userDelete = async (userId) => {

    const del = users.filter(v => v.id == userId);
    const user = users.filter(v => v.id != userId);
    console.log(user);
    fs.writeFile('./db/user.json', JSON.stringify(user), (err) => console.log(err,"hello"));
    return user;
}


module.exports = { userGet, userGetById, userAdd, userUpdate, userDelete }