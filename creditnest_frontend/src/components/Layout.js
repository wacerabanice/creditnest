import { Link } from "react-router-dom";

function Layout({ children }) {
  return (
    <div className="flex h-screen bg-teal-200">

      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-emerald-600 to-emerald-200 text-white p-6 shadow-lg">
        <h1 className="text-2xl font-bold mb-10 tracking-wide">
          CreditNest
        </h1>

        <nav className="flex flex-col space-y-4 text-lg">
          {/* Remove /profile and link to /signup instead */}
          <Link to="/signup" className="hover:text-yellow-400 transition">
            Sign Up
          </Link>
          <Link to="/login" className="hover:text-yellow-400 transition">
            Login
          </Link>
          <Link to="/" className="hover:text-yellow-400 transition">
            Dashboard
          </Link>
          <Link to="/simulator" className="hover:text-yellow-400 transition">
            Simulator
          </Link>
          <Link to="/reports" className="hover:text-yellow-400 transition">
            Reports
          </Link>
          <Link to="/education" className="hover:text-yellow-400 transition">
            Education
          </Link>
        </nav>
      </div>

      {/* Main Area */}
      <div className="flex-1 flex flex-col">
        
        {/* Top Navbar */}
        <div className="bg-teal-300 shadow px-8 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-700">
            Loan Readiness Platform
          </h2>

          <div className="flex items-center space-x-4">
            <div className="bg-teal-100 text-teal-900 px-4 py-1 rounded-full text-sm">
              Active User
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto">
          {children}
        </div>

      </div>
    </div>
  );
}

export default Layout;