import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
    Card,
    Spin,
    Alert,
    Tag,
    Form,
    Input,
    Button,
    message,
    Divider,
    Avatar,
    Modal,
} from "antd";
import axios from "../../api/axios";
import { useQuery } from "@tanstack/react-query";

const BACKEND_URL = "http://localhost:8080";

const UserDetails = () => {
    const { userId } = useParams();
    const [form] = Form.useForm();
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

    const {
        data: user,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["admin-user", userId],
        queryFn: async () => {
            const res = await axios.get(`/admin/users/${userId}`);
            return res.data;
        },
        enabled: !!userId,
    });

    const onChangePassword = async (values) => {
        try {
            await axios.put(`/admin/users/${userId}/password`, values);
            message.success("Password updated successfully");
            form.resetFields();
            setIsPasswordModalOpen(false);
        } catch (err) {
            message.error(
                err.response?.data || "Failed to update password"
            );
        }
    };

    if (isLoading) return <Spin size="large" />;
    if (isError)
        return (
            <Alert
                type="error"
                title="Failed to load user details"
            />
        );

    if (!user) return null;

    const getImageUrl = (path) => {
        if (!path) return undefined;
        return path.startsWith("http")
            ? path
            : `${BACKEND_URL}${path.startsWith("/") ? "" : "/"}${path}`;
    };

    return (
        <div className="flex justify-center">
            <Card title="User Details" className="w-full max-w-md">
                {/* Profile Picture */}
                <div className="flex flex-col items-center mb-6">
                    <Avatar size={96} src={getImageUrl(user.displayPicture)}>
                        {!user.displayPicture &&
                            user.username?.charAt(0).toUpperCase()}
                    </Avatar>

                    <p className="mt-2 text-lg font-semibold">
                        {user.username}
                    </p>
                    <p className="text-sm text-gray-500">
                        {user.email}
                    </p>
                </div>

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

                <p>
                    <strong>Bio:</strong> {user.bio || "—"}
                </p>

                {user.role === "EMPLOYEE" && (
                    <>
                        <Divider />
                        <Button
                            type="primary"
                            block
                            onClick={() => setIsPasswordModalOpen(true)}
                        >
                            Change Password
                        </Button>
                    </>
                )}
            </Card>


            <Modal
                title="Change User Password"
                open={isPasswordModalOpen}
                onCancel={() => {
                    setIsPasswordModalOpen(false);
                    form.resetFields();
                }}
                footer={null}
                destroyOnHidden
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onChangePassword}
                >
                    <Form.Item
                        label="New Password"
                        name="newPassword"
                        rules={[
                            {
                                required: true,
                                message: "New password is required",
                            },
                            {
                                min: 6,
                                message:
                                    "Password must be at least 6 characters",
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                        >
                            Update Password
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default UserDetails;
