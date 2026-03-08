require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const pool = require("./db"); // Postgres connection pool

const app = express();
app.use(cors());
app.use(express.json());

// ------------------- HEALTH CHECK -------------------
app.get("/", (req, res) => res.send("CreditNest API is running..."));

// ------------------- SIGNUP -------------------
app.post("/signup", async (req, res) => {
  try {
    let { name, email, password } = req.body;
    name = name?.trim();
    email = email?.trim().toLowerCase();
    password = password?.trim();
    if (!name || !email || !password)
      return res.status(400).json({ error: "All fields are required" });

    const existing = await pool.query("SELECT * FROM users WHERE LOWER(email) = $1", [email]);
    if (existing.rows.length > 0) return res.status(400).json({ error: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const newUser = await pool.query(
      `INSERT INTO users (name, email, password) VALUES ($1,$2,$3) RETURNING id, name, email`,
      [name, email, hashed]
    );

    res.status(201).json({ message: "Signup successful", user: newUser.rows[0] });
  } catch (err) {
    console.error("Signup Error:", err.message);
    res.status(500).json({ error: "Error creating account" });
  }
});

// ------------------- LOGIN -------------------
app.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;
    email = email?.trim().toLowerCase();
    password = password?.trim();
    if (!email || !password) return res.status(400).json({ error: "Email and password required" });

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

// ------------------- GET USER -------------------
app.get("/users/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid user ID" });

    const result = await pool.query("SELECT id, name, email FROM users WHERE id = $1", [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: "User not found" });

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Get User Error:", err.message);
    res.status(500).json({ error: "Error fetching user" });
  }
});

// ------------------- RUN SIMULATION -------------------
app.post("/simulate", async (req, res) => {
  try {
    const { user_id, monthly_revenue, monthly_expenses, existing_loans, credit_score } = req.body;
    if (!user_id || [monthly_revenue, monthly_expenses, existing_loans, credit_score].some(v => isNaN(v)))
      return res.status(400).json({ error: "All fields must be valid numbers" });

    // Check user exists
    const userCheck = await pool.query("SELECT id FROM users WHERE id = $1", [user_id]);
    if (!userCheck.rows.length) return res.status(400).json({ error: "User does not exist" });

    // Calculate readiness score
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

    const insertQuery = `
      INSERT INTO simulations
      (user_id, monthly_revenue, monthly_expenses, existing_loans, credit_score, readiness_score, gaps, created_at)
      VALUES ($1,$2,$3,$4,$5,$6,$7,NOW())
      RETURNING *
    `;
    const values = [user_id, monthly_revenue, monthly_expenses, existing_loans, credit_score, readiness_score, gaps.join("; ")];
    const result = await pool.query(insertQuery, values);
    const sim = result.rows[0];

    res.json({
      readiness_score,
      gaps,
      simulation: { ...sim, gaps, date: sim.created_at }
    });
  } catch (err) {
    console.error("Simulation Error:", err.message);
    res.status(500).json({ error: "Error running simulation" });
  }
});

// ------------------- GET SIMULATIONS BY USER -------------------
app.get("/simulations/:user_id", async (req, res) => {
  try {
    const user_id = Number(req.params.user_id);
    if (isNaN(user_id)) return res.status(400).json({ error: "Invalid user ID" });

    const result = await pool.query(
      "SELECT * FROM simulations WHERE user_id = $1 ORDER BY created_at DESC",
      [user_id]
    );

    const simulations = result.rows.map(sim => ({
      ...sim,
      gaps: sim.gaps ? sim.gaps.split("; ").filter(g => g) : [],
      date: sim.created_at
    }));

    res.json(simulations);
  } catch (err) {
    console.error("Get Simulations Error:", err.message);
    res.status(500).json({ error: "Error fetching simulations" });
  }
});

// ------------------- START SERVER -------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`CreditNest backend running on port ${PORT}`));