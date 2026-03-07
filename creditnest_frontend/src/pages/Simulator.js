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

  const user_id = Number(localStorage.getItem("user_id")); // current user

  // Load last simulation on mount
  useEffect(() => {
    if (!user_id) return;

    const fetchSimulations = async () => {
      try {
        const { data } = await API.get(`/simulate/${user_id}`);
        if (data.simulations && data.simulations.length > 0)
          setResult(data.simulations[0]); // latest first
      } catch (err) {
        console.error("Fetch simulations error:", err);
      }
    };

    fetchSimulations();
  }, [user_id]);

  const runSimulation = async () => {
    if (!revenue || !expenses || !loans || !creditScore) {
      return alert("All fields are required");
    }

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
      const gaps = Array.isArray(data.gaps) ? data.gaps : String(data.gaps).split(";").map(g => g.trim());

      const simulation = {
        ...data.simulation,
        gaps,
        date: new Date(data.simulation.created_at).toLocaleString()
      };

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

        <input placeholder="Monthly Revenue" value={revenue} onChange={(e) => setRevenue(e.target.value)} type="number" className="border border-gray-300 p-3 w-full mb-4 rounded-lg"/>
        <input placeholder="Monthly Expenses" value={expenses} onChange={(e) => setExpenses(e.target.value)} type="number" className="border border-gray-300 p-3 w-full mb-4 rounded-lg"/>
        <input placeholder="Existing Loans" value={loans} onChange={(e) => setLoans(e.target.value)} type="number" className="border border-gray-300 p-3 w-full mb-4 rounded-lg"/>
        <input placeholder="Credit Score" value={creditScore} onChange={(e) => setCreditScore(e.target.value)} type="number" className="border border-gray-300 p-3 w-full mb-6 rounded-lg"/>

        <button onClick={runSimulation} className="bg-gradient-to-r from-teal-600 to-teal-500 text-white w-full py-3 rounded-lg hover:scale-105 transition">
          Run Simulation
        </button>
      </div>

      {result && (
        <div className="max-w-xl space-y-4 mx-auto bg-teal-300 p-10 rounded-2xl shadow-lg">
          <h3 className="text-lg font-semibold">Latest Simulation</h3>
          <p><strong>Date:</strong> {result.date}</p>
          <p><strong>Readiness Score:</strong> {result.readiness_score}%</p>
          <p><strong>Gaps:</strong> {result.gaps.length > 0 ? result.gaps.join(", ") : "None"}</p>
        </div>
      )}
    </div>
  );
}

export default Simulator;