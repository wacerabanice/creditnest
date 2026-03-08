import { useEffect, useState } from "react";

function Reports() {
  const [simulations, setSimulations] = useState([]);

  // Load simulations for the logged-in user
  useEffect(() => {
    const user_id = Number(localStorage.getItem("user_id"));
    if (!user_id) return;

    try {
      const allSims = JSON.parse(localStorage.getItem("simulatorResults")) || [];
      const userSims = allSims.filter((s) => s.user_id === user_id);
      setSimulations(userSims);
    } catch (e) {
      console.warn("Error reading simulations from localStorage", e);
    }
  }, []);

  // Summary stats
  const totalSimulations = simulations.length;
  const user_id = Number(localStorage.getItem("user_id"));
  const userSimulations = simulations.filter(sim => sim.user_id === user_id);

const averageReadiness = totalSimulations
  ? Math.round(
      userSimulations.reduce((sum, sim) => sum + Number(sim.readiness_score || 0), 0) /
        totalSimulations
    )
  : 0;

  const latestGaps =
    simulations.length > 0
      ? simulations[0].gaps.length > 0
        ? simulations[0].gaps.join(", ")
        : "None"
      : "No simulations yet";

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">Reports</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-400 text-black p-4 rounded-xl shadow">
          <h3 className="text-xl font-semibold">Total Simulations</h3>
          <p className="text-2xl mt-2">{totalSimulations}</p>
        </div>
        <div className="bg-gray-400 text-black p-4 rounded-xl shadow">
          <h3 className="text-xl font-semibold">Average Readiness Score</h3>
          <p className="text-2xl font-bold mt-2">{averageReadiness}%</p>
        </div>
        <div className="bg-gray-400 text-black p-4 rounded-xl shadow">
          <h3 className="text-xl font-semibold">Latest Gaps</h3>
          <p className="text-lg mt-2">{latestGaps}</p>
        </div>
      </div>

      {/* Table of Simulations */}
      {simulations.length > 0 ? (
        <div className="overflow-x-auto m-4 mt-4">
          <table className="min-w-full border border-gray-400 bg-white rounded-lg shadow">
            <thead className="bg-gray-300 border-b border-gray-400">
              <tr>
                <th className="py-2 px-4 border border-gray-400">Date</th>
                <th className="py-2 px-4 border border-gray-400">Revenue</th>
                <th className="py-2 px-4 border border-gray-400">Expenses</th>
                <th className="py-2 px-4 border border-gray-400">Loans</th>
                <th className="py-2 px-4 border border-gray-400">CRB Score</th>
                <th className="py-2 px-4 border border-gray-400">Readiness Score</th>
                <th className="py-2 px-4 border border-gray-400">Gaps</th>
              </tr>
            </thead>
            <tbody>
              {simulations.map((sim) => (
                <tr key={sim.id} className="border-b border-gray-400 hover:bg-gray-100">
                  <td className="py-2 px-4 border border-gray-400">{sim.date}</td>
                  <td className="py-2 px-4 border border-gray-400">{sim.monthly_revenue}</td>
                  <td className="py-2 px-4 border border-gray-400">{sim.monthly_expenses}</td>
                  <td className="py-2 px-4 border border-gray-400">{sim.existing_loans}</td>
                  <td className="py-2 px-4 border border-gray-400">{sim.credit_score}</td>
                  <td className="py-2 px-4 border border-gray-400">{sim.readiness_score}%</td>
                  <td className="py-2 px-4 border border-gray-400">{sim.gaps.length ? sim.gaps.join(", ") : "None"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500 mt-4">No simulations found. Run a simulation to see your reports.</p>
      )}
    </div>
  );
}

export default Reports;