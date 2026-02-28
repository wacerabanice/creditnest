
require("dotenv").config();
// ---------- IMPORTS ----------
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const pool = require("./db");

// ---------- APP INITIALIZATION ----------
const app = express();

// ---------- MIDDLEWARE ----------
app.use(cors({
  origin: ["https://everythingcredit.netlify.app", "http://localhost:3000"]
}));
app.use(express.json());

// ===============================
// HEALTH CHECK ROUTE
// ===============================
app.get("/", (req, res) => {
  res.send("CreditNest API is running...");
});

// ===============================
// SIGNUP
// ===============================
app.post("/signup", async (req, res) => {
  try {
    let { name, email, password } = req.body;

    name = name?.trim();
    email = email?.trim().toLowerCase();
    password = password?.trim();

    if (name == null || email == null || password == null) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if email exists
    let checkUser = await pool.query(
      "SELECT * FROM users WHERE LOWER(email) = $1",
      [email]
    );

    if (checkUser.rows.length > 0) {
      return res.status(400).json({ error: "Email already exists" });
    }

    let hashedPassword = await bcrypt.hash(password, 10);

    let newUser = await pool.query(
      `INSERT INTO users (name, email, password)
       VALUES ($1,$2,$3)
       RETURNING id, name, email`,
      [name, email, hashedPassword]
    );

    res.status(201).json({
      message: "Signup successful",
      user: newUser.rows[0],
    });

  } catch (err) {
    console.error("Signup Error:", err.message);
    res.status(500).json({ error: "Error creating account" });
  }
});

/// ===============================
// LOGIN
// ===============================
app.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;

    email = email?.trim().toLowerCase();
    password = password?.trim();

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const result = await pool.query(
      "SELECT * FROM users WHERE LOWER(email) = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const user = result.rows[0];

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
    });

  } catch (err) {
    console.error("Login Error:", err.message);
    res.status(500).json({ error: "Login failed" });
  }
});

// ===============================
// GET USER
// ===============================
app.get("/users/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid user ID" });

    const result = await pool.query(
      "SELECT id, name, email FROM users WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Get User Error:", err.message);
    res.status(500).json({ error: "Error fetching user" });
  }
});

// ===============================

app.post("/simulate", async (req, res) => {
  try {
    const { user_id, monthly_revenue, monthly_expenses, existing_loans, credit_score } = req.body;

    // Validate numbers
    if (
      !user_id || isNaN(monthly_revenue) || isNaN(monthly_expenses) ||
      isNaN(existing_loans) || isNaN(credit_score)
    ) return res.status(400).json({ error: "All fields must be valid numbers" });

    // Ensure user exists
    const userCheck = await pool.query("SELECT id FROM users WHERE id = $1", [user_id]);
    if (userCheck.rows.length === 0) return res.status(400).json({ error: "User does not exist" });

    // Compute readiness score
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

    // Save to DB
    const insertQuery = `
      INSERT INTO simulations
      (user_id, monthly_revenue, monthly_expenses, existing_loans, credit_score, readiness_score, gaps, created_at)
      VALUES ($1,$2,$3,$4,$5,$6,$7,NOW())
      RETURNING id, user_id, monthly_revenue, monthly_expenses, existing_loans, credit_score, readiness_score, gaps, created_at
    `;
    const values = [user_id, monthly_revenue, monthly_expenses, existing_loans, credit_score, readiness_score, gaps.join("; ")];
    const result = await pool.query(insertQuery, values);
    const simulation = result.rows[0];

    // Return response with date mapped
    res.json({
      readiness_score,
      gaps,
      simulation: {
        id: simulation.id,
        user_id: simulation.user_id,
        monthly_revenue: simulation.monthly_revenue,
        monthly_expenses: simulation.monthly_expenses,
        existing_loans: simulation.existing_loans,
        credit_score: simulation.credit_score,
        readiness_score: simulation.readiness_score,
        gaps,
        date: simulation.created_at // <-- maps DB created_at
      }
    });

  } catch (err) {
    console.error("Simulation Error:", err.message);
    res.status(500).json({ error: "Error running simulation" });
  }
});

     

// ===============================
// START SERVER
// ===============================
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`CreditNest server running on port ${PORT}`));