import React, { useState } from "react";
import { Form, Input, Button, Card, Typography, Spin } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [credentials, setCredentials] = useState("");
    const onFinish = (values) => {
        setLoading(true);
        console.log("Success:", values);
        setCredentials(values);
        setLoading(false);
      };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-500">
      <Card
        className="w-full max-w-md shadow-lg rounded-xl"
        style={{ padding: "2rem", backgroundColor: "#fff" }}
      >
        <Typography.Title level={2} className="text-center text-blue-600">
          Welcome Back
        </Typography.Title>
        <Typography.Text type="secondary" className="block text-center mb-4">
          Please login to your account
        </Typography.Text>

        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
              prefix={<UserOutlined className="text-blue-400" />}
              placeholder="Enter your username"
              size="large"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-blue-400" />}
              placeholder="Enter your password"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 rounded-lg"
              
            >
            {loading ? <Spin /> : "Login"}
            </Button>
          </Form.Item>
        </Form>

        <Typography.Text className="block text-center text-sm mt-4 text-gray-500">
          Don't have an account? <a href="/auth/sign-up">Register here</a>
        </Typography.Text>
      </Card>
    </div>
  );
};

export default Login;