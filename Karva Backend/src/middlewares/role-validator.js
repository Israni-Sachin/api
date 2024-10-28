
const roleValidator = (roles) => {

    return (req, res, next) => {
        if (roles.includes(req.user.role)) {
            next();
        } else {
            res.status(401).json({
                status: '401', message: ' Unauthorized'
            })
        }
    }
}
module.exports = roleValidator;