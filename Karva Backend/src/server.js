const express = require('express');
const apiRoutes = require('./api/v1');
require('dotenv').config();
require('./db/db.con')
const cors = require('cors');
const swaggerui = require('swagger-ui-express');
const { apiDocs } = require('./swagger');

const app = express();
app.use('/api-docs', swaggerui.serve, swaggerui.setup(apiDocs));

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({ origin: '*' }));

app.use('/', apiRoutes());

app.use('*', (req, res) => {
    res.status(404).send('404 Not found');
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});