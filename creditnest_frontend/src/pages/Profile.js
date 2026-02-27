import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../services/api"; // make sure this exists

function Profile() {
  const location = useLocation();
  const navigate = useNavigate();

  // Auto set mode based on URL
  const [mode, setMode] = useState("signup");

  useEffect(() => {
    if (location.pathname === "/login") setMode("login");
    else setMode("signup");
  }, [location.pathname]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // SIGNUP
  const handleSignup = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) return alert("All fields required");
    if (!isValidEmail(email)) return alert("Invalid email");

    try {
      const { data } = await API.post("/signup", { name, email, password });
<<<<<<< HEAD
      alert(data.message || "Signup successful!");
=======
      alert(data.message || "Signup successful! Please login");
>>>>>>> ad4e5faba30d9d300964c936652cfc85273feaa9
      setName(""); setEmail(""); setPassword("");
      navigate("/login"); // redirect to login
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Error creating account");
    }
  };

  // LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) return alert("All fields required");
    if (!isValidEmail(email)) return alert("Invalid email");

    try {
      const res = await API.post("/login", { email, password });
      localStorage.setItem("user_id", res.data.id);
      localStorage.setItem(
        "user",
        JSON.stringify({ name: res.data.name, email: res.data.email })
      );
      alert(`Welcome back, ${res.data.name}!`);
      navigate("/"); // redirect to dashboard
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Invalid credentials");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-teal-200 rounded-2xl shadow-lg space-y-6 mt-10">
      <div className="flex justify-between mb-4">
        <button
          className={`px-4 py-2 rounded-xl ${
            mode === "signup" ? "bg-teal-600 text-white" : "bg-teal-100"
          }`}
          onClick={() => navigate("/signup")}
        >
          Sign Up
        </button>
        <button
          className={`px-4 py-2 rounded-xl ${
            mode === "login" ? "bg-teal-600 text-white" : "bg-teal-100"
          }`}
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </div>

      {mode === "signup" ? (
        <div className="space-y-4">
          <input
            className="w-full bg-white placeholder-green-900 p-4 rounded-2xl shadow-lg"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="w-full bg-white placeholder-green-900 p-4 rounded-2xl shadow-lg"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full bg-white p-4 placeholder-green-900 rounded-2xl shadow-lg"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="w-full bg-teal-600 hover:bg-teal-500 text-white font-semibold p-3 rounded-xl transition"
            onClick={handleSignup}
          >
            Create Profile
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <input
            className="w-full bg-white placeholder-green-900 p-4 rounded-2xl shadow-lg"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full bg-white placeholder-green-900 p-4 rounded-2xl shadow-lg"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="w-full bg-teal-600 hover:bg-teal-500 text-white font-semibold p-3 rounded-xl transition"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
}

export default Profile;
