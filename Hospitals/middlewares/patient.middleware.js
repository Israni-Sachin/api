function tokenForPatient(req, res, next) {
    let token = req.user
    if (token.us_role != 'Patient') {
        res.send({
            status: 401,
            message: 'Unauthorized'
        })
    }
    else {
        next();
    }
}

module.exports = tokenForPatient