import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  const registerUser = () => {
    if (!username || !email || !password) {
      alert("Please fill in all fields");
      return;
    }

    if (!validateEmail(email)) {
      alert("Please enter a valid email address");
      return;
    }

    const user = {
      id: Date.now(),
      username,
      email,
      password
    };

    localStorage.setItem("user_id", user.id);
    localStorage.setItem("username", user.username);
    localStorage.setItem("email", user.email);

    navigate("/");
  };

  return (
    <div className="m-3 p-10 max-w-md mx-auto bg-green-200 shadow rounded">

      <h2 className="text-2xl font-bold mb-6 text-center">
        Register
      </h2>

      <input
        type="text"
        placeholder="Username"
        className="border p-3 w-full mb-4 rounded"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="email"
        placeholder="Email Address"
        className="border p-3 w-full mb-4 rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="border p-3 w-full mb-6 rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={registerUser}
        className="bg-teal-600 text-white w-full py-3 rounded hover:bg-teal-500"
      >
        Register
      </button>

    </div>
  );
}

export default Register;