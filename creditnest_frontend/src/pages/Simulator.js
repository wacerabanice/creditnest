import { useState, useEffect } from "react";
import API from "../services/api";

function Simulator() {
  const [revenue, setRevenue] = useState("");
  const [expenses, setExpenses] = useState("");
  const [loans, setLoans] = useState("");
  const [creditScore, setCreditScore] = useState("");
  const [result, setResult] = useState(null);

  const user_id = Number(localStorage.getItem("user_id"));

  // Load last simulation for the logged-in user
  useEffect(() => {
    if (!user_id) return;

    try {
      const allSims = JSON.parse(localStorage.getItem("simulatorResults")) || {};
      const userSims = allSims[user_id] || [];
      if (userSims.length > 0) setResult(userSims[0]); // latest first
    } catch (e) {
      console.warn("LocalStorage corrupted:", e);
    }
  }, [user_id]);

  const runSimulation = async () => {
    if (!revenue || !expenses || !loans || !creditScore)
      return alert("All fields are required");

    if (!user_id) return alert("User not found. Please login.");

    try {
      const response = await API.post("/simulate", {
        user_id,
        monthly_revenue: Number(revenue),
        monthly_expenses: Number(expenses),
        existing_loans: Number(loans),
        credit_score: Number(creditScore),
      });

      const data = response.data;
      const gaps = data.simulation.gaps
        ? Array.isArray(data.simulation.gaps)
          ? data.simulation.gaps
          : String(data.simulation.gaps).split(";").map(g => g.trim())
        : [];

      const simulation = {
        ...data.simulation,
        gaps,
        date: new Date(data.simulation.created_at).toLocaleString(),
      };

      // Save simulations per user
      let allSims = JSON.parse(localStorage.getItem("simulatorResults")) || {};
      allSims[user_id] = allSims[user_id] || [];
      allSims[user_id].unshift(simulation); // latest first
      localStorage.setItem("simulatorResults", JSON.stringify(allSims));

      setResult(simulation);
      alert("Simulation saved!");
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
          type="number"
          placeholder="Monthly Revenue"
          value={revenue}
          onChange={e => setRevenue(e.target.value)}
          className="border p-3 w-full mb-4 rounded-lg"
        />
        <input
          type="number"
          placeholder="Monthly Expenses"
          value={expenses}
          onChange={e => setExpenses(e.target.value)}
          className="border p-3 w-full mb-4 rounded-lg"
        />
        <input
          type="number"
          placeholder="Existing Loans"
          value={loans}
          onChange={e => setLoans(e.target.value)}
          className="border p-3 w-full mb-4 rounded-lg"
        />
        <input
          type="number"
          placeholder="Credit Score"
          value={creditScore}
          onChange={e => setCreditScore(e.target.value)}
          className="border p-3 w-full mb-6 rounded-lg"
        />

        <button
          onClick={runSimulation}
          className="bg-teal-600 text-white w-full py-3 rounded-lg hover:bg-teal-500 transition"
        >
          Run Simulation
        </button>
      </div>

      {result && (
        <div className="max-w-xl mx-auto bg-teal-300 p-6 rounded-2xl shadow-lg">
          <h3 className="text-lg font-semibold">Latest Simulation</h3>
          <p><strong>Date:</strong> {result.date}</p>
          <p><strong>Readiness Score:</strong> {result.readiness_score}%</p>
          <p><strong>Gaps:</strong> {result.gaps.length ? result.gaps.join(", ") : "None"}</p>
        </div>
      )}
    </div>
  );
}

export default Simulator;