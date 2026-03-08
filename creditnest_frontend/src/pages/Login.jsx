import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const [email, setEmail] = useState(""); // use email instead of username
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Validate email
  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) return alert("All fields are required");
    if (!isValidEmail(email)) return alert("Invalid email");

    try {
      const res = await API.post("/login", {
        email: email.toLowerCase(),
        password,
      });

      const user = res.data;

      // Store user data in localStorage for simulator and reports
      localStorage.setItem("user_id", user.id);
      localStorage.setItem("user", JSON.stringify({ name: user.name, email: user.email }));

      alert(`Welcome, ${user.name}! Redirecting...`);
      navigate("/"); // redirect to Home/Dashboard
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Invalid credentials");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-10 bg-green-200 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Login</h2>

      <input
        type="email"
        placeholder="Email Address"
        className="border border-gray-300 p-3 w-full mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="border border-gray-300 p-3 w-full mb-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleLogin}
        className="bg-gradient-to-r from-teal-600 to-teal-500 text-white w-full py-3 rounded-lg hover:scale-105 transition"
      >
        Login
      </button>
    </div>
  );
}

export default Login;