const express = require('express');
const path = require('path')
const apiRoutes = require('./api/v1');
require('dotenv').config();
require('./db/db.con')
const cors = require('cors');

const app = express();

const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors({ origin: '*' }));

app.use('/', apiRoutes());

app.use('/files', express.static(path.join(__dirname, 'src/module/v1/orders/services')));

app.use('*', (req, res) => {
    res.status(404).send('Route Not found');
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});