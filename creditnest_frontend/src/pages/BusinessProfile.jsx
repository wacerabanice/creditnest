import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function BusinessProfile() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    years: "",
    industry: "",
    location: "",
    employees: "",
    structure: "",
    licenses: ""
  });

  // Fetch existing profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const res = await API.get("/business-profile");
        if (res.data) setForm(res.data);
      } catch (err) {
        console.error("Fetch profile error:", err);
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post("/business-profile", form);
      window.dispatchEvent(new Event("scoreUpdated"));
      alert("Business Profile saved ✅");
      navigate("/dashboard");
    } catch (err) {
      console.error("Save profile error:", err);
      setError("Failed to save profile");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="max-w-xl mx-auto p-8 bg-white rounded shadow mt-8">
      <h2 className="text-2xl font-bold mb-4">Business Profile</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          name="years"
          placeholder="Years in operation"
          value={form.years}
          onChange={handleChange}
          className="w-full p-3 border rounded"
        />
        <input
          name="industry"
          placeholder="Industry"
          value={form.industry}
          onChange={handleChange}
          className="w-full p-3 border rounded"
        />
        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          className="w-full p-3 border rounded"
        />
        <input
          name="employees"
          placeholder="Number of employees"
          value={form.employees}
          onChange={handleChange}
          className="w-full p-3 border rounded"
        />
        <select
          name="structure"
          value={form.structure}
          onChange={handleChange}
          className="w-full p-3 border rounded"
        >
          <option value="">Select Structure</option>
          <option value="Sole Proprietorship">Sole Proprietorship</option>
          <option value="Limited Company">Limited Company</option>
        </select>
        <input
          name="licenses"
          placeholder="Business Licenses"
          value={form.licenses}
          onChange={handleChange}
          className="w-full p-3 border rounded"
        />
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="text-gray-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-teal-600 text-white px-6 py-2 rounded"
          >
            Save & Return
          </button>
        </div>
      </form>
    </div>
  );
}

export default BusinessProfile;