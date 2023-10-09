const mysql = require('mysql2/promise');
const dbConfig = require('../config/db.config')
const pool = mysql.createPool(dbConfig)

// console.log(pool);

pool.query('Select 1+1 as value')
    .then(res=>console.log('Connection Successful',res))
    .catch(err=>console.log(err))

module.exports = pool;