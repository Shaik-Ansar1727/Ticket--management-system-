import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Spin, Alert, Tag, Form, Input, Button, message, Divider } from "antd";
import axios from "../../api/axios";

const UserDetails = () => {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [form] = Form.useForm();

    const onChangePassword = async (values) => {
        try {
            await axios.put(`/admin/users/${userId}/password`, values);
            message.success("Password updated successfully");
            form.resetFields();
        } catch (err) {
            message.error(
                err.response?.data || "Failed to update password"
            );
        }
    };


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`/admin/users/${userId}`);
                setUser(response.data);
            } catch (err) {
                setError("Failed to load user details");
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [userId]);

    if (loading) return <Spin size="large" />;
    if (error) return <Alert type="error" message={error} />;
    if (!user) return null;

    return (
        <Card title="User Details" style={{ maxWidth: 500 }}>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>

            <p>
                <strong>Role:</strong>{" "}
                <Tag color={user.role === "ADMIN" ? "red" : "blue"}>
                    {user.role}
                </Tag>
            </p>

            <p>
                <strong>Status:</strong>{" "}
                <Tag
                    color={
                        user.status === "ACTIVE"
                            ? "green"
                            : user.status === "PENDING"
                                ? "orange"
                                : "red"
                    }
                >
                    {user.status}
                </Tag>
            </p>

            <p><strong>Bio:</strong> {user.bio || "—"}</p>
            {user.role === "EMPLOYEE" && (
                <>
                    <Divider />
                    <h3>Change User Password</h3>

                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onChangePassword}
                    >
                        <Form.Item
                            label="New Password"
                            name="newPassword"
                            rules={[
                                { required: true, message: "New password is required" },
                                { min: 6, message: "Password must be at least 6 characters" },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Update Password
                            </Button>
                        </Form.Item>
                    </Form>
                </>
            )}

        </Card>
    );
};

export default UserDetails;
