import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Invalid email address");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/auth/login", {
        email: email.toLowerCase(),
        password,
      });

      const { token, user } = res.data;

      // Save token and user to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user_id", user.id);
      localStorage.setItem("user", JSON.stringify(user));

      alert("Welcome Back!");
      navigate("/dashboard"); // redirect after login
    } catch (err) {
      console.error("Login error:", err.response || err);
      setError(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-800 to-teal-400">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">CreditNest</h1>
          <p className="text-gray-500 text-sm">Smart Credit Intelligence</p>
        </div>

        <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
          Login to your account
        </h2>

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="text-sm text-gray-600">Email Address</label>
            <input
              type="email"
              placeholder="you@email.com"
              className="border border-gray-300 p-3 w-full mt-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-6 relative">
            <label className="text-sm text-gray-600">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="border border-gray-300 p-3 w-full mt-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-10 text-sm text-gray-500 cursor-pointer"
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-teal-600 to-teal-500 text-white w-full py-3 rounded-lg font-semibold hover:scale-105 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="text-center mt-6 text-sm text-gray-500">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-teal-600 font-medium cursor-pointer"
          >
            Sign up
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;