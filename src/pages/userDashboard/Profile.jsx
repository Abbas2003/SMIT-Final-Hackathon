import React, { useState, useEffect } from "react";
import { Card, Form, Input, Button, Typography, message, Row, Col, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import Cookies from "js-cookie";
import { AppRoutes } from "../../routes/routes";

const UserProfile = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState({});

    useEffect(() => {
        // Fetch user profile data
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const response = await axios.get(AppRoutes.getMyInfo, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`,
                },
            }); 
            // console.log("User data:", response.data.data);
            console.log("User data=>", response.data.data);
            setUserData(response.data.data);
            form.setFieldsValue(response.data.data);
        } catch (error) {
            console.error("Failed to fetch user data:", error);
            message.error("Failed to load user data.");
        }
    };

    const handleUpdateProfile = async (values) => {
        setLoading(true);
        try {
            const response = await axios.put("/api/user/profile", values); // Replace with actual API endpoint
            setUserData(response.data);
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
            <Typography.Title level={3} style={{ textAlign: "center", marginBottom: "20px" }}>
                User Profile
            </Typography.Title>

            <Card style={{ maxWidth: "600px", margin: "0 auto", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)" }}>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleUpdateProfile}
                    initialValues={userData}
                >
                    <Form.Item
                        label="Full Name"
                        name="name"
                        rules={[{ required: true, message: "Please enter your name!" }]}
                    >
                        <Input placeholder="Enter your full name" />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: "Please enter your email!" },
                            { type: "email", message: "Please enter a valid email address!" },
                        ]}
                    >
                        <Input placeholder="Enter your email" disabled />
                    </Form.Item>

                    <Form.Item
                        label="Phone Number"
                        name="phone"
                        rules={[{ required: true, message: "Please enter your phone number!" }]}
                    >
                        <Input placeholder="Enter your phone number" />
                    </Form.Item>

                    <Form.Item
                        label="Address"
                        name="address"
                        rules={[{ required: true, message: "Please enter your address!" }]}
                    >
                        <Input placeholder="Enter your address" />
                    </Form.Item>

                    <Form.Item label="Profile Picture" name="profilePicture">
                        <Upload
                            name="profile"
                            listType="picture"
                            beforeUpload={() => false} // Prevent automatic upload
                            maxCount={1}
                        >
                            <Button icon={<UploadOutlined />}>Upload Profile Picture</Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            style={{ width: "100%" }}
                        >
                            Update Profile
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default UserProfile;
