import { Link } from "react-router-dom";

function Home() {
  const username = localStorage.getItem("username");

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Welcome to CreditNest</h1>
      <p className="mb-6">Hello {username}, manage your financial readiness.</p>

      <div className="grid grid-cols-3 gap-6">
        <Link to="/simulator" className="bg-teal-500 text-white p-6 rounded-xl shadow">
          Loan Simulator
        </Link>

        <Link to="/reports" className="bg-blue-500 text-white p-6 rounded-xl shadow">
          Reports
        </Link>

        <Link to="/profile" className="bg-purple-500 text-white p-6 rounded-xl shadow">
          Profile
        </Link>
      </div>
    </div>
  );
}

export default Home;