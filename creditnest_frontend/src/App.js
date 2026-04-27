import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import BusinessProfile from "./pages/BusinessProfile";
import Management from "./pages/Management";
import FinancialHealth from "./pages/FinancialHealth";
import Cashflow from "./pages/Cashflow";
import CreditHistory from "./pages/CreditHistory";
import BankingBehaviour from "./pages/BankingBehaviour";
import Collateral from "./pages/Collateral";
import LoanScore from "./pages/LoanScore";
import LoanSimulator from "./pages/LoanSimulator";
import Reports from "./pages/Reports";
import Education from "./pages/Education";

function App() {

  return (
    <Router>

      <Navbar />

      <Routes>

        {/* Public Routes */}

        <Route path="/" element={<Home />} />
        <Route path="/education" element={<Education />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/business-profile"
          element={
            <ProtectedRoute>
              <BusinessProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/management"
          element={
            <ProtectedRoute>
              <Management />
            </ProtectedRoute>
          }
        />

        <Route
          path="/financial-health"
          element={
            <ProtectedRoute>
              <FinancialHealth />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cashflow"
          element={
            <ProtectedRoute>
              <Cashflow />
            </ProtectedRoute>
          }
        />

        <Route
          path="/credit-history"
          element={
            <ProtectedRoute>
              <CreditHistory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/banking"
          element={
            <ProtectedRoute>
              <BankingBehaviour />
            </ProtectedRoute>
          }
        />

        <Route
          path="/collateral"
          element={
            <ProtectedRoute>
              <Collateral />
            </ProtectedRoute>
          }
        />

        <Route
          path="/loan-score"
          element={
            <ProtectedRoute>
              <LoanScore />
            </ProtectedRoute>
          }
        />

          <Route
          path="/loan-simulator"
          element={
            <ProtectedRoute>
              <LoanSimulator />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          }
        />

      </Routes>

    </Router>
  );
}

export default App;