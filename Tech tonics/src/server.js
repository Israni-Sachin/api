const express = require('express');
const apiRoutes = require('./api/v1');
require('dotenv').config();
require('./db/db.con')
const cors = require('cors');

const app = express();

const port = 3000;

app.use(express.json());
app.use(cors({ origin: '*' }));

app.use('/', apiRoutes());

app.use('*', (req, res) => {
    res.status(404).send('404 Not found');
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});