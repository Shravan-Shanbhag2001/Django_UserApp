import React, { useState } from "react";
import api from "../api";

function Referrals() {
  const [referrals, setReferrals] = useState([]);
  const [message, setMessage] = useState("");

  const fetchReferrals = async () => {
    try {
      const res = await api.get("/referral/");
      setReferrals(res.data.data);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data.error || "Error fetching referrals!");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Referrals</h2>
      <button onClick={fetchReferrals}>Show Referrals</button>
      {message && <p>{message}</p>}
      <table border="1" style={{ marginTop: "10px" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email (username)</th>
            <th>Date Joined</th>
          </tr>
        </thead>
        <tbody>
          {referrals.map((ref, idx) => (
            <tr key={idx}>
              <td>{ref.name}</td>
              <td>{ref.username}</td>
              <td>{new Date(ref.date_joined).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Referrals;
