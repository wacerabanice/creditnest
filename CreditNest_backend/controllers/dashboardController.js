// controllers/dashboardController.js
const pool = require("../db");

// --------------------- Business Profile ---------------------
exports.saveBusinessProfile = async (req, res) => {
  const { years, industry, location, employees, structure, licenses } = req.body;
  const user_id = req.user.id; // Get from authMiddleware

  if (!user_id) return res.status(401).json({ error: "Unauthorized" });

  try {
    const existing = await pool.query(
      "SELECT * FROM business_profile WHERE user_id=$1",
      [user_id]
    );

    let result;
    if (existing.rows.length > 0) {
      // Update if exists
      result = await pool.query(
        `UPDATE business_profile
         SET years=$1, industry=$2, location=$3, employees=$4, structure=$5, licenses=$6, updated_at=NOW()
         WHERE user_id=$7 RETURNING *`,
        [years, industry, location, employees, structure, licenses, user_id]
      );
    } else {
      // Insert new
      result = await pool.query(
        `INSERT INTO business_profile 
        (user_id, years, industry, location, employees, structure, licenses, updated_at)
        VALUES ($1,$2,$3,$4,$5,$6,$7,NOW())
        RETURNING *`,
        [user_id, years, industry, location, employees, structure, licenses]
      );
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("BusinessProfile error:", err);
    res.status(500).json({ error: "Server error saving business profile" });
  }
};

exports.getBusinessProfile = async (req, res) => {
  try {
    const user_id = req.user.id;
    const result = await pool.query(
      "SELECT * FROM business_profile WHERE user_id=$1",
      [user_id]
    );
    res.json(result.rows[0] || {});
  } catch (err) {
    console.error("GetBusinessProfile error:", err);
    res.status(500).json({ error: "Server error fetching business profile" });
  }
};

// --------------------- Management ---------------------
exports.saveManagement = async (req, res) => {
  const { experience, education, directors, succession  } = req.body;
  const user_id = req.user.id;

  if (!user_id) return res.status(401).json({ error: "Unauthorized" });
  try {
    const existing = await pool.query(
      "SELECT * FROM management WHERE user_id=$1",
      [user_id]
    );

    let result;
    if (existing.rows.length > 0) {
      result = await pool.query(
        `UPDATE management
         SET experience=$1, education=$2, directors=$3, succession=$4, updated_at=NOW()
         WHERE user_id=$5 RETURNING *`,
        [experience, education, directors, succession, user_id]
      );
    } else {
      result = await pool.query(
        `INSERT INTO management (user_id, experience, education, directors, succession, updated_at)
         VALUES ($1,$2,$3,$4,$5,NOW()) RETURNING *`,
        [user_id, experience, education, directors, succession]
      );
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Management error:", err);
    res.status(500).json({ error: "Server error saving management" });
  }
};

exports.getManagement = async (req, res) => {
  const user_id = req.user.id;
  try {
    const result = await pool.query(
      "SELECT * FROM management WHERE user_id=$1",
      [user_id]
    );
    res.json(result.rows[0] || {});
  } catch (err) {
    console.error("GetManagement error:", err);
    res.status(500).json({ error: "Server error fetching management" });
  }
};

// --------------------- Financial Health ---------------------
exports.saveFinancialHealth = async (req, res) => {
  const { revenue, profit, expenses } = req.body;
  const user_id = req.user.id;

  try {
    const existing = await pool.query(
      "SELECT * FROM financial_health WHERE user_id=$1",
      [user_id]
    );

    let result;
    if (existing.rows.length > 0) {
      result = await pool.query(
        `UPDATE financial_health
         SET revenue=$1, expenses=$2, profit_margin=$3,  updated_at=NOW()
         WHERE user_id=$4 RETURNING *`,
        [revenue, expenses, profit,  user_id]
      );
    } else {
      result = await pool.query(
        `INSERT INTO financial_health (user_id, revenue, expenses, profit_margin,  updated_at)
         VALUES ($1,$2,$3,$4,NOW()) RETURNING *`,
        [user_id, revenue, expenses, profit]
      );
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("FinancialHealth error:", err);
    res.status(500).json({ error: "Server error saving financial health" });
  }
};

exports.getFinancialHealth = async (req, res) => {
  const user_id = req.user.id;
  try {
    const result = await pool.query(
      "SELECT * FROM financial_health WHERE user_id=$1",
      [user_id]
    );
    res.json(result.rows[0] || {});
  } catch (err) {
    console.error("GetFinancialHealth error:", err);
    res.status(500).json({ error: "Server error fetching financial health" });
  }
};

// --------------------- Cashflow ---------------------
exports.saveCashflow = async (req, res) => {
  const { net_cashflow, loan_payments, dscr} = req.body;
  const user_id = req.user.id;

  try {
    const existing = await pool.query(
      "SELECT * FROM cashflow WHERE user_id=$1",
      [user_id]
    );

    let result;
    if (existing.rows.length > 0) {
      result = await pool.query(
        `UPDATE cashflow
         SET net_cashflow=$1, loan_payments=$2, dscr=$3, updated_at=NOW()
         WHERE user_id=$4 RETURNING *`,
        [net_cashflow, loan_payments, dscr, user_id]
      );
    } else {
      result = await pool.query(
        `INSERT INTO cashflow (user_id, net_cashflow, loan_payments, dscr, updated_at)
         VALUES ($1,$2,$3,$4,NOW()) RETURNING *`,
        [user_id, net_cashflow, loan_payments, dscr]
      );
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Cashflow error:", err);
    res.status(500).json({ error: "Server error saving cashflow" });
  }
};

exports.getCashflow = async (req, res) => {
  const user_id = req.user.id;
  try {
    const result = await pool.query(
      "SELECT * FROM cashflow WHERE user_id=$1",
      [user_id]
    );
    res.json(result.rows[0] || {});
  } catch (err) {
    console.error("GetCashflow error:", err);
    res.status(500).json({ error: "Server error fetching cashflow" });
  }
};

// --------------------- Credit History ---------------------
exports.saveCreditHistory = async (req, res) => {
  const { crb_score, defaults, restructured_loans, days_past_due } = req.body;
  const user_id = req.user.id;

  try {
    const existing = await pool.query(
      "SELECT * FROM credit_history WHERE user_id=$1",
      [user_id]
    );

    let result;
    if (existing.rows.length > 0) {
      result = await pool.query(
        `UPDATE credit_history
         SET crb_score=$1, defaults=$2, restructured_loans=$3, days_past_due=$4, updated_at=NOW()
         WHERE user_id=$5 RETURNING *`,
        [crb_score, defaults, restructured_loans, days_past_due, user_id]
      );
    } else {
      result = await pool.query(
        `INSERT INTO credit_history (user_id, crb_score, defaults, restructured_loans, days_past_due, updated_at)
         VALUES ($1,$2,$3,$4,$5,NOW()) RETURNING *`,
        [user_id, crb_score, defaults, restructured_loans, days_past_due]
      );
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("CreditHistory error:", err);
    res.status(500).json({ error: "Server error saving credit history" });
  }
};

exports.getCreditHistory = async (req, res) => {
  const user_id = req.user.id;
  try {
    const result = await pool.query(
      "SELECT * FROM credit_history WHERE user_id=$1",
      [user_id]
    );
    res.json(result.rows[0] || {});
  } catch (err) {
    console.error("GetCreditHistory error:", err);
    res.status(500).json({ error: "Server error fetching credit history" });
  }
};

// --------------------- Banking ---------------------
exports.saveBankingBehaviour = async (req, res) => {
  const { monthly_deposits, avg_balance, txn_frequency, cheque_returns } = req.body;
  const user_id = req.user.id;

  try {
    const existing = await pool.query(
      "SELECT * FROM banking_behaviour WHERE user_id=$1",
      [user_id]
    );

    let result;
    if (existing.rows.length > 0) {
      result = await pool.query(
        `UPDATE banking_behaviour
         SET monthly_deposits=$1, avg_balance=$2, txn_frequency=$3, cheque_returns=$4, updated_at=NOW()
         WHERE user_id=$5 RETURNING *`,
        [monthly_deposits, avg_balance, txn_frequency, cheque_returns, user_id]
      );
    } else {
      result = await pool.query(
        `INSERT INTO banking_behaviour (user_id, monthly_deposits, avg_balance, txn_frequency, cheque_returns, updated_at)
         VALUES ($1,$2,$3,$4,$5,NOW()) RETURNING *`,
        [user_id, monthly_deposits, avg_balance, txn_frequency, cheque_returns]
      );
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Banking error:", err);
    res.status(500).json({ error: "Server error saving banking" });
  }
};

exports.getBankingBehaviour = async (req, res) => {
  const user_id = req.user.id;
  try {
    const result = await pool.query(
      "SELECT * FROM banking_behaviour WHERE user_id=$1",
      [user_id]
    );
    res.json(result.rows[0] || {});
  } catch (err) {
    console.error("GetBanking error:", err);
    res.status(500).json({ error: "Server error fetching banking" });
  }
};

// --------------------- Collateral ---------------------
exports.saveCollateral = async (req, res) => {
  const { type, market_value, forced_sale_value } = req.body;
  const user_id = req.user.id;

  try {
    const existing = await pool.query(
      "SELECT * FROM collateral WHERE user_id=$1",
      [user_id]
    );

    let result;
    if (existing.rows.length > 0) {
      result = await pool.query(
        `UPDATE collateral
         SET type=$1, market_value=$2, forced_sale_value=$3, updated_at=NOW()
         WHERE user_id=$4 RETURNING *`,
        [type, market_value, forced_sale_value, user_id]
      );
    } else {
      result = await pool.query(
        `INSERT INTO collateral (user_id, type, market_value, forced_sale_value, updated_at)
         VALUES ($1,$2,$3,$4,NOW()) RETURNING *`,
        [user_id, type, market_value, forced_sale_value]
      );
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Collateral error:", err);
    res.status(500).json({ error: "Server error saving collateral" });
  }
};

exports.getCollateral = async (req, res) => {
  const user_id = req.user.id;
  try {
    const result = await pool.query(
      "SELECT * FROM collateral WHERE user_id=$1",
      [user_id]
    );
    res.json(result.rows[0] || {});
  } catch (err) {
    console.error("GetCollateral error:", err);
    res.status(500).json({ error: "Server error fetching collateral" });
  }
};

// --------------------- Score ---------------------
exports.calculateScore = async (req, res) => {
  const user_id = req.user.id;

  try {
    // Fetch all relevant data
    const [creditRes, bankingRes, cashflowRes, managementRes, financialRes] = await Promise.all([
      pool.query("SELECT * FROM credit_history WHERE user_id=$1", [user_id]),
      pool.query("SELECT * FROM banking_behaviour WHERE user_id=$1", [user_id]),
      pool.query("SELECT * FROM cashflow WHERE user_id=$1", [user_id]),
      pool.query("SELECT * FROM management WHERE user_id=$1", [user_id]),
      pool.query("SELECT * FROM financial_health WHERE user_id=$1", [user_id]),
    ]);

    const credit = creditRes.rows[0] || {};
    const banking = bankingRes.rows[0] || {};
    const cashflow = cashflowRes.rows[0] || {};
    const management = managementRes.rows[0] || {};
    const financial = financialRes.rows[0] || {};

    // --- Category scoring ---
    const categoryScores = {};

    // Credit
    let creditScore = 0;
    if (credit.crb_score) creditScore += Math.min(credit.crb_score / 4, 100);
    if (credit.defaults > 0) creditScore -= 30;
    if (credit.restructured_loans > 0) creditScore -= 20;
    if (credit.days_past_due > 30) creditScore -= 20;
    creditScore = Math.max(0, Math.min(creditScore, 100));
    categoryScores.credit = creditScore;

    // Banking Behaviour
    let bankingScore = 0;
    if (banking.avg_balance > 100000) bankingScore += 30;
    if (banking.monthly_deposits > 200000) bankingScore += 30;
    if (banking.txn_frequency === "high") bankingScore += 30;
    if (banking.cheque_returns === "none") bankingScore += 10;
    bankingScore = Math.max(0, Math.min(bankingScore, 100));
    categoryScores.banking = bankingScore;

    // Cashflow
    let cashflowScore = 0;
    if (cashflow.net_cashflow > 0) cashflowScore += 50;
    cashflowScore = Math.max(0, Math.min(cashflowScore, 100));
    categoryScores.cashflow = cashflowScore;

    // Management
    let managementScore = 0;
    if (management.years_experience >= 2) managementScore += 20;
    if (management.has_team === true) managementScore += 10;
    managementScore = Math.max(0, Math.min(managementScore, 100));
    categoryScores.management = managementScore;

    // Financial Health
    let financialScore = 0;
    if (financial.profit > 0) financialScore += 40;
    if (financial.debt_ratio < 0.5) financialScore += 20;
    financialScore = Math.max(0, Math.min(financialScore, 100));
    categoryScores.financial = financialScore;

    // Overall score = average of categories
    const scoresArray = Object.values(categoryScores);
    let overallScore = 0;
    if (scoresArray.length > 0) {
      overallScore = Math.round(scoresArray.reduce((a, b) => a + b, 0) / scoresArray.length);
    }

    // Status mapping
    let status = "";
    if (overallScore >= 75) status = "excellent";
    else if (overallScore >= 50) status = "moderate";
    else status = "low";

    res.json({ 
      score: overallScore, 
      status, 
      categories: categoryScores 
    });

  } catch (err) {
    console.error("Score calculation error:", err);
    res.status(500).json({ message: "Failed to calculate score" });
  }
};

// --------------------- Reports ---------------------

exports.getReports = async (req, res) => {
  const user_id = req.user.id; // logged-in user
  try {
    const result = await pool.query(
      `SELECT id, created_at AS date, score, gaps
       FROM loan_reports
       WHERE user_id=$1
       ORDER BY created_at DESC`,
      [user_id]
    );

    res.json(result.rows || []);
  } catch (err) {
    console.error("Get reports error:", err);
    res.status(500).json({ error: "Failed to fetch reports" });
  }
};