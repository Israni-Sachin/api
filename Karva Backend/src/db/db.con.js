const { username, password } = require("../configs/db.config");

const mongoose = require("mongoose");

mongoose.connect(`mongodb+srv://sachin:s%40achin25@cluster0.0rahp.mongodb.net/`)
    .then(() => console.log("MongoDb connected"))
    .catch((err) => console.log(err));

