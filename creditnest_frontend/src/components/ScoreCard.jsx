// ScoreCard.jsx
import { useEffect, useState } from "react";

function ScoreCard() {
  const [score, setScore] = useState(null);
  const [status, setStatus] = useState("");
  const [categories, setCategories] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScore = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5000/api/loan-score", {
          method: "GET",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Failed to fetch score");

        setScore(data.score);
        setStatus(data.status);
        setCategories(data.categories || {});
      } catch (err) {
        console.error("Score fetch error:", err);
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

  if (loading) return <p>Calculating loan readiness score...</p>;

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">Loan Readiness Score</h2>
      <p className={`text-4xl font-bold ${getColor(score)}`}>{score ?? "--"}</p>
      <p className="text-gray-500 mb-4">{status}</p>

      <h3 className="font-semibold mt-4 mb-2">Category Breakdown:</h3>
      <ul className="space-y-1">
        {Object.entries(categories).map(([cat, val]) => (
          <li key={cat} className="flex justify-between">
            <span className="capitalize">{cat.replace("_", " ")}</span>
            <span className={getColor(val)}>{val}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ScoreCard;