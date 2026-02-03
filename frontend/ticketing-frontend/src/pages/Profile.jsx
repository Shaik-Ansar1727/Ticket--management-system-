import React, { useEffect, useState } from "react";
import { Card, Spin, Alert, Avatar, Tag, Form, Input, Button, message, Divider } from "antd";
import axios from "../api/axios";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [saving, setSaving] = useState(false);



    const [form] = Form.useForm();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get("/users/me");
                setUser(response.data);
                form.setFieldsValue(response.data);
            } catch (err) {
                setError("Failed to load profile");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [form]);

    const onFinish = async (values) => {
        try {
            setSaving(true);
            const response = await axios.put("/users/me", values);
            setUser(response.data);
            message.success("Profile updated successfully");
        } catch (err) {
            message.error("Failed to update profile");
        } finally {
            setSaving(false);
        }
    };
    const onPasswordChange = async (values) => {
        try {
            await axios.put("/users/me/password", values);
            message.success("Password changed successfully");

        } catch (err) {
            message.error(
                err.response?.data || "Failed to change password"
            );
        }
    };


    if (loading) return <Spin size="large" />;
    if (error) return <Alert type="error" title={error} />;
    

    return (
        <Card title="My Profile" style={{ maxWidth: 500 }}>
            <Avatar
                size={80}
                src={user.displayPicture}
                style={{ marginBottom: 16 }}
            />

            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: "Username is required" }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Display Picture URL"
                    name="displayPicture"
                    rules={[{ required: true, message: "Display picture is required" }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Bio"
                    name="bio"
                >
                    <Input.TextArea rows={3} />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={saving}>
                        Save Changes
                    </Button>
                </Form.Item>
            </Form>

            <Divider />

            <h3>Change Password</h3>

            <Form
                
                layout="vertical"
                onFinish={onPasswordChange}
            >
                <Form.Item
                    label="Old Password"
                    name="oldPassword"
                    rules={[{ required: true, message: "Old password is required" }]}
                >
                    <Input.Password />
                </Form.Item>

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
                        Change Password
                    </Button>
                </Form.Item>
            </Form>

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
        </Card>
    );
};

export default Profile;
