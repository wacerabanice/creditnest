import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function LoanScore() {
  const [score, setScore] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [breakdown, setBreakdown] = useState({}); // for mini category scores
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchScore = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/loan-score", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Example response structure:
        // { score: 78, status: "excellent", breakdown: { credit: 80, banking: 70, cashflow: 75, ... } }
        const data = response.data;
        setScore(data.score);
        setStatus(data.status);
        setBreakdown(data.breakdown || {});
      } catch (err) {
        console.error("Error fetching score:", err);
        setError("Failed to fetch loan score. Try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchScore();
  }, []);

  const getColor = (val) => {
    if (val >= 75) return "text-green-600";
    if (val >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  const getMessage = (val) => {
    if (val >= 75) return "Excellent";
    if (val >= 50) return "Moderate";
    return "Low";
  };

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-xl shadow">
        <p className="text-gray-500">Calculating loan readiness score...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-xl shadow text-red-600">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-start pt-16">
    <div className="bg-white shadow-lg rounded-xl w-full max-w-2xl p-8">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        Loan Readiness Score
      </h2>

      <div className="flex items-center justify-between">
        <div>
          <p className={`text-4xl font-bold ${getColor(score)}`}>{score ?? "--"}</p>
          <p className="text-gray-500 mt-1">{getMessage(score)} loan readiness</p>
        </div>

        {/* Score Circle */}
        <div className="relative w-24 h-24">
          <svg className="w-24 h-24 transform -rotate-90">
            <circle
              cx="48"
              cy="48"
              r="40"
              stroke="#e5e7eb"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="48"
              cy="48"
              r="40"
              stroke="#0f766e"
              strokeWidth="8"
              fill="none"
              strokeDasharray="251"
              strokeDashoffset={251 - (score / 100) * 251}
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {/* Mini Breakdown */}
      <div className="mt-6">
        <h3 className="font-semibold text-gray-700 mb-2">Category Breakdown</h3>
        {Object.keys(breakdown).length === 0 && (
          <p className="text-gray-500">No breakdown available</p>
        )}
        <ul className="text-sm text-gray-500 list-disc ml-5">
          {Object.entries(breakdown).map(([key, value]) => (
            <li key={key}>
              <span className="capitalize">{key}</span>:{" "}
              <span className={getColor(value)}>{value}</span> ({getMessage(value)})
            </li>
          ))}
        </ul>
      </div>

      {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mt-4">

          <button
            onClick={() => navigate("/dashboard")}
            className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-500 transition"
          >
            Return to Dashboard
          </button>

          <button
            onClick={() => navigate("/loan-simulator")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-500 transition"
          >
            View Loan Simulator
          </button>

          <button
            onClick={() => navigate("/reports")}
            className="bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition"
          >
            View Reports
          </button>
          </div>
    </div>
    </div>
  );
}

export default LoanScore;