import React, { useState } from "react";
import { Form, Input, Button, Typography, message as antdMessage } from "antd";
import { useNavigate } from "react-router-dom";
import api from "../api";

const { Title } = Typography;

function Login({ setUser }) {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const res = await api.post("/login/", values);
      antdMessage.success(res.data.message || "Login successful!");
      setUser({ email: res.data.email_id });
      navigate("/welcome"); // redirect to welcome page
    } catch (err) {
      antdMessage.error(err.response?.data.error || "Login failed!");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "50px auto", padding: "20px", boxShadow: "0 0 10px #ccc", borderRadius: 8 }}>
      <Title level={2} style={{ textAlign: "center" }}>Login</Title>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item name="username" label="Email / Username" rules={[{ required: true }]}>
          <Input placeholder="Email / Username" />
        </Form.Item>
        <Form.Item name="password" label="Password" rules={[{ required: true }]}>
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>Login</Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;
