import React from 'react'
import { Form, Input, Button, Alert, message } from "antd"
import { registerApi } from '../api/auth.api'
import { useState } from 'react'

const Register = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    return (
        <div>
            <Form layout='vertical' onFinish={async (values) => {
                try {
                    setError(null)
                    setLoading(true)
                    const response = await registerApi(values)
                    message.success("Registration successful. Await admin approval.")
                } catch (error) {
                    setError("Registration failed. Please try again.")
                } finally {
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

                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please input a username' }]}
                >
                    <Input placeholder="username" />
                </Form.Item>

                <Form.Item
                    name="displayPicture"
                    rules={[{ required: true, message: 'Please upload display picture' }]}
                >
                    <Input placeholder="display picture" />
                </Form.Item>

                <Form.Item
                    name="bio"

                >
                    <Input.TextArea placeholder="bio" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }} loading={loading}>
                        Register
                    </Button>
                </Form.Item>
                {error && <Alert title={error} type="error" />}
            </Form>
        </div>
    )
}

export default Register
