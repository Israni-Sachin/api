const { DB_URL } = require("../configs/db.config");

const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/Student_Portal")
// mongoose.connect("mongodb+srv://sachinisrani56:sachin%401234@studentportal.t0bysyw.mongodb.net/")
// mongoose.connect("mongodb://127.0.0.1/:27017?dbName=Student_Portal")
    .then(() => console.log("MongoDb connected"))
    .catch((err) => console.log(err));

//pending