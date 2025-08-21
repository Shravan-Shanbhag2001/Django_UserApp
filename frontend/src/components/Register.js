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
      setMessage(res.data.message || "Registration successful");
    } catch (err) {
      setMessage(err.response?.data.error || "Registration failed!");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>User Registration</h2>
<form onSubmit={handleSubmit}>
  <input
    type="email"
    name="email"
    placeholder="Email"
    value={formData.email}
    onChange={handleChange}
    required
  />
  <input
    type="password"
    name="password"
    placeholder="Password"
    value={formData.password}
    onChange={handleChange}
    required
  />
  <input
    type="text"
    name="name"
    placeholder="Name"
    value={formData.name}
    onChange={handleChange}
    required
  />
  <input
    type="tel"
    name="mobile_number"
    placeholder="Mobile Number"
    value={formData.mobile_number}
    onChange={handleChange}
    required
  />
  <input
    type="text"
    name="city"
    placeholder="City"
    value={formData.city}
    onChange={handleChange}
    required
  />
  <input
    type="text"
    name="referral_code"
    placeholder="Referral Code (Optional)"
    value={formData.referral_code}
    onChange={handleChange}
  />
  <button type="submit">Register</button>
</form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default Register;
