import React, { useState, useEffect } from "react";
import { Modal, Input, Button, Form, message } from "antd";
import axios from "axios";
import { AppRoutes } from "../../routes/routes";

const FirstLoginModal = ({ user }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm(); // Ant Design form instance

  useEffect(() => {
    if (user?.isFirstLogin) {
      setIsModalVisible(true);
    }
  }, [user]);

  const handleOk = async (values) => {
    if (!user?._id) {
      message.error("User ID is missing. Please try again.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.put(`${AppRoutes.updatePassword}/${user._id}`, {
        newPassword: values.password, // Get password from form values
      });

      message.success(response.data.message || "Password changed successfully!");

      // Close modal after successful update
      setIsModalVisible(false);
    } catch (error) {
      console.error("Error updating password:", error);
      message.error(error.response?.data?.message || "Failed to update password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Change Your Password"
      open={isModalVisible}
      footer={null}
      closable={false} // Prevent closing the modal without changing the password
    >
      <p>Please change your password to continue.</p>
      <Form form={form} layout="vertical" onFinish={handleOk}>
        <Form.Item
          label="New Password"
          name="password"
          rules={[
            { required: true, message: "Please enter your new password!" },
            { min: 6, message: "Password must be at least 6 characters long!" },
          ]}
        >
          <Input.Password placeholder="Enter new password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} style={{ width: "100%" }}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default FirstLoginModal;
