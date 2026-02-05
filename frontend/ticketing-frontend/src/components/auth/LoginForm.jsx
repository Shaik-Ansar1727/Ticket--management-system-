import React, { useState } from "react";
import { Form, Input, Button, Alert, message } from "antd";
import { useQueryClient } from "@tanstack/react-query";
import { loginApi } from "../../api/auth.api";

const LoginForm = ({ onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const queryClient = useQueryClient();

  const onFinish = async (values) => {
    try {
      setError(null);
      setLoading(true);

      const response = await loginApi(values);

      localStorage.setItem("token", response.token);
      localStorage.setItem("role", response.role); 

      await queryClient.invalidateQueries({
        queryKey: ["me"],
      });

      message.success("Login successful");

      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form layout="vertical" onFinish={onFinish}>
      <Form.Item
        name="email"
        rules={[
          { required: true, message: "Please input your Email!" },
          { type: "email", message: "Invalid email format" },
        ]}
      >
        <Input placeholder="Email" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your Password!" }]}
      >
        <Input.Password placeholder="Password" />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          style={{ width: "100%" }}
        >
          Log in
        </Button>
      </Form.Item>

      {error && <Alert type="error" title={error} />}
    </Form>
  );
};

export default LoginForm;
