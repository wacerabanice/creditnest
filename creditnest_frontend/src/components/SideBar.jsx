import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  Users,
  BarChart3,
  Wallet,
  CreditCard,
  Landmark,
  ShieldCheck,
  FileText,
  LogOut
} from "lucide-react";

function Sidebar() {

  const location = useLocation();
  const navigate = useNavigate();

  const menu = [
    { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={18}/> },
    { name: "Business Profile", path: "/business-profile", icon: <Building2 size={18}/> },
    { name: "Management", path: "/management", icon: <Users size={18}/> },
    { name: "Financial Health", path: "/financial-health", icon: <BarChart3 size={18}/> },
    { name: "Cashflow", path: "/cashflow", icon: <Wallet size={18}/> },
    { name: "Credit History", path: "/credit-history", icon: <CreditCard size={18}/> },
    { name: "Banking Behaviour", path: "/banking", icon: <Landmark size={18}/> },
    { name: "Collateral", path: "/collateral", icon: <ShieldCheck size={18}/> },
    { name: "Loan Readiness Score", path: "/loan-score", icon: <BarChart3 size={18}/> },
    { name: "Reports", path: "/reports", icon: <FileText size={18}/> }
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (

    <div className="w-64 min-h-screen bg-gray-900 text-gray-200 flex flex-col rounded-lg">

           {/* Menu */}
      <div className="flex-1 p-4 space-y-2">

        {menu.map((item) => (

          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 p-3 rounded-lg transition
              
              ${
                location.pathname === item.path
                  ? "bg-teal-600 text-white"
                  : "hover:bg-gray-800"
              }
            `}
          >

            {item.icon}

            <span className="text-sm">
              {item.name}
            </span>

          </Link>

        ))}

      </div>


      {/* Logout */}
      <div className="p-4 border-t border-gray-800">

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-red-900 transition"
        >

          <LogOut size={18}/>

          Logout

        </button>

      </div>

    </div>

  );
}

export default Sidebar;