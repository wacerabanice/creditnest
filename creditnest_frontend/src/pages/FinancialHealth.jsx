import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function FinancialHealth() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
    revenue: "",
    expenses: "",
    profitMargin: ""
  });

 

  useEffect(() => {
    const fetchFinancialProfile = async () => {
      setLoading(true);
      try {
        const res = await API.get("/financial-health");
        if (res.data) setForm(res.data);
      } catch (err) {
        console.error("Fetch Financial profile error:", err);
        setError("Failed to load Financial profile");
      } finally {
        setLoading(false);
      }
    };
    fetchFinancialProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post("/financial-health", form);
      window.dispatchEvent(new Event("scoreUpdated"));
      alert("Financial Profile saved ✅");
      navigate("/dashboard");
    } catch (err) {
      setError("Failed to save Financial Health profile");
    } finally {
      setLoading(false);
    }
  };

  return (
        <div className="max-w-xl mx-auto p-8 bg-white rounded shadow mt-8">
      <h2 className="text-2xl font-bold mb-4">Financial Health Check</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input name="revenue" placeholder="Monthly Revenue" value={form.revenue} onChange={handleChange} className="w-full p-3 border rounded" />
        <input name="expenses" placeholder="Monthly Expenses" value={form.expenses} onChange={handleChange} className="w-full p-3 border rounded" />
        <input name="profitMargin" placeholder="Monthly Profit Margins" value={form.profitMargin} onChange={handleChange} className="w-full p-3 border rounded" />
            <div className="flex justify-between">
          <button type="button" onClick={() => navigate("/dashboard")} className="text-gray-500">Cancel</button>
          <button type="submit" className="bg-teal-600 text-white px-6 py-2 rounded">Save & Return</button>
        </div>
      </form>
    </div>
  );
}

export default FinancialHealth;