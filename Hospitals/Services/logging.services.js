let db = require('../db/db.con');


async function login(body) {
    
    let query = `SELECT * FROM users WHERE us_name = '${body.username}' AND us_password = '${body.password}'`
    let user = await db.query(query);
    if (user[0] == undefined) {
        return false
    }
    let data = { ...user[0] };
    delete data.password;
    return data;
    
}

module.exports = { login };