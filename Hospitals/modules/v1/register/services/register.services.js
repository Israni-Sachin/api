const path = require('path')
let users = require(path.resolve('./db/user.json'))
let fs = require('fs');


const register = async (body) => {
    let obj = { id: users[users.length - 1].id + 1, ...body }
    obj.id = users[users.length - 1].id + 1
    users.push(obj);
    fs.writeFile('./db/user.json', JSON.stringify(users), (err) => console.log(err))
}

module.exports = register