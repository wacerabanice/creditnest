import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Simulator from "./pages/Simulator";
import Reports from "./pages/Reports";
import Education from "./pages/Education";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/education" element={<Education />} />

        {/* Protected routes */}
        <Route
          path="/simulator"
          element={
            <ProtectedRoute>
              <Simulator />
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
    </BrowserRouter>
  );
}

export default App;