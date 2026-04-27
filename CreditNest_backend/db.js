const { Pool } = require("pg");

// Check if we're running in production (Render) or local
const isProduction = process.env.NODE_ENV === "production";

const pool = new Pool({
  user: process.env.DB_USER,         // from .env
  host: process.env.DB_HOST,         // from .env
  database: process.env.DB_NAME,     // from .env
  password: process.env.DB_PASSWORD, // from .env
  port: parseInt(process.env.DB_PORT, 10),
  ssl: isProduction                   // SSL only in production (Render)
    ? { rejectUnauthorized: false }
    : false,
});

pool.connect()
  .then(() => console.log(`✅ Connected to Postgres (${isProduction ? "Render" : "Local"})`))
  .catch(err => console.error("❌ DB Connection Error:", err));

module.exports = pool;