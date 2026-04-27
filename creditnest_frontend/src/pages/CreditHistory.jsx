import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function CreditHistory() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    crb_score: "",
    defaults: "",
    restructured_loans: "",
    days_past_due: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCreditData = async () => {
      try {
        const res = await API.get(`/credit-history`);
        if (res.data) setForm(res.data);
      }  catch (err) {
        console.error("Fetch Credit  profile error:", err);
        setError("Failed to load Credit profile");
      } finally {
        setLoading(false);
      }
    };
    fetchCreditData();
  }, []);

  const handleChange = (e) => {
  setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post(`/credit-history`, form);
      window.dispatchEvent(new Event("scoreUpdated"));
      alert("Credit History saved ✅");
      navigate("/dashboard");
    } catch (err) {
      setError("Failed to save Credit profile");
    } finally {
      setLoading(false);
    }
  };

   <p>{loading ? "Loading..." : "Done"}</p>
   {error && <p style={{ color: "red" }}>{error}</p>}


  return (
    <div className="max-w-xl mx-auto p-8 bg-white rounded shadow mt-8">
      <h2 className="text-2xl font-bold mb-4">Credit History</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input name="crbScore" placeholder="CRB Score" value={form.crb_score} onChange={handleChange} className="w-full p-3 border rounded" />
        <input name="defaults" placeholder="Defaults" value={form.defaults} onChange={handleChange} className="w-full p-3 border rounded" />
        <input name="restructuredLoans" placeholder="Restructured Loans" value={form.restructured_loans} onChange={handleChange} className="w-full p-3 border rounded" />
        <input name="daysPastDue" placeholder="Days Past Due" value={form.days_past_due} onChange={handleChange} className="w-full p-3 border rounded" />
        <div className="flex justify-between">
          <button type="button" onClick={() => navigate("/dashboard")} className="text-gray-500">Cancel</button>
          <button type="submit" className="bg-teal-600 text-white px-6 py-2 rounded">Save & Return</button>
        </div>
      </form>
    </div>
  );
}

export default CreditHistory;