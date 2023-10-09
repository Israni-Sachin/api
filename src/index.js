const express = require('express');
const app = express();
const apiRoutes = require('./api/v1/index')
const port = 3000;
app.use(express.json());

app.use('/',apiRoutes());

app.listen(port,()=>{
    console.log(`Server is running on ${port} port`);
});