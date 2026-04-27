import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Cashflow() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    net_cashflow: "",
    loan_payments: "",
    dscr: ""
  });

  const [net_cashflow, setIncome] = useState("");
  const [loan_payments, setLoanPayments] = useState("");

  const dscr = loan_payments ? (net_cashflow / loan_payments).toFixed(2) : 0;
 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchCashflowData = async () => {
      try {
        const res = await API.get(`/cashflow`);
      if (res.data) setForm(res.data);
      }  catch (err) {
        console.error("Fetch Cashflow profile error:", err);
        setError("Failed to load Cashflow profile");
      } finally {
        setLoading(false);
      }
    };
    fetchCashflowData();
  }, []);

  


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post(`/cashflow`, form);
      window.dispatchEvent(new Event("scoreUpdated"));
      alert("Cashflow Profilesaved ✅");
      navigate("/dashboard");
    } catch (err) {
      setError("Failed to save Cashflow profile");
    } finally {
      setLoading(false);
    }
  };

   <p>{loading ? "Loading..." : "Done"}</p>
   {error && <p style={{ color: "red" }}>{error}</p>}

  return (
    <div className="max-w-xl mx-auto p-8 bg-white rounded shadow mt-8">
      <h2 className="text-2xl font-bold mb-4">Cashflow</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input type="number" placeholder="Net Operating Cashflow" value={form.net_cashflow} onChange={(e)=>setIncome(Number(e.target.value))} className="w-full p-3 border rounded" />
        <input type="number" placeholder="Loan Payments" value={form.loan_payments} onChange={(e)=>setLoanPayments(Number(e.target.value))} className="w-full p-3 border rounded" />
        <div className="bg-gray-50 border p-4 rounded">
          <p className="text-gray-600 text-sm">Debt Service Coverage Ratio</p>
          <h3 className="text-2xl font-bold text-teal-600">{dscr}</h3>
        </div>
        <div className="flex justify-between">
          <button type="button" onClick={() => navigate("/dashboard")} className="text-gray-500">Cancel</button>
          <button type="submit" className="bg-teal-600 text-white px-6 py-2 rounded">Save & Return</button>
        </div>
      </form>
    </div>
  );
}

export default Cashflow;