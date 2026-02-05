import React, { useState } from "react";
import { Form, Input, Button, Alert, message } from "antd";
import { registerApi } from "../../api/auth.api";

const RegisterForm = ({ onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onFinish = async (values) => {
    try {
      setError(null);
      setLoading(true);

      await registerApi(values);

      message.success(
        "Registration successful. Await admin approval."
      );

      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form layout="vertical" onFinish={onFinish}>
      <Form.Item
        name="email"
        rules={[
          { required: true, message: "Email is required" },
          { type: "email", message: "Invalid email format" },
        ]}
      >
        <Input placeholder="Email" />
      </Form.Item>

      <Form.Item
        name="username"
        rules={[{ required: true, message: "Username is required" }]}
      >
        <Input placeholder="Username" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          { required: true, message: "Password is required" },
          { min: 6, message: "Minimum 6 characters" },
        ]}
      >
        <Input.Password placeholder="Password" />
      </Form.Item>
      
     

      <Form.Item>
        <Button type="primary" htmlType="submit" block loading={loading}>
          Register
        </Button>
      </Form.Item>

      {error && <Alert type="error" title={error} />}
    </Form>

  );
};

export default RegisterForm;
