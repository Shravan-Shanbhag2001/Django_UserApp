import React from "react";
import { Typography, Button } from "antd";
import { useNavigate } from "react-router-dom";

const { Title, Paragraph } = Typography;

function Welcome({ user }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div style={{ maxWidth: 500, margin: "50px auto", textAlign: "center", padding: 20 }}>
      <Title level={2}>Welcome!</Title>
      <Paragraph>You are logged in as <strong>{user.email}</strong></Paragraph>
      <Button type="primary" onClick={handleLogout}>Logout</Button>
    </div>
  );
}

export default Welcome;
