import React from "react";
import { Form, Input, Select, Button, Typography, message } from "antd";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "../api/axios";
import { createTicketApi } from "../api/ticket.api";

const { Title } = Typography;
const { TextArea } = Input;

const labelOptions = [
  { label: "BUG", value: "BUG" },
  { label: "FEATURE", value: "FEATURE" },
  { label: "TASK", value: "TASK" },
  { label: "IMPROVEMENT", value: "IMPROVEMENT" },
  { label: "SUPPORT", value: "SUPPORT" },
];

const CreateTicket = () => {
  const [form] = Form.useForm();


  const {
    data: users = [],
    isLoading: usersLoading,
  } = useQuery({
    queryKey: ["assignable-users"],
    queryFn: async () => {
      const res = await axios.get("/users/assignable");
      return res.data;
    },
    onError: () => {
      message.error("Failed to load users");
    },
  });


  const createTicketMutation = useMutation({
    mutationFn: createTicketApi,
    onSuccess: () => {
      message.success("Ticket created successfully");
      form.resetFields();
    },
    onError: (error) => {
      message.error(
        error?.response?.data?.message || "Failed to create ticket"
      );
    },
  });

  const onFinish = (values) => {
    createTicketMutation.mutate(values);
  };

  return (
    <div className="bg-gray-100 px-4 py-10">
      <div className="mx-auto max-w-lg rounded-xl bg-white p-6 shadow-sm">

        <Title level={2} className="mb-6 text-center">
          Create Ticket
        </Title>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="space-y-2"
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[
              { required: true, message: "Please enter ticket title" },
            ]}
          >
            <Input placeholder="Enter ticket title" />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please enter ticket description",
              },
            ]}
          >
            <TextArea
              rows={4}
              placeholder="Enter ticket description"
            />
          </Form.Item>

          <Form.Item
            label="Label"
            name="label"
            rules={[
              { required: true, message: "Please select a label" },
            ]}
          >
            <Select
              placeholder="Select label"
              options={labelOptions}
            />
          </Form.Item>

          <Form.Item
            label="Assign To"
            name="assignedToUserId"
            rules={[
              { required: true, message: "Please select a user" },
            ]}
          >
            <Select
              placeholder="Select user"
              loading={usersLoading}
              options={users.map((user) => ({
                label: user.username,
                value: user.id,
              }))}
              showSearch
              optionFilterProp="label"
            />
          </Form.Item>

          <Form.Item className="pt-2">
            <Button
              type="primary"
              htmlType="submit"
              loading={createTicketMutation.isLoading}
              block
            >
              Create Ticket
            </Button>
          </Form.Item>
        </Form>

      </div>
    </div>
  );
};

export default CreateTicket;
