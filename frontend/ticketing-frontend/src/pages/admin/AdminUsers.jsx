import React, { useEffect, useState } from "react";
import { Table, Spin, Alert, Button, message } from "antd";
import axios from "../../api/axios";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPendingUsers = async () => {
      try {
        const response = await axios.get("/admin/users/pending");
        setUsers(response.data);
      } catch (err) {
        setError("Failed to load pending users");
      } finally {
        setLoading(false);
      }
    };

    fetchPendingUsers();
  }, []);


  const handleApprove = async (userId) => {
    try {
      await axios.post(`/admin/users/${userId}/approve`);
      message.success("User approved successfully");
      setUsers((prev) => prev.filter((u) => u.id !== userId));
    } catch (err) {
      message.error("Failed to approve user");
    }
  };

  const handleReject = async (userId) => {
    try {
      await axios.post(`/admin/users/${userId}/reject`);
      message.success("User rejected successfully");
      setUsers((prev) => prev.filter((u) => u.id !== userId));
    } catch (err) {
      message.error("Failed to reject user");
    }
  };

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button
            type="primary"
            size="small"
            onClick={() => handleApprove(record.id)}
          >
            Approve
          </Button>

          <Button
            danger
            size="small"
            style={{ marginLeft: 8 }}
            onClick={() => handleReject(record.id)}
          >
            Reject
          </Button>
        </>
      ),
    },
  ];

  if (loading) return <Spin size="large" />;
  if (error) return <Alert type="error" message={error} />;

  return (
    <div>
      <h2>Pending User Registrations</h2>
      <Table
        dataSource={users}
        columns={columns}
        rowKey="id"
        pagination={false}
      />
    </div>
  );
};

export default AdminUsers;
