import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../services/api";

function Profile() {
  const location = useLocation();
  const navigate = useNavigate();

  const [mode, setMode] = useState("signup"); 
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Switch mode based on URL
  useEffect(() => {
    if (location.pathname === "/login") setMode("login");
    else setMode("signup");
  }, [location.pathname]);

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // ----------------- SIGNUP -----------------
  const handleSignup = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) return alert("All fields are required");
    if (!isValidEmail(email)) return alert("Invalid email");

    console.log("Signup clicked", { name, email, password });

    try {
      const { data } = await API.post("/signup", {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password: password.trim(),
      });

      console.log("Signup response:", data);
      alert(`Welcome ${data.user.name}! Your account has been created.`);
      // Redirect to login after signup
      navigate("/login");
    } catch (err) {
      console.error("Signup API error:", err.response?.data || err.message);
      alert(err.response?.data?.error || "Signup failed");
    }
  };

  // ----------------- LOGIN -----------------
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) return alert("All fields required");
    if (!isValidEmail(email)) return alert("Invalid email");

    console.log("Login clicked", { email, password });

    try {
      const { data } = await API.post("/login", {
        email: email.trim().toLowerCase(),
        password: password.trim(),
      });

      console.log("Login response:", data);
      alert(`Welcome back, ${data.name}!`);
      localStorage.setItem("user_id", data.id); // store user id
      // Redirect to dashboard/home after login
      navigate("/");
    } catch (err) {
      console.error("Login API error:", err.response?.data || err.message);
      alert(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-teal-200 rounded-2xl shadow-lg space-y-6 mt-10">
      <div className="flex justify-between mb-4">
        <button
          className={`px-4 py-2 rounded-xl ${mode === "signup" ? "bg-teal-600 text-white" : "bg-teal-100"}`}
          onClick={() => navigate("/signup")}
        >
          Sign Up
        </button>
        <button
          className={`px-4 py-2 rounded-xl ${mode === "login" ? "bg-teal-600 text-white" : "bg-teal-100"}`}
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