const { DB_URL } = require("../configs/db.config");
require('dotenv').config();

const mongoose = require("mongoose");
mongoose.connect(`mongodb+srv://sachin:S%40chin25@techtonics.blzvfv4.mongodb.net/?retryWrites=true&w=majority&appName=TechTonics`)
    .then(() => console.log("MongoDb connected"))
    .catch((err) => console.log(err));
