import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function BankingBehaviour() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    monthly_deposits: "",
    avg_balance: "",
    txn_frequency: "",
    cheque_returns: ""
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBankingData = async () => {
      setLoading(true);
      setError(""); // reset previous errors

      try {
        const res = await API.get("/banking");

        if (res.data) {
          setForm({
            monthly_deposits: res.data.monthly_deposits ?? "",
            avg_balance: res.data.avg_balance ?? "",
            txn_frequency: res.data.txn_frequency ?? "",
            cheque_returns: res.data.cheque_returns ?? ""
          });
        }

      } catch (err) {
        console.error("Fetch Banking Behaviour profile error:", err);
        setError("Failed to load Banking Behaviour profile");

      } finally {
        setLoading(false);
      }
    };

    fetchBankingData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await API.post("/banking", form);
      window.dispatchEvent(new Event("scoreUpdated"));
      alert("Banking Profile saved ✅");
      navigate("/dashboard");

    } catch (err) {
      console.error(err);
      setError("Failed to save banking profile");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-start pt-16">

      <div className="bg-white shadow-lg rounded-xl w-full max-w-xl p-8">

        {/* 🔥 LOADING STATE */}
        {loading && (
          <p className="text-blue-600 mb-4">
            Loading banking profile...
          </p>
        )}

        {/* ❌ ERROR STATE */}
        {error && (
          <p className="text-red-600 mb-4">
            {error}
          </p>
        )}

        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Banking Behaviour
        </h2>

        <p className="text-gray-500 mb-6">
          Lenders review bank activity to understand financial discipline and stability.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Monthly Deposits */}
          <div>
            <label className="text-sm text-gray-600">
              Monthly Deposits
            </label>
            <input
              type="number"
              name="monthly_deposits"
              value={form.monthly_deposits || ""}
              onChange={handleChange}
              disabled={loading}
              className="w-full border rounded-lg p-3 mt-1"
            />
          </div>

          {/* Average Balance */}
          <div>
            <label className="text-sm text-gray-600">
              Average Bank Balance
            </label>
            <input
              type="number"
              name="avg_balance"
              value={form.avg_balance || ""}
              onChange={handleChange}
              disabled={loading}
              className="w-full border rounded-lg p-3 mt-1"
            />
          </div>

          {/* Transaction Frequency */}
          <div>
            <label className="text-sm text-gray-600">
              Transaction Frequency
            </label>
            <select
              name="txn_frequency"
              value={form.txn_frequency}
              onChange={handleChange}
              disabled={loading}
              className="w-full border rounded-lg p-3 mt-1"
            >
              <option value="">Select option</option>
              <option value="low">Low</option>
              <option value="moderate">Moderate</option>
              <option value="high">High</option>
            </select>
          </div>

          {/* Cheque Returns */}
          <div>
            <label className="text-sm text-gray-600">
              Cheque Returns
            </label>
            <select
              name="cheque_returns"
              value={form.cheque_returns}
              onChange={handleChange}
              disabled={loading}
              className="w-full border rounded-lg p-3 mt-1"
            >
              <option value="">Select option</option>
              <option value="none">None</option>
              <option value="few">1–2</option>
              <option value="many">Frequent</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-between pt-4">

            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="text-gray-500"
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-2 rounded-lg text-white ${
                loading ? "bg-gray-400" : "bg-teal-600 hover:bg-teal-700"
              }`}
            >
              {loading ? "Saving..." : "Save & Return"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default BankingBehaviour;