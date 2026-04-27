import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Management() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    experience: "",
    education: "",
    directors: "",
    succession: ""
  });

  
  // Fetch existing profile on mount
  useEffect(() => {
    const fetchMgtProfile = async () => {
      setLoading(true);
      try {
        const res = await API.get("/management");
        if (res.data) setForm(res.data);
      } catch (err) {
        console.error("Fetch Management profile error:", err);
        setError("Failed to load Management profile");
      } finally {
        setLoading(false);
      }
    };
    fetchMgtProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post("/management", form);
      window.dispatchEvent(new Event("scoreUpdated"));
      alert("Management Profile saved ✅");
      navigate("/dashboard");
    } catch (err) {
      setError("Failed to save management profile");
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <div className="max-w-xl mx-auto p-8 bg-white rounded shadow mt-8">
       {/* 🔥 LOADING STATE */}
        {loading && (
          <p className="text-blue-600 mb-4">
            Loading...
          </p>
        )}

        {/* ❌ ERROR STATE */}
        {error && (
          <p className="text-red-600 mb-4">
            {error}
          </p>
        )}
      <h2 className="text-2xl font-bold mb-4">Management & Ownership</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input name="experience" placeholder="Years of experience" value={form.experience} onChange={handleChange} className="w-full p-3 border rounded" />
        <input name="education" placeholder="Education" value={form.education} onChange={handleChange} className="w-full p-3 border rounded" />
        <input name="directors" placeholder="Number of Directors" value={form.directors} onChange={handleChange} className="w-full p-3 border rounded" />
        <select name="succession" value={form.succession} onChange={handleChange} className="w-full p-3 border rounded">
          <option value="">Select Succession</option>
          <option value="true">Succession Plan Available</option>
          <option value="false">No Succession Plan</option>
        </select>
        <div className="flex justify-between">
          <button type="button" onClick={() => navigate("/dashboard")} className="text-gray-500">Cancel</button>
          <button type="submit" className="bg-teal-600 text-white px-6 py-2 rounded">Save & Return</button>
        </div>
      </form>
    </div>
  );
}

export default Management;