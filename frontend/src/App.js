import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { message } from "antd";
import "antd/dist/reset.css";

import Register from "./components/Register";
import Login from "./components/Login";
import Welcome from "./components/Welcome";

function App() {
  const [user, setUser] = useState(null); // Stores logged-in user info

  return (
    <Router>
      <Routes>
        {/* Default page goes to registration */}
        <Route path="/" element={<Register navigateToLogin={() => window.location.href = "/login"} />} />
        <Route path="/register" element={<Register navigateToLogin={() => window.location.href = "/login"} />} />

        {/* Login page */}
        <Route path="/login" element={<Login setUser={setUser} />} />

        {/* Welcome page (protected) */}
        <Route
          path="/welcome"
          element={user ? <Welcome user={user} /> : <Navigate to="/login" />}
        />

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
