import React, { useState, useContext } from "react";
import { Card, Form, Input, Button, Typography, Row, Col, Avatar, Upload, message } from "antd";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import { AuthContext } from "../../context/UserContext";
import axios from "axios";
import { AppRoutes } from "../../routes/routes";

const { Title, Paragraph } = Typography;

const UserProfile = () => {
  const { user, setUser } = useContext(AuthContext); // Added setUser to update user context
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState({ bankStatement: null, salarySheet: null });

  const handleFileChange = (info, field) => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} uploaded successfully.`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} upload failed.`);
    }
    setFileList((prev) => ({ ...prev, [field]: info.file.originFileObj }));
  };

  const handleUpdateProfile = async (values) => {
    
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("address", values.address);
      formData.append("mobileNo", values.mobileNo);
      formData.append("fatherName", values.fatherName);

      // Append files if selected
      if (bankStatement.fileList) {
        formData.append("bankStatement", bankStatement.fileList);
      }
      if (salarySheet.fileList) {
        formData.append("salarySheet", salarySheet.fileList);
      }
      console.log("Form data:", values);
      
      const response = await axios.put(`${AppRoutes.updateUser}/${user._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setUser(response.data.data); // Update user context
      message.success("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile:", error);
      message.error("Failed to update profile. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Card style={{ maxWidth: "900px", margin: "0 auto", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)" }}>
        <Row gutter={[16, 16]} align="middle">
          <Col span={8} style={{ textAlign: "center" }}>
            <Avatar
              size={120}
              src={user?.imageUrl}
              icon={<UserOutlined />}
              style={{ backgroundColor: user?.imageUrl ? "transparent" : "#f56a00" }}
            />
            <Paragraph style={{ marginTop: 10 }}>
              <strong>{user?.fullName}</strong>
            </Paragraph>
          </Col>
          <Col span={16}>
            <Title level={4}>User Information</Title>
            <Paragraph><strong>Email:</strong> {user?.email}</Paragraph>
            <Paragraph><strong>CNIC:</strong> {user?.cnic}</Paragraph>
          </Col>
        </Row>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleUpdateProfile}
          initialValues={user}
          style={{ marginTop: "20px" }}
        >
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item label="Address" name="address">
                <Input placeholder="Enter your address" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Mobile Number" name="mobileNo">
                <Input placeholder="Enter your mobile number" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Father's Name" name="fatherName">
                <Input placeholder="Enter your father's name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Bank Statement" name="bankStatement">
                <Upload
                  listType="picture"
                  beforeUpload={() => false}
                  maxCount={1}
                  onChange={(info) => handleFileChange(info, "bankStatement")}
                  accept=".jpg,.jpeg,.png,.pdf"
                >
                  <Button icon={<UploadOutlined />}>Upload Bank Statement</Button>
                </Upload>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Salary Sheet" name="salarySheet">
                <Upload
                  listType="picture"
                  beforeUpload={() => false}
                  maxCount={1}
                  onChange={(info) => handleFileChange(info, "salarySheet")}
                  accept=".jpg,.jpeg,.png,.pdf"
                >
                  <Button icon={<UploadOutlined />}>Upload Salary Sheet</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} style={{ width: "100%" }}>
              Update Profile
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default UserProfile;
