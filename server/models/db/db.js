const Pool = require('pg').Pool;

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
});

pool.connect(err => {
    if(err){
        console.error('connection error', err.stack);
    } else {
        console.log('database connected');
    }
});

module.exports = pool;
