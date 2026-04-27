import { useState } from "react";
import { useNavigate } from "react-router-dom";


function LoanSimulator() {
  const [amount, setAmount] = useState("");
  const [interest, setInterest] = useState("");
  const [tenure, setTenure] = useState("");
  const [repayment, setRepayment] = useState(null);
  const navigate = useNavigate();
  

  const calculateRepayment = () => {
    if (!amount || !interest || !tenure) return alert("Please fill all fields");

    const monthlyRate = interest / 100 / 12;
    const monthlyRepayment = (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -tenure));
    setRepayment(monthlyRepayment.toFixed(0));
  };

  return (
    <div className="max-w-xl mx-auto m-6 p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Loan Simulator</h2>

      <div className="space-y-4 mb-6">
        <input
          type="number"
          placeholder="Loan Amount (KES)"
          className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <input
          type="number"
          placeholder="Interest Rate (%)"
          className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
        />

        <input
          type="number"
          placeholder="Loan Tenure (Months)"
          className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          value={tenure}
          onChange={(e) => setTenure(e.target.value)}
        />
      </div>

      <button
        onClick={calculateRepayment}
        className="bg-gradient-to-r from-teal-600 to-teal-500 text-white w-full py-3 rounded-lg font-semibold hover:scale-105 transition transform"
      >
        Calculate Repayment
      </button>

      {repayment && (
        <div className="mt-6 p-4 bg-teal-50 border-l-4 border-teal-500 rounded">
          <h3 className="text-lg font-bold text-gray-700 mb-2">Estimated Monthly Repayment</h3>
          <p className="text-2xl font-bold text-teal-700">KES {repayment}</p>
        </div>
      )}

      {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mt-4">

          <button
            onClick={() => navigate("/dashboard")}
            className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-500 transition"
          >
            Return to Dashboard
          </button>

          <button
            onClick={() => navigate("/reports")}
            className="bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition"
          >
            View Reports
          </button>

        </div>
    </div>
    
  );
}


       

export default LoanSimulator;