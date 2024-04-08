
const validator = (schema) => {

    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });

        if (error)
            return res.status(422).json({ status: 422, message: error.details.map((err) => err.message) });
        
        next();
    }
};

module.exports = validator;