import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      alert("Please fill in all fields");
      return;
    }

    if (!isValidEmail(email)) {
      alert("Please enter a valid email address");
      return;
    }

    try {
      const res = await API.post("/signup", {
        name: name.trim(),
        email: email.toLowerCase(),
        password: password.trim(),
      });

      const user = res.data.user;

      // Store user ID only, not password
      localStorage.setItem("user_id", user.id);
      localStorage.setItem("user", JSON.stringify({ name: user.name, email: user.email }));

      alert(`Welcome, ${user.name}! Account created successfully.`);
      navigate("/login"); // redirect to login after signup
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="m-3 p-10 max-w-md mx-auto bg-green-200 shadow rounded-2xl">
      <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

      <input
        type="text"
        placeholder="User Name"
        className="border p-3 w-full mb-4 rounded-lg"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Email Address"
        className="border p-3 w-full mb-4 rounded-lg"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="border p-3 w-full mb-6 rounded-lg"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleRegister}
        className="bg-teal-600 text-white w-full py-3 rounded-lg hover:bg-teal-500"
      >
        Register
      </button>
    </div>
  );
}

export default Register;