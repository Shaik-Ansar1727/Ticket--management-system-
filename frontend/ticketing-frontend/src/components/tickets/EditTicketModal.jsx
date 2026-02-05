import React from "react";
import { Modal, Form, Input, Select, Button, message } from "antd";
import { updateTicketApi } from "../../api/ticket.api";
import { useState } from "react";

const EditTicketModal = ({
  open,
  onClose,
  ticket,
  users,
  onUpdated,
}) => {
  const [saving, setSaving] = useState(false);

  if (!ticket) return null;

  const userOptions = users.map((u) => ({
    value: u.id,
    label: u.username,
  }));

  const labelOptions = [
    { value: "BUG", label: "🐞 Bug" },
    { value: "FEATURE", label: "✨ Feature" },
    { value: "TASK", label: "📝 Task" },
    { value: "IMPROVEMENT", label: "🚀 Improvement" },
    { value: "SUPPORT", label: "🔧 Support" },
  ];

  const onFinish = async (values) => {
    try {
      setSaving(true);
      const updated = await updateTicketApi(ticket.id, values);
      message.success("Ticket updated");
      onUpdated(updated);
      onClose();
    } catch (err) {
      message.error(
        err.response?.data?.message || "Failed to update ticket"
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      title="Edit Ticket"
      open={open}
      onCancel={onClose}
      destroyOnHidden
      footer={null}
    >
      <Form
        layout="vertical"
        initialValues={{
          title: ticket.title,
          description: ticket.description,
          label: ticket.label,
          assignedToUserId: ticket.assignedTo?.id,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item label="Label" name="label">
          <Select options={labelOptions} />
        </Form.Item>

        <Form.Item label="Assign To" name="assignedToUserId">
          <Select
            options={userOptions}
            allowClear
            placeholder="Select user"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={saving}
          >
            Save
          </Button>
          <Button
            style={{ marginLeft: 8 }}
            onClick={onClose}
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditTicketModal;
