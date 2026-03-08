import React from "react";

function Education() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Education</h1>
      <p className="text-gray-700 mb-4">
        Access educational content to improve your credit readiness and financial knowledge.
      </p>

      <div className="bg-white p-6 rounded-2xl shadow-md space-y-4">
        <div className="p-4 border rounded-lg hover:bg-teal-50 transition">
          <h2 className="font-semibold text-lg">Lesson 1: Understanding Credit Scores</h2>
          <p className="text-gray-600 text-sm">Learn what affects your credit score and how to improve it.</p>
        </div>
        <div className="p-4 border rounded-lg hover:bg-teal-50 transition">
          <h2 className="font-semibold text-lg">Lesson 2: Loan Readiness Tips</h2>
          <p className="text-gray-600 text-sm">Practical steps to prepare for loan applications.</p>
        </div>
        <div className="p-4 border rounded-lg hover:bg-teal-50 transition">
          <h2 className="font-semibold text-lg">Lesson 3: Simulator Guide</h2>
          <p className="text-gray-600 text-sm">How to run simulations and interpret results effectively.</p>
        </div>
      </div>
    </div>
  );
}

export default Education;