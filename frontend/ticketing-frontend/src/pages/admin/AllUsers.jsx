import React, { useEffect, useState } from "react";
import { Table, Spin, Alert, Tag, Button, message } from "antd";
import axios from "../../api/axios";
import { Link } from "react-router-dom";

const AllUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const response = await axios.get("/admin/users");
                setUsers(response.data);
            } catch (err) {
                setError("Failed to load users");
            } finally {
                setLoading(false);
            }
        };

        fetchAllUsers();
    }, []);

    const handleDelete = async (userId) => {
        try {
            await axios.delete(`/admin/users/${userId}`);
            message.success("User removed successfully");
            setUsers((prev) => prev.filter((u) => u.id !== userId));
        } catch (err) {
            message.error("Failed to remove user");
        }
    };

    const columns = [
        {
            title: "Username",
            dataIndex: "username",
            key: "username",
            render: (text, record) => (
                <Link to={`/dashboard/admin/users/${record.id}`}>
                    {text}
                </Link>
            ),
        },

        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Role",
            dataIndex: "role",
            key: "role",
            render: (role) => (
                <Tag color={role === "ADMIN" ? "red" : "blue"}>{role}</Tag>
            ),
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status) => {
                let color = "default";
                if (status === "ACTIVE") color = "green";
                if (status === "PENDING") color = "orange";
                if (status === "REJECTED") color = "red";
                return <Tag color={color}>{status}</Tag>;
            },
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => {
                if (record.role !== "EMPLOYEE") {
                    return null;
                }

                return (
                    <Button
                        danger
                        size="small"
                        onClick={() => handleDelete(record.id)}
                    >
                        Remove
                    </Button>
                );
            },
        },

    ];

    if (loading) return <Spin size="large" />;
    if (error) return <Alert type="error" message={error} />;

    return (
        <div>
            <h2>All Users</h2>
            <Table
                dataSource={users}
                columns={columns}
                rowKey="id"
                pagination={{ pageSize: 10 }}
            />
        </div>
    );
};

export default AllUsers;
