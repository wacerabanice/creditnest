import { useEffect, useState } from "react";

function Reports() {
  const [simulations, setSimulations] = useState([]);

  useEffect(() => {
    const user_id = Number(localStorage.getItem("user_id"));

    const allSims = JSON.parse(localStorage.getItem("simulatorResults")) || {};
    const userSims = allSims[user_id] || [];

    setSimulations(userSims);
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Simulation Reports</h2>

      {simulations.length === 0 ? (
        <p>No simulations yet.</p>
      ) : (
        simulations.map((sim, index) => (
          <div key={index} className="bg-white p-4 mb-4 shadow rounded-lg">
            <p><strong>Date:</strong> {sim.date}</p>
            <p><strong>Readiness Score:</strong> {sim.readiness_score}%</p>
            <p><strong>Revenue:</strong> {sim.monthly_revenue}</p>
            <p><strong>Expenses:</strong> {sim.monthly_expenses}</p>
            <p><strong>Loans:</strong> {sim.existing_loans}</p>
            <p><strong>Credit Score:</strong> {sim.credit_score}</p>

            <p>
              <strong>Gaps:</strong>{" "}
              {sim.gaps.length ? sim.gaps.join(", ") : "None"}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default Reports;