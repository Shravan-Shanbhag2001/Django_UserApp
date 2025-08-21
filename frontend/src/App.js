import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Referrals from "./components/Referrals";

function App() {
  return (
    <Router>
      <nav style={{ padding: "10px", background: "#f0f0f0" }}>
        <Link to="/register" style={{ margin: "10px" }}>Register</Link>
        <Link to="/login" style={{ margin: "10px" }}>Login</Link>
        <Link to="/referrals" style={{ margin: "10px" }}>Referrals</Link>
      </nav>

      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/referrals" element={<Referrals />} />
      </Routes>
    </Router>
  );
}

export default App;
