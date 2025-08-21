import React, { useState } from "react";
import api from "../api";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/login/", { username, password });
      setMessage(res.data.message + " | Logged in as: " + res.data.email_id);
    } catch (err) {
      setMessage(err.response?.data.error || "Login failed!");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>User Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email / Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br />
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Login;
