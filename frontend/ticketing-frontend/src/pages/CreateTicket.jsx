import React from "react";
import { Form, Input, Select, Button, Typography, message } from "antd";
import { createTicketApi } from "../api/ticket.api";
const { Title } = Typography;
const { TextArea } = Input;
import { useState } from "react";
const labelOptions = [
  { label: "BUG", value: "BUG" },
  { label: "FEATURE", value: "FEATURE" },
  { label: "TASK", value: "TASK" },
  { label: "IMPROVEMENT", value: "IMPROVEMENT" },
  { label: "SUPPORT", value: "SUPPORT" },
];

const CreateTicket = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await createTicketApi(values);
      message.success("Ticket created successfully");
    } catch (error) {
      console.error(error);
      message.error(error?.response?.data || "Failed to create ticket");
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 500 }}>
      <Title level={2}>Create Ticket</Title>

      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please enter ticket title" }]}
        >
          <Input placeholder="Enter ticket title" />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please enter ticket description" }]}
        >
          <TextArea rows={4} placeholder="Enter ticket description" />
        </Form.Item>

        <Form.Item
          label="Label"
          name="label"
          rules={[{ required: true, message: "Please select a label" }]}
        >
          <Select
            placeholder="Select label"
            options={labelOptions}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create Ticket
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateTicket;
