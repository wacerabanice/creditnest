import { useState, useEffect } from "react";
import Simulator from "./Simulator";
import { useNavigate } from "react-router-dom";

function Home() {
  const [user_id, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const id = Number(localStorage.getItem("user_id"));
    if (id) setUserId(id);
  }, []);

  if (!user_id) {
    return (
      <div className="max-w-xl mx-auto p-10 bg-gray-100 rounded-xl shadow-lg text-center mt-10 space-y-6">
        <h2 className="text-3xl font-bold">Welcome to CreditNest</h2>
        <p>Track your loan readiness and financial simulations easily.</p>
        <div className="flex justify-center space-x-4 mt-4">
          <button className="px-6 py-3 bg-teal-600 text-white rounded-xl" onClick={() => navigate("/signup")}>Sign Up</button>
          <button className="px-6 py-3 bg-gray-300 text-gray-800 rounded-xl" onClick={() => navigate("/login")}>Login</button>
        </div>
        <div className="mt-8 p-6 bg-white rounded-xl shadow-inner">
          <h3 className="font-semibold mb-2">Sample Simulation</h3>
          <p>Your latest simulations will appear here once you login.</p>
        </div>
      </div>
    );
  }

  return <Simulator />;
}

export default Home;