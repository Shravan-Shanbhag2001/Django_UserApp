import React, { useState } from "react";
import api from "../api";

function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    mobile_number: "",
    city: "",
    referral_code: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/register/", formData);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data.error || "Registration failed!");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>User Registration</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((field) => (
          <div key={field} style={{ marginBottom: "10px" }}>
            <input
              type={field === "password" ? "password" : "text"}
              name={field}
              placeholder={field}
              value={formData[field]}
              onChange={handleChange}
            />
          </div>
        ))}
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Register;
