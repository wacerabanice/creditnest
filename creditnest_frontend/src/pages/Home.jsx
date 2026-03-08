import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

function Home() {
  const user_id = localStorage.getItem("user_id");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")); 
    if (user) setUsername(user.name); 
  }, [])

  if (!user_id) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-3xl font-bold">Welcome to CreditNest</h1>
        <br />
        <p>CreditNest is designed to help individuals understand and improve their 
          financial readiness for loans.</p> 
        <p>It provides a simple and interactive environment where users can simulate their 
          financial situation by entering details such as monthly income, expenses, and existing obligations.</p><br />
        <p>Based on this information, CreditNest generates a readiness score and insights that 
          help users understand how prepared they are to apply for credit.</p>


        <div className="mt-6 flex justify-center gap-6">
          <Link to="/register" className="bg-teal-600 text-white px-4 py-2 rounded">
            Register
          </Link>

          <Link to="/login" className="bg-green-600 text-white px-4 py-2 rounded">
            Log In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Welcome, {username}</h1><br />
      <p>Access The Simulator and Summarized Reports from your simulations:</p>
      <div className="grid grid-cols-2 gap-6 mt-8">

        <Link to="/simulator" className="bg-teal-500 p-6 rounded text-white">
          Loan Simulator
        </Link>

        <Link to="/reports" className="bg-cyan-600 p-6 rounded text-white">
          Reports
        </Link>

      </div>
    </div>
  );
}

export default Home;