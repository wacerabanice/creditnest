// db.js
require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER,         // DB username
  host: process.env.DB_HOST,         // DB host
  database: process.env.DB_NAME,     // DB name
  password: process.env.DB_PASSWORD, // DB password
  port: parseInt(process.env.DB_PORT, 10),
  ssl: { rejectUnauthorized: false } // Required for Render
});

// Test connection
pool.connect()
  .then(() => console.log("✅ Connected to Render Postgres"))
  .catch(err => console.error("❌ DB Connection Error:", err));


module.exports = pool;