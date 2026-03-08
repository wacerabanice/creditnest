import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const user_id = localStorage.getItem("user_id");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="bg-teal-600 text-white p-4 flex justify-between">
      <h1 className="font-bold text-xl">CreditNest</h1>

      <div className="flex gap-4">
        <Link to="/">Home</Link>

        {user_id ? (
          <>
            <Link to="/simulator">Simulator</Link>
            <Link to="/reports">Reports</Link>
            <Link to="/education">Credit Bytes</Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
            <Link to="/education">Credit Bytes</Link>
          </>
        )}
      </div>
    </nav>
  );
}
