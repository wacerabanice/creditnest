import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [user, setUser] = useState(null);
  const [simulatorResults, setSimulatorResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);

    const storedResults = JSON.parse(localStorage.getItem("simulatorResults")) || [];
    setSimulatorResults(storedResults);
  }, []);

  const totalSimulations = simulatorResults.length;
  const readinessScore =
    totalSimulations > 0
      ? Math.round(simulatorResults.reduce((sum, s) => sum + (s.readiness_score || 0), 0) / totalSimulations)
      : 0;
  const loanGaps =
    totalSimulations > 0
      ? simulatorResults.reduce((sum, s) => sum + (s.gaps?.length || 0), 0)
      : 0;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-6">
        Welcome back, {user?.name ?? "Guest"}!
      </h2>

      {totalSimulations === 0 ? (
        <div className="bg-white p-6 rounded-2xl shadow-md text-center">
          <p className="text-gray-600 mb-4">
            Your dashboard is empty. Run the simulator to see results!
          </p>
          <button
            onClick={() => navigate("/simulator")}
            className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-6 rounded-lg transition"
          >
            Go to Simulator
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition duration-300">
            <h2 className="text-gray-600">Readiness Score</h2>
            <p className="text-4xl font-bold text-green-500 mt-4">
              {readinessScore}%
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition duration-300">
            <h2 className="text-gray-600">Total Simulations</h2>
            <p className="text-4xl font-bold text-blue-500 mt-4">
              {totalSimulations}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition duration-300">
            <h2 className="text-gray-600">Loan Gaps</h2>
            <p className="text-4xl font-bold text-red-500 mt-4">
              {loanGaps} Issue{loanGaps !== 1 ? "s" : ""}
            </p>
          </div>

          <button
            onClick={() => navigate("/simulator")}
            className="col-span-3 bg-teal-600 hover:bg-teal-500 text-white py-3 rounded-lg mt-6 transition"
          >
            Run New Simulation
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;