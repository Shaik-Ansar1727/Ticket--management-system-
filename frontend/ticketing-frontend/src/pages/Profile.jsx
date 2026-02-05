import React, { useState } from "react";
import {
  Card,
  Spin,
  Alert,
  Avatar,
  Tag,
  Form,
  Input,
  Button,
  Divider,
  message,
  Modal,
} from "antd";
import axios from "../api/axios";
import { Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { uploadProfilePictureApi } from "../api/user.api";
import { useQuery } from "@tanstack/react-query";

const BACKEND_URL = "http://localhost:8080";

const Profile = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await axios.get("/users/me");
      return res.data;
    },
  });

  const profile = data || null;

  const [saving, setSaving] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const [profileForm] = Form.useForm();
  const [passwordForm] = Form.useForm();

  if (isLoading) return <Spin size="large" />;
  if (isError) return <Alert type="error" message="Failed to load profile" />;

  const onFinishProfile = async (values) => {
    try {
      setSaving(true);
      await axios.put("/users/me", values);
      message.success("Profile updated successfully");
    } catch {
      message.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const onPasswordChange = async (values) => {
    try {
      await axios.put("/users/me/password", values);
      message.success("Password changed successfully");
      passwordForm.resetFields();
      setIsPasswordModalOpen(false);
    } catch (err) {
      message.error(
        err.response?.data?.message || "Failed to change password"
      );
    }
  };

  return (
    <div className="flex justify-center py-10">
      <div className="w-full max-w-md">
        <Card className="shadow-md rounded-xl" title="My Profile">

          <div className="flex flex-col items-center gap-3 mb-6">
            <Avatar
              size={90}
              className="shadow"
              src={
                imagePreview ||
                (profile?.displayPicture
                  ? `${BACKEND_URL}${profile.displayPicture}`
                  : undefined)
              }
            />

            <Upload
              showUploadList={false}
              beforeUpload={(file) => {
                const isImage =
                  file.type === "image/png" ||
                  file.type === "image/jpeg" ||
                  file.type === "image/jpg";

                if (!isImage) {
                  message.error("Only PNG/JPG images allowed");
                  return Upload.LIST_IGNORE;
                }

                setSelectedFile(file);
                const reader = new FileReader();
                reader.onload = (e) => setImagePreview(e.target.result);
                reader.readAsDataURL(file);
                return false;
              }}
            >
              <Button icon={<PlusOutlined />}>Change Picture</Button>
            </Upload>

            {selectedFile && (
              <Button
                type="primary"
                onClick={async () => {
                  try {
                    await uploadProfilePictureApi(selectedFile);
                    message.success("Profile picture updated");
                    setSelectedFile(null);
                  } catch {
                    message.error("Failed to upload image");
                  }
                }}
              >
                Save Picture
              </Button>
            )}
          </div>


          <Form
            form={profileForm}
            layout="vertical"
            initialValues={profile}
            onFinish={onFinishProfile}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item label="Bio" name="bio">
              <Input.TextArea rows={3} />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={saving}
                block
              >
                Save Changes
              </Button>
            </Form.Item>
          </Form>

          <Divider />

          {/* Change Password */}
          <Button
            type="default"
            block
            onClick={() => setIsPasswordModalOpen(true)}
          >
            Change Password
          </Button>

          <Modal
            title="Change Password"
            open={isPasswordModalOpen}
            onCancel={() => setIsPasswordModalOpen(false)}
            footer={null}
          >
            <Form
              form={passwordForm}
              layout="vertical"
              onFinish={onPasswordChange}
            >
              <Form.Item
                label="Old Password"
                name="oldPassword"
                rules={[{ required: true }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                label="New Password"
                name="newPassword"
                rules={[
                  { required: true },
                  { min: 6, message: "Minimum 6 characters" },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Change Password
                </Button>
              </Form.Item>
            </Form>
          </Modal>

          <Divider />

          {/* Role & Status */}
          <div className="flex justify-between text-sm">
            <div>
              <strong>Role:</strong>{" "}
              <Tag color={profile?.role === "ADMIN" ? "red" : "blue"}>
                {profile?.role}
              </Tag>
            </div>

            <div>
              <strong>Status:</strong>{" "}
              <Tag
                color={
                  profile?.status === "ACTIVE"
                    ? "green"
                    : profile?.status === "PENDING"
                    ? "orange"
                    : "red"
                }
              >
                {profile?.status}
              </Tag>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;

