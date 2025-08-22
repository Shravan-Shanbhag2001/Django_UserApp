import React, { useState } from "react";
import { Form, Input, Button, Typography, message as antdMessage } from "antd";
import { useNavigate } from "react-router-dom";
import api from "../api";

const { Title } = Typography;

function Register() {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const res = await api.post("/register/", values);
      antdMessage.success(res.data.message || "Registration successful!");
      navigate("/login"); // redirect to login after registration
    } catch (err) {
      antdMessage.error(err.response?.data.error || "Registration failed!");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "50px auto", padding: "20px", boxShadow: "0 0 10px #ccc", borderRadius: 8 }}>
      <Title level={2} style={{ textAlign: "center" }}>Register</Title>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item name="password" label="Password" rules={[{ required: true, min: 8 }]}>
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item name="mobile_number" label="Mobile Number" rules={[{ required: true, len: 10, message: "Enter 10-digit number" }]}>
          <Input placeholder="Mobile Number" />
        </Form.Item>
        <Form.Item name="city" label="City" rules={[{ required: true }]}>
          <Input placeholder="City" />
        </Form.Item>
        <Form.Item name="referral_code" label="Referral Code (Optional)">
          <Input placeholder="Referral Code" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>Register</Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Register;
