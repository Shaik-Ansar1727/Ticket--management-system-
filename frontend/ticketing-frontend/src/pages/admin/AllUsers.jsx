import React from "react";
import { Table, Spin, Alert, Tag, Button, message } from "antd";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../../api/axios";

const AllUsers = () => {
  const queryClient = useQueryClient();


  const {
    data: users = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const res = await axios.get("/admin/users");
      return res.data;
    },
    onError: () => {
      message.error("Failed to load users");
    },
  });


  const removeUserMutation = useMutation({
    mutationFn: (userId) =>
      axios.delete(`/admin/users/${userId}`),
    onSuccess: () => {
      message.success("User removed successfully");
      queryClient.invalidateQueries(["all-users"]);
    },
    onError: () => {
      message.error("Failed to remove user");
    },
  });

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      render: (text, record) => (
        <Link
          to={`/dashboard/admin/users/${record.id}`}
          className="font-medium text-indigo-600 hover:underline"
        >
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
        <Tag color={role === "ADMIN" ? "red" : "blue"}>
          {role}
        </Tag>
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
        if (record.role !== "EMPLOYEE") return null;

        return (
          <Button
            danger
            size="small"
            loading={removeUserMutation.isLoading}
            onClick={() => removeUserMutation.mutate(record.id)}
          >
            Remove
          </Button>
        );
      },
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <Spin size="large" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mt-6">
        <Alert type="error" title="Failed to load users" />
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <h2 className="text-xl font-semibold text-gray-800">
        All Users
      </h2>

      <div className="rounded-lg bg-white p-4 shadow-sm">
        <Table
          dataSource={users}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </div>

    </div>
  );
};

export default AllUsers;
