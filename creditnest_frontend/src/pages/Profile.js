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
    setMode(location.pathname === "/login" ? "login" : "signup");
  }, [location.pathname]);

  const isValidEmail = (email) => {
    if (!email) return false;
    email = email.trim().toLowerCase();
    const emailRegex = /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  };

  // ----------------- SIGNUP -----------------
  const handleSignup = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) return alert("All fields are required");
    if (!isValidEmail(email)) return alert("Invalid email");

    try {
      const { data } = await API.post("/signup", {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password: password.trim(),
      });

      alert(`Welcome ${data.user.name}! Your account has been created.`);
      navigate("/login"); // redirect to login after signup
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

    try {
      const { data } = await API.post("/login", {
        email: email.trim().toLowerCase(),
        password: password.trim(),
      });

      alert(`Welcome back, ${data.name}!`);
      
      // Store current user_id
      localStorage.setItem("user_id", data.id);

      // Optional: reset the result state in Simulator by removing previous simulations for this user
      // We don't delete all simulations; we just filter them in Simulator

      navigate("/"); // redirect to dashboard
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
        >Sign Up</button>
        <button
          className={`px-4 py-2 rounded-xl ${mode === "login" ? "bg-teal-600 text-white" : "bg-teal-100"}`}
          onClick={() => navigate("/login")}
        >Login</button>
      </div>

      {mode === "signup" ? (
        <div className="space-y-4">
          <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}
            className="w-full bg-white placeholder-green-900 p-4 rounded-2xl shadow-lg" />
          <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white placeholder-green-900 p-4 rounded-2xl shadow-lg" />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white p-4 placeholder-green-900 rounded-2xl shadow-lg" />
          <button onClick={handleSignup}
            className="w-full bg-teal-600 hover:bg-teal-500 text-white font-semibold p-3 rounded-xl transition">
            Create Profile
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white placeholder-green-900 p-4 rounded-2xl shadow-lg" />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white placeholder-green-900 p-4 rounded-2xl shadow-lg" />
          <button onClick={handleLogin}
            className="w-full bg-teal-600 hover:bg-teal-500 text-white font-semibold p-3 rounded-xl transition">
            Login
          </button>
        </div>
      )}
    </div>
  );
}

export default Profile;