const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
app.use(express.json());
console.log(process.env.PORT);
// const routes = require('./Routes');
// const loginAuth = require('./Controllers/logging.controllers')
// const verifyToken = require('./middlewares/auth/jwt')

// app.post('/login', loginAuth)
// app.use('/hospital',  routes);

// -------------------------------- for project 

const apiRoutes = require('./api/v1/index')
app.use(cors({
    origin: '*'
}));

app.use('/', apiRoutes());


app.use('/', (req, res) => {
    res.send({ Status: 404, Message: "Hello khana khake jana ho" });
});

app.listen(process.env.PORT, console.log(`Server is running on ${process.env.PORT} port`));