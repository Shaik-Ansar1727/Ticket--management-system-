import React from 'react'
import { Form, Input, Button, Alert, message } from "antd"
import { loginApi } from '../api/auth.api.js'
import { useState } from 'react'

const Login = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)


    return (
        <div>
            <Form layout='vertical' onFinish={async (values) => {

                try {
                    setError(null)
                    setLoading(true)
                    const response = await loginApi(values)

                    localStorage.setItem("token", response.token)


                    // Decode JWT payload to get role
                    const payload = JSON.parse(atob(response.token.split(".")[1]));
                    localStorage.setItem("role", payload.role);


                    message.success("Login successfull")
                    window.location.href = "/dashboard"


                } catch (error) {
                    console.error(error)
                    setError(
                        error.response?.data?.message || "Login failed"
                    );

                }
                finally {

                    setLoading(false)
                }
            }}>

                <Form.Item
                    name="email"
                    rules={[
                        { required: true, message: 'Please input your Email!' },
                        { type: 'email', message: 'The input is not valid E-mail!' }
                    ]}
                >
                    <Input placeholder="Email" />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input.Password placeholder="Password" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }} loading={loading}>
                        Log in
                    </Button>
                </Form.Item>

                {error && <Alert title={error} type="error" />}

            </Form>
        </div>
    )
}

export default Login

