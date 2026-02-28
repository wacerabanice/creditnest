require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const pool = require("./db"); 

const app = express();

// ---------------- MIDDLEWARE ----------------
app.use(cors({
  origin: ["http://localhost:3000", "https://everythingcredit.netlify.app"]
}));
app.use(express.json());

// ---------------- HEALTH CHECK ----------------
app.get("/", (req, res) => res.send("CreditNest API running..."));

// ---------------- SIGNUP ----------------
app.post("/signup", async (req, res) => {
  try {
    let { name, email, password } = req.body;
    name = name?.trim();
    email = email?.trim().toLowerCase();
    password = password?.trim();

    if (!name || !email || !password)
      return res.status(400).json({ error: "All fields required" });

    // Check existing email
    const checkUser = await pool.query(
      "SELECT id FROM users WHERE LOWER(email) = $1",
      [email]
    );
    if (checkUser.rows.length > 0)
      return res.status(400).json({ error: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1,$2,$3) RETURNING id,name,email",
      [name, email, hashedPassword]
    );

    res.status(201).json({ message: "Signup successful", user: newUser.rows[0] });
  } catch (err) {
    console.error("Signup Error:", err.message);
    res.status(500).json({ error: "Error creating account" });
  }
});

// GET Signup users
app.get("/signup", async (req, res) => {
  try {
    const users = await pool.query("SELECT id,name,email FROM users ORDER BY id DESC");
    res.json(users.rows);
  } catch (err) {
    console.error("GET Signup Error:", err.message);
    res.status(500).json({ error: "Error fetching users" });
  }
});

// ---------------- LOGIN ----------------
app.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;
    email = email?.trim().toLowerCase();
    password = password?.trim();

    if (!email || !password)
      return res.status(400).json({ error: "Email and password required" });

    const result = await pool.query("SELECT * FROM users WHERE LOWER(email) = $1", [email]);
    if (result.rows.length === 0) return res.status(400).json({ error: "Invalid credentials" });

    const user = result.rows[0];
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ error: "Invalid credentials" });

    res.json({ id: user.id, name: user.name, email: user.email });
  } catch (err) {
    console.error("Login Error:", err.message);
    res.status(500).json({ error: "Login failed" });
  }
});

// GET login users
app.get("/login", async (req, res) => {
  try {
    const users = await pool.query("SELECT id,name,email FROM users ORDER BY id DESC");
    res.json(users.rows);
  } catch (err) {
    console.error("GET Login Error:", err.message);
    res.status(500).json({ error: "Error fetching users" });
  }
});

// ---------------- SIMULATOR ----------------
app.post("/simulate", async (req, res) => {
  try {
    const { user_id, monthly_revenue, monthly_expenses, existing_loans, credit_score } = req.body;

    if (!user_id || isNaN(monthly_revenue) || isNaN(monthly_expenses) || isNaN(existing_loans) || isNaN(credit_score))
      return res.status(400).json({ error: "All fields must be valid numbers" });

    // check user exists
    const userCheck = await pool.query("SELECT id FROM users WHERE id=$1", [user_id]);
    if (userCheck.rows.length === 0) return res.status(400).json({ error: "User does not exist" });

    let readiness_score = 0;
    const gaps = [];
    const savings = monthly_revenue - monthly_expenses;

    if (savings >= 0.3 * monthly_revenue) readiness_score += 40;
    else { readiness_score += 20; gaps.push("Savings ratio is low"); }

    if (existing_loans === 0) readiness_score += 30;
    else if (existing_loans < 0.3 * monthly_revenue) { readiness_score += 20; gaps.push("Existing loans reduce readiness"); }
    else { readiness_score += 10; gaps.push("High existing loans"); }

    if (credit_score >= 750) readiness_score += 30;
    else if (credit_score >= 650) { readiness_score += 20; gaps.push("Moderate credit score"); }
    else { readiness_score += 10; gaps.push("Low credit score"); }

    const insert = await pool.query(
      `INSERT INTO simulations
      (user_id, monthly_revenue, monthly_expenses, existing_loans, credit_score, readiness_score, gaps, created_at)
      VALUES ($1,$2,$3,$4,$5,$6,$7,NOW())
      RETURNING *`,
      [user_id, monthly_revenue, monthly_expenses, existing_loans, credit_score, readiness_score, gaps.join("; ")]
    );

    res.json({
      readiness_score,
      gaps,
      simulation: insert.rows[0]
    });

  } catch (err) {
    console.error("Simulation Error:", err.message);
    res.status(500).json({ error: "Error running simulation" });
  }
});

// GET all simulations
app.get("/simulate", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM simulations ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (err) {
    console.error("GET Simulate Error:", err.message);
    res.status(500).json({ error: "Error fetching simulations" });
  }
});

// ---------------- START SERVER ----------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`CreditNest server running on port ${PORT}`));