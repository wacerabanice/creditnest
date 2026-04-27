import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Collateral() {

  const navigate = useNavigate();

  const [data, setData] = useState({
    collateralType: "",
    marketValue: "",
    forcedSaleValue: "",
    loanAmount: ""
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  const ltv = data.forcedSaleValue && data.loanAmount
    ? ((data.loanAmount / data.forcedSaleValue) * 100).toFixed(1)
    : 0;

  const handleSubmit = (e) => {
    e.preventDefault();

    const collateralData = {
      ...data,
      ltv
    };

    localStorage.setItem("collateralData", JSON.stringify(collateralData));

    alert("Collateral data saved ✅");

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-start pt-16">

      <div className="bg-white shadow-lg rounded-xl w-full max-w-xl p-8">

        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Collateral Strength
        </h2>

        <p className="text-gray-500 mb-6">
          Collateral helps lenders reduce risk when issuing loans.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Collateral Type */}
          <div>
            <label className="text-sm text-gray-600">
              Collateral Type
            </label>
            <select
              name="collateralType"
              value={data.collateralType}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-1"
            >
              <option value="">Select type</option>
              <option value="land">Land</option>
              <option value="building">Building</option>
              <option value="vehicle">Vehicle</option>
              <option value="equipment">Equipment</option>
              <option value="cash">Cash Deposit</option>
            </select>
          </div>

          {/* Market Value */}
          <div>
            <label className="text-sm text-gray-600">
              Market Value
            </label>
            <input
              type="number"
              name="marketValue"
              value={data.marketValue}
              onChange={handleChange}
              placeholder="e.g. 5,000,000"
              className="w-full border rounded-lg p-3 mt-1 focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>

          {/* Forced Sale Value */}
          <div>
            <label className="text-sm text-gray-600">
              Forced Sale Value
            </label>
            <input
              type="number"
              name="forcedSaleValue"
              value={data.forcedSaleValue}
              onChange={handleChange}
              placeholder="e.g. 3,500,000"
              className="w-full border rounded-lg p-3 mt-1 focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>

          {/* Loan Amount */}
          <div>
            <label className="text-sm text-gray-600">
              Requested Loan Amount
            </label>
            <input
              type="number"
              name="loanAmount"
              value={data.loanAmount}
              onChange={handleChange}
              placeholder="e.g. 2,000,000"
              className="w-full border rounded-lg p-3 mt-1 focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>

          {/* LTV Display */}
          <div className="bg-gray-50 border rounded-lg p-4">

            <p className="text-gray-600 text-sm">
              Loan to Value (LTV)
            </p>

            <h3 className="text-2xl font-bold text-teal-600">
              {ltv}%
            </h3>

            <p className="text-xs text-gray-400">
              Most banks prefer LTV below 70%
            </p>

          </div>

          {/* Buttons */}
          <div className="flex justify-between pt-4">

            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition"
            >
              Save & Return to Dashboard
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default Collateral;