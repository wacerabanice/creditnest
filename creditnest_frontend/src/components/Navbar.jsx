import { Link, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

function Navbar() {

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <nav className="bg-white border-b shadow-sm px-8 py-4 flex justify-between items-center">

      {/* Logo */}
      <Link to="/" className="flex flex-col">

        <span className="text-2xl font-bold text-teal-600">
          CreditNest
        </span>

        <span className="text-xs text-gray-400">
          Smart Credit Intelligence
        </span>

      </Link>


      {/* Navigation */}
      <div className="flex items-center gap-6">

        <Link
          to="/"
          className="border border-teal-600 text-teal-600 px-4 py-2 rounded-lg hover:bg-teal-50 transition"
        >
          Home
        </Link>

        


        {/* Not Logged In */}
        {!token && (
          <div className="flex gap-3">

            <Link
              to="/login"
              className="border border-teal-600 text-teal-600 px-4 py-2 rounded-lg hover:bg-teal-50 transition"
            >
              Login
            </Link>

            <Link
              to="/register"
               className="border border-teal-600 text-teal-600 px-4 py-2 rounded-lg hover:bg-teal-50 transition"
            >
              Get Started
            </Link>

            <Link
          to="/education"
          className="border border-teal-600 text-teal-600 px-4 py-2 rounded-lg hover:bg-teal-50 transition"
        >
          Credit Bytes
        </Link>

          </div>
        )}


        {/* Logged In */}
        {token && (
          <div className="flex items-center gap-5">

            <Link
              to="/dashboard"
              className="border border-teal-600 text-teal-600 px-4 py-2 rounded-lg hover:bg-teal-50 transition"
            >
              Dashboard
            </Link>

            <Link
              to="/loan-score"
              className="border border-teal-600 text-teal-600 px-4 py-2 rounded-lg hover:bg-teal-50 transition"
            >
              Score
            </Link>

            <Link
              to="/loan-simulator"
              className="border border-teal-600 text-teal-600 px-4 py-2 rounded-lg hover:bg-teal-50 transition"
            >
              Simulator
            </Link>

            <Link
              to="/reports"
              className="border border-teal-600 text-teal-600 px-4 py-2 rounded-lg hover:bg-teal-50 transition"
            >
              Reports
            </Link>

            <Link
          to="/education"
          className="border border-teal-600 text-teal-600 px-4 py-2 rounded-lg hover:bg-teal-50 transition"
        >
          Credit Bytes
        </Link>

            {/* User */}
            <div className="flex items-center gap-3">

              <div className="bg-teal-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold">
                {user?.name?.charAt(0)}
              </div>

              <span className="text-sm text-gray-600">
                {user?.name}
              </span>

              <button
                onClick={handleLogout}
                className="flex items-center gap-1 text-red-500 hover:text-red-600"
              >
                <LogOut size={16} />
                Logout
              </button>

            </div>

          </div>
        )}

      </div>

    </nav>
  );
}

export default Navbar;