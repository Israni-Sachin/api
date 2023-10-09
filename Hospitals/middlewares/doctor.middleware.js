function tokenForDoctor(req, res, next) {
    let token = req.user
    console.log(token);
    if (token.us_role != 'Doctor') {
        res.send({
            status: 401,
            message: 'Unauthorized'
        })
    }
    else {
        next();
    }
}

module.exports = tokenForDoctor