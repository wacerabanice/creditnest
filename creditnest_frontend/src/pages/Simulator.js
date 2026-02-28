import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api"; 

function Simulator() {
  const [revenue, setRevenue] = useState("");
  const [expenses, setExpenses] = useState("");
  const [loans, setLoans] = useState("");
  const [creditScore, setCreditScore] = useState("");
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  // Load last simulation on mount
  useEffect(() => {
    let sims = [];
    try {
      sims = JSON.parse(localStorage.getItem("simulatorResults")) || [];
    } catch (e) {
      console.warn("LocalStorage corrupted:", e);
      sims = [];
    }
    if (sims.length > 0) setResult(sims[0]); // latest first
  }, []);

  const runSimulation = async () => {
    if (!revenue || !expenses || !loans || !creditScore) {
      return alert("All fields are required");
    }

    const user_id = Number(localStorage.getItem("user_id"));
    if (!user_id) return alert("User not found. Please login.");

    try {
      console.log("Sending simulation request", {
        user_id,
        monthly_revenue: Number(revenue),
        monthly_expenses: Number(expenses),
        existing_loans: Number(loans),
        credit_score: Number(creditScore),
      });

      const response = await API.post("/simulate", {
        user_id,
        monthly_revenue: Number(revenue),
        monthly_expenses: Number(expenses),
        existing_loans: Number(loans),
        credit_score: Number(creditScore),
      });

      const data = response.data;

      // Ensure gaps is always an array
      let gaps = [];
      if (data.simulation.gaps) {
        gaps = Array.isArray(data.simulation.gaps)
          ? data.simulation.gaps
          : String(data.simulation.gaps).split(";").map((g) => g.trim());
      }

      const simulation = {
        id: data.simulation.id,
        user_id: data.simulation.user_id,
        monthly_revenue: data.simulation.monthly_revenue,
        monthly_expenses: data.simulation.monthly_expenses,
        existing_loans: data.simulation.existing_loans,
        credit_score: data.simulation.credit_score,
        readiness_score: data.simulation.readiness_score,
        gaps,
        date: new Date(data.simulation.date).toLocaleString(),
      };

      // Save simulation safely
      let existing = [];
      try {
        existing = JSON.parse(localStorage.getItem("simulatorResults")) || [];
        if (!Array.isArray(existing)) existing = [];
      } catch (e) {
        console.warn("LocalStorage corrupted:", e);
        existing = [];
      }

      localStorage.setItem("simulatorResults", JSON.stringify([simulation, ...existing]));
      setResult(simulation);

      alert("Simulation saved! Redirecting to Dashboard...");
      navigate("/");
    } catch (err) {
      console.error("Simulation API error:", err.response?.data || err.message);
      alert(err.response?.data?.error || "Error running simulation");
    }
  };

  return (
    <div className="space-y-4">
      <div className="max-w-xl mx-auto bg-teal-300 p-10 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Loan Readiness Simulator</h2>

        <input
          className="border border-gray-300 p-3 w-full mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Monthly Revenue"
          value={revenue}
          onChange={(e) => setRevenue(e.target.value)}
        />
        <input
          className="border border-gray-300 p-3 w-full mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Monthly Expenses"
          value={expenses}
          onChange={(e) => setExpenses(e.target.value)}
        />
        <input
          className="border border-gray-300 p-3 w-full mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Existing Loans"
          value={loans}
          onChange={(e) => setLoans(e.target.value)}
        />
        <input
          className="border border-gray-300 p-3 w-full mb-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Credit Score"
          value={creditScore}
          onChange={(e) => setCreditScore(e.target.value)}
        />

        <button
          onClick={runSimulation}
          className="bg-gradient-to-r from-teal-600 to-teal-500 text-white w-full py-3 rounded-lg hover:scale-105 transition"
        >
          Run Simulation
        </button>
      </div>

      {result && (
        <div className="max-w-xl space-y-4 mx-auto bg-teal-300 p-10 rounded-2xl shadow-lg">
          <h3 className="text-lg font-semibold">Latest Simulation</h3>
          <p>
            <strong>Date:</strong> {result.date}
          </p>
          <p>
            <strong>Readiness Score:</strong> {result.readiness_score}%
          </p>
          <p>
            <strong>Gaps:</strong>{" "}
            {result.gaps.length > 0 ? result.gaps.join(", ") : "None"}
          </p>
        </div>
      )}
    </div>
  );
}

export default Simulator;