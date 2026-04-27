import { useEffect, useState } from "react";
import API from "../services/api";

function Reports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem("token"); // fetch token

        const res = await API.get("/reports", {
          headers: { Authorization: `Bearer ${token}` }
        });

        setReports(res.data);
      } catch (err) {
        console.error("Fetch reports error:", err);
        setError("Failed to load reports");
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Credit Assessments</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && (
        <div className="bg-white shadow rounded-xl overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-teal-600 text-white">
              <tr>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Score</th>
                <th className="p-3 text-left">Gaps</th>
              </tr>
            </thead>
            <tbody>
              {reports.length === 0 ? (
                <tr>
                  <td colSpan="3" className="p-4 text-center">No reports found</td>
                </tr>
              ) : (
                reports.map((r) => (
                  <tr key={r.id} className="border-b">
                    <td className="p-3">{new Date(r.date).toLocaleDateString()}</td>
                    <td className="p-3 font-semibold">{r.score}</td>
                    <td className="p-3">{r.gaps}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Reports;