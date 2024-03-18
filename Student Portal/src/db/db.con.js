const { DB_URL } = require("../configs/db.config");
require('dotenv').config();

const mongoose = require("mongoose");
// mongoose.connect("mongodb://127.0.0.1:27017/Student_Portal")
mongoose.connect(`mongodb+srv://sachin:S%40chin25@studentportal.dhiv5kx.mongodb.net/`)
.then(() => console.log("MongoDb connected"))
.catch((err) => console.log(err));

//pending
// mongoose.connect(`mongodb://${{ MONGO_INITDB_ROOT_USERNAME }}:${{ MONGO_INITDB_ROOT_PASSWORD }}@${{ RAILWAY_TCP_PROXY_DOMAIN }}:${{ RAILWAY_TCP_PROXY_PORT }}`)
// mongoose.connect("mongodb://mongo:G53fdd3bd6CeC64DCd5A56eBH4H6adHa@roundhouse.proxy.rlwy.net:12774")
// mongoose.connect("mongodb+srv://sachinisrani56:sachin%401234@studentportal.t0bysyw.mongodb.net/")
// mongoose.connect("mongodb://127.0.0.1/:27017?dbName=Student_Portal")
// let obj = {
//     MONGO_INITDB_ROOT_PASSWORD: process.env.MONGO_INITDB_ROOT_PASSWORD,
//     MONGO_INITDB_ROOT_USERNAME: process.env.MONGO_INITDB_ROOT_USERNAME,
//     RAILWAY_TCP_PROXY_DOMAIN: process.env.RAILWAY_TCP_PROXY_DOMAIN,
//     RAILWAY_TCP_PROXY_PORT: process.env.RAILWAY_TCP_PROXY_PORT
// }

// let { MONGO_INITDB_ROOT_PASSWORD, MONGO_INITDB_ROOT_USERNAME, RAILWAY_TCP_PROXY_DOMAIN, RAILWAY_TCP_PROXY_PORT } = obj