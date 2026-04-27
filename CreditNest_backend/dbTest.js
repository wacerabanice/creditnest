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

const pool = require("./db"); // make sure this points to your db.js

async function checkDatabase() {
  try {
    // Show current database
    const dbNameRes = await pool.query("SELECT current_database();");
    console.log("✅ Connected to database:", dbNameRes.rows[0].current_database);

    // List all tables in public schema
    const tablesRes = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema='public';
    `);
    console.log("📋 Tables in this DB:", tablesRes.rows.map(t => t.table_name));
  } catch (err) {
    console.error("DB check error:", err);
  } finally {
    pool.end();
  }
}

checkDatabase();