require('dotenv').config();

const mongoConfig = {
    username: process.env.MONGO_USERNAME,
    password: process.env.MONGO_PASSWORD
}

module.exports = mongoConfig;