const express = require('express');
const app = express();
const port = 3500;
app.use(express.json());

const routes = require('./Routes');
const loginAuth = require('./Controllers/logging.controllers')
const verifyToken = require('./middlewares/auth/jwt')

app.post('/login', loginAuth)
app.use('/hospital', verifyToken.verifyToken, routes);

app.use('/', (req, res) => {
    res.send({ Status: 404, Message: "Not Found" });
});

app.listen(port, console.log(`Server is running on ${port} port`));