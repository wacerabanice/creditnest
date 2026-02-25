import React, { useEffect, useState } from "react";

function Reports() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const savedReports = JSON.parse(localStorage.getItem("simulatorResults")) || [];
    setReports(savedReports);
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Reports</h1>

      {reports.length === 0 ? (
        <p className="text-gray-600">No reports found. Run a simulation first!</p>
      ) : (
        <div className="space-y-4">
          {reports.map((report, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-md">
              <p><strong>Date:</strong> {report.date || "N/A"}</p>
              <p><strong>Readiness Score:</strong> {report.readiness_score ?? 0}%</p>
              <p><strong>Monthly Revenue:</strong> {report.monthly_revenue}</p>
              <p><strong>Monthly Expenses:</strong> {report.monthly_expenses}</p>
              <p><strong>Existing Loans:</strong> {report.existing_loans}</p>
              <p><strong>Credit Score:</strong> {report.credit_score}</p>
              <p><strong>Loan Gaps:</strong> {report.gaps?.join(", ") || "None"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Reports;