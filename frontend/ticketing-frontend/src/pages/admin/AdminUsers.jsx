import React from "react";
import { Table, Spin, Alert, Button, message } from "antd";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../../api/axios";

const AdminUsers = () => {
  const queryClient = useQueryClient();


  const {
    data: users = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["pending-users"],
    queryFn: async () => {
      const res = await axios.get("/admin/users/pending");
      return res.data;
    },
    onError: () => {
      message.error("Failed to load pending users");
    },
  });


  const approveMutation = useMutation({
    mutationFn: (userId) =>
      axios.post(`/admin/users/${userId}/approve`),
    onSuccess: () => {
      message.success("User approved successfully");
      queryClient.invalidateQueries(["pending-users"]);
    },
    onError: () => {
      message.error("Failed to approve user");
    },
  });


  const rejectMutation = useMutation({
    mutationFn: (userId) =>
      axios.post(`/admin/users/${userId}/reject`),
    onSuccess: () => {
      message.success("User rejected successfully");
      queryClient.invalidateQueries(["pending-users"]);
    },
    onError: () => {
      message.error("Failed to reject user");
    },
  });

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
        <div className="flex gap-2">
          <Button
            type="primary"
            size="small"
            loading={approveMutation.isLoading}
            onClick={() => approveMutation.mutate(record.id)}
          >
            Approve
          </Button>

          <Button
            danger
            size="small"
            loading={rejectMutation.isLoading}
            onClick={() => rejectMutation.mutate(record.id)}
          >
            Reject
          </Button>
        </div>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <Spin size="large" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mt-6">
        <Alert type="error" message="Failed to load pending users" />
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <h2 className="text-xl font-semibold text-gray-800">
        Pending User Registrations
      </h2>

      <div className="rounded-lg bg-white p-4 shadow-sm">
        <Table
          dataSource={users}
          columns={columns}
          rowKey="id"
          pagination={false}
        />
      </div>

    </div>
  );
};

export default AdminUsers;
