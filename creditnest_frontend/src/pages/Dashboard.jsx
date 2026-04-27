import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../components/SideBar";

function Dashboard() {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {

    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    // Redirect if not logged in
    if (!token) {
      navigate("/login");
      return;
    }

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

  }, [navigate]);

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome back {user?.name || "User"}
          </h1>

          <p className="text-gray-500 mt-2">
            Check how ready your business is for financing.
          </p>
        </div>


        {/* Quick Actions */}
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Quick Actions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          <Link
            to="/business-profile"
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition block"
          >
            <h3 className="text-lg font-semibold text-gray-800">
              Business Profile
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Update your company information
            </p>
          </Link>

          <Link
            to="/management"
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition block"
          >
            <h3 className="text-lg font-semibold text-gray-800">
              Management Profiles
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Update details on Business Management
            </p>
          </Link>

          <Link
            to="/financial-health"
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition block"
          >
            <h3 className="text-lg font-semibold text-gray-800">
              Financial Health
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Analyze revenue and expenses
            </p>
          </Link>

          <Link
            to="/cashflow"
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition block"
          >
            <h3 className="text-lg font-semibold text-gray-800">
              Cashflow
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Track monthly liquidity
            </p>
          </Link>

          <Link
            to="/credit-history"
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition block"
          >
            <h3 className="text-lg font-semibold text-gray-800">
              Credit History
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Update your Credit History
            </p>
          </Link>

          <Link
            to="/banking"
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition block"
          >
            <h3 className="text-lg font-semibold text-gray-800">
              Banking Behaviour
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Track your Banking Behaviour
            </p>
          </Link>

          <Link
            to="/collateral"
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition block"
          >
            <h3 className="text-lg font-semibold text-gray-800">
              Collateral
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              What is your collateral
            </p>
          </Link>
          <br />
          
          <Link
            to="/loan-score"
            className="bg-gradient-to-r from-teal-900 to-teal-300 text-white p-6 rounded-xl shadow hover:shadow-xl transition block"
          >
            <h3 className="text-lg font-semibold">
              Generate Score
            </h3>

            <p className="text-sm opacity-90 mt-1">
              Run loan readiness simulation
            </p>
          </Link>

        </div>

      </div>
    </div>
  );
}

export default Dashboard;