const successResponse = (res, message, data = undefined) => {
    res.status(200).json({
        status: 200,
        message,
        data
    })
}

const errorResponse = (res, message, status = 500) => {
    res.status(status).json({
        status,
        message
    });
}

module.exports = { successResponse, errorResponse }