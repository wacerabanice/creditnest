import { useState, useEffect } from "react";
import API from "../services/api";

function Simulator() {
  const [revenue, setRevenue] = useState("");
  const [expenses, setExpenses] = useState("");
  const [loans, setLoans] = useState("");
  const [creditScore, setCreditScore] = useState("");
  const [simulations, setSimulations] = useState([]);

  const user_id = Number(localStorage.getItem("user_id"));

  // Load all simulations for this user
  useEffect(() => {
    if (!user_id) return;
    try {
      const allSims = JSON.parse(localStorage.getItem("simulatorResults")) || [];
      const userSims = allSims.filter(sim => sim.user_id === user_id);
      setSimulations(userSims);
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

      // Update localStorage for this user
      let existing = JSON.parse(localStorage.getItem("simulatorResults")) || [];
      if (!Array.isArray(existing)) existing = [];
      existing = [simulation, ...existing.filter(s => s.user_id !== user_id), ...existing.filter(s => s.user_id === user_id)];
      localStorage.setItem("simulatorResults", JSON.stringify(existing));

      // Update state
      setSimulations(prev => [simulation, ...prev]);
      alert("Simulation saved!");
    } catch (err) {
      console.error("Simulation API error:", err.response?.data || err.message);
      alert(err.response?.data?.error || "Error running simulation");
    }
  };

  return (
    <div className="m-3 space-y-6">
      {/* Simulation Inputs */}
      <div className="max-w-xl mx-auto bg-teal-200 p-10 rounded-2xl shadow-lg">
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
          placeholder="CRB Credit Score"
          value={creditScore}
          onChange={e => setCreditScore(e.target.value)}
          className="border p-3 w-full mb-6 rounded-lg"
        />

        <button
          onClick={runSimulation}
          className="bg-teal-600 text-white w-full py-3 rounded-lg"
        >
          Run Simulation
        </button>
      </div>

      {/* Simulations Table */}
      {simulations.length > 0 && (
        <div className="m-3 max-w-3xl mx-auto overflow-x-auto">
          <h3 className="text-xl font-semibold mb-2">Simulations</h3>
          <table className="min-w-full bg-gray-100 rounded shadow">
            <thead className="bg-gray-300">
              <tr>
                <th className="py-2 px-4 border border-white text-left">Date</th>
                <th className="py-2 px-4 border border-white text-left">Revenue</th>
                <th className="py-2 px-4 border border-white text-left">Expenses</th>
                <th className="py-2 px-4 border border-white text-left">Loans</th>
                <th className="py-2 px-4 border border-white text-left">CRB Score</th>
                <th className="py-2 px-4 border border-white text-left">Readiness Score</th>
                <th className="py-2 px-4 border border-white text-left">Gaps</th>
              </tr>
            </thead>
            <tbody className="bg-gray-400">
              {simulations.map((sim) => (
                <tr key={sim.id} className="border-b">
                  <td className="py-2 border border-white px-4">{sim.date}</td>
                  <td className="py-2 border border-white px-4">{sim.monthly_revenue}</td>
                  <td className="py-2 border border-white px-4">{sim.monthly_expenses}</td>
                  <td className="py-2 border border-white px-4">{sim.existing_loans}</td>
                  <td className="py-2 border border-white px-4">{sim.credit_score}</td>
                  <td className="py-2 border border-white px-4">{sim.readiness_score}%</td>
                  <td className="py-2 border border-white px-4">{sim.gaps.length > 0 ? sim.gaps.join(", ") : "None"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Simulator;