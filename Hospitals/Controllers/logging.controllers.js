let logging = require('../Services/logging.services');
let auth = require('../middlewares/auth/jwt')

async function login(req, res) {

    if (Object.entries(req.body).length == 0) {
        return res.send({ status: 401, message: 'Body is empty' })
    }
    let user = await logging.login(req.body)
    if (!user[0]) {
        return res.send({ status: 401, message: 'Invalid username or password' })
    }
    let token = auth.generateToken(user[0])
    let username = req.body.username
    res.send({
        Status: 200,
        Message: "Login Successfully",
        data: { ...user[0], username, token }
    })

}




module.exports = login 
