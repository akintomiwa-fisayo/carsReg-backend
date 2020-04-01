require('dotenv').config();
const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL;
const ssl = process.env.NODE_ENV === 'production';
const pool = new Pool({ connectionString, ssl });

module.exports = pool;
